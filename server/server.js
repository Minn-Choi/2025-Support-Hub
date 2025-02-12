import express from "express";
import cors from "cors";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

const app = express();
const PORT = 5000;

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET"],
    allowedHeaders: ["Content-Type"]
}));

app.get("/crawl", async (req, res) => {
    const { tabIndex } = req.query;

    try {
        console.log(`📢 [백엔드] 탭 ${tabIndex} 데이터 요청 수신`);

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.goto("https://www.bojo.go.kr/bojo.do", { waitUntil: "networkidle2" });

        if (tabIndex) {
            const tabSelector = `.tabNavi li[data-target="${tabIndex}"]`;
            
            const tabExists = await page.evaluate((selector) => {
                return document.querySelector(selector) !== null;
            }, tabSelector);

            if (tabExists) {
                await page.evaluate((selector) => {
                    document.querySelector(selector).click();
                }, tabSelector);
                console.log(`✅ [백엔드] 탭 ${tabIndex} 클릭 완료`);

                await new Promise(resolve => setTimeout(resolve, 3000));
            } else {
                console.warn(`⚠️ [백엔드] 탭 ${tabIndex}을 찾을 수 없음`);
            }
        }

        const results = await page.evaluate(async () => {
            const extractedData = [];

            for (const item of document.querySelectorAll(".tabPage.on .cardItem")) {
                // const title = item.querySelector(".cardTit")?.innerText.trim() || "제목 없음";
                // const date = item.querySelector(".termDate")?.innerText.trim() || "기간 없음";

                const titleElement = item.querySelector(".tit.pcOnly");  
                const dateElement = item.querySelector(".termDate");
                const orgElement = item.querySelector(".badge.round.blue");  

                const title = titleElement?.innerText.trim() || "제목 없음";
                const date = dateElement?.innerText.trim() || "기간 없음";
                const organization = orgElement?.innerText.trim() || "기관 정보 없음"; 
                
                const detailButton = item.querySelector(".cardBtnArea button[onclick*='f_ddtlbzPopup']");
                let detailContent = "상세 정보 없음";

                if (detailButton) {
                    detailButton.click();  
                    await new Promise(resolve => setTimeout(resolve, 2000));  

                    const popup = document.querySelector("#_notice1");
                    if (popup && popup.style.display !== "none") {
                        detailContent = popup.innerText.trim() || "상세 정보 없음";
                    }

                    const closeButton = document.querySelector("#_notice1 .close"); 
                    if (closeButton) {
                        closeButton.click();
                        await new Promise(resolve => setTimeout(resolve, 500)); 
                    }
                }

                extractedData.push({ title, date, detailContent, organization });
            }

            return extractedData;
        });

        console.log(`✅ [백엔드] 크롤링 성공! 총 ${results.length}개 항목`);
        console.log(`📢 [백엔드] 크롤링된 데이터:`, results);

        await browser.close();
        res.json({ success: true, data: results });

    } catch (error) {
        console.error("❌ [백엔드] 크롤링 오류:", error);
        res.status(500).json({ success: false, message: "크롤링 실패", error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ 서버가 http://localhost:${PORT} 에서 실행 중!`);
});
