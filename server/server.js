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
    try {
        console.log(`📢 [백엔드] 데이터 크롤링 시작`);

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto("https://www.bojo.go.kr/bojo.do", { waitUntil: "networkidle2" });

        const results = await page.evaluate(() => {
            const extractedData = [];
            const debugLogs = [];
        
            for (const item of document.querySelectorAll(".tabPage.on .cardItem")) {
                const titleElement = item.querySelector(".tit.pcOnly");  
                const dateElement = item.querySelector(".termDate");
                const orgElement = item.querySelector(".badge.round.blue");  
        
                const title = titleElement?.innerText.trim() || "제목 없음";
                const date = dateElement?.innerText.trim() || "기간 없음";
                const organization = orgElement?.innerText.trim() || "기관 정보 없음"; 
        
                // ✅ 상세 정보 버튼 찾기
                const detailButton = item.querySelector("button[id^='searchLabPssrp_']");
                let detailUrl = null;
        
                if (detailButton) {
                    debugLogs.push(`✅ [DEBUG] '${title}' 상세 버튼 찾음`);
        
                    // ✅ 버튼 ID에서 필요한 값 추출
                    const buttonId = detailButton.getAttribute("id");
                    debugLogs.push(`📢 [DEBUG] 버튼 ID: ${buttonId}`);
        
                    const match = buttonId.match(/searchLabPssrp_(\d+)_(\d+)_(\d+)_(\d+)_(\d+)_CARD/);
                    if (match) {
                        const param1 = match[1];  
                        const param2 = match[2];  
                        const param3 = match[3];  
                        const param4 = match[4];  
                        const param5 = match[5];  
        
                        // ✅ 상세 페이지 URL 생성
                        detailUrl = `https://www.bojo.go.kr/bojoDetail.do?param1=${param1}&param2=${param2}&param3=${param3}&param4=${param4}&param5=${param5}`;
                        debugLogs.push(`📢 [DEBUG] '${title}' 상세 페이지 URL: ${detailUrl}`);
                    }
                } else {
                    debugLogs.push(`⚠️ [DEBUG] '${title}' 상세 버튼 없음`);
                }
        
                extractedData.push({ title, date, detailUrl, organization });
            }
        
            return { extractedData, debugLogs };
        });
        
        // ✅ 브라우저 로그를 Node.js 터미널에서 확인
        console.log("📢 [DEBUG] 브라우저 로그:", results.debugLogs);
        

        console.log(`✅ [백엔드] 크롤링 성공! 총 ${results.extractedData.length}개 항목`);
        console.log("📢 [DEBUG] 브라우저 로그:", results.debugLogs);

        await browser.close();
        res.json({ success: true, data: results.extractedData, debugLogs: results.debugLogs });

    } catch (error) {
        console.error("❌ [백엔드] 크롤링 오류:", error);
        res.status(500).json({ success: false, message: "크롤링 실패", error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ 서버가 http://localhost:${PORT} 에서 실행 중!`);
});
