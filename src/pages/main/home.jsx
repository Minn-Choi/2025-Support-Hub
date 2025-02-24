import { useEffect, useState } from "react";
import axios from "axios";

const OpenAPIComponent = () => {
  const [pbnsData, setPbnsData] = useState([]);
  const [asbsData, setAsbsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredPbnsData, setFilteredPbnsData] = useState([]);
  const [filteredAsbsData, setFilteredAsbsData] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchPbnsData = async () => {
    try {
      const response = await axios.get(
        `http://apis.data.go.kr/1051000/MoefOpenAPI/T_OPD_PBNS`,
        {
          params: {
            serviceKey: API_KEY,
            pageNo: 1,
            numOfRows: 10,
            resultType: "json",
            bsnsyear: 2025,
            jrsd_nm: "보건복지부",
          },
        }
      );
      console.log("T_OPD_PBNS 응답 데이터:", response.data);
      if (response.data.response?.body?.items?.item) {
        setPbnsData(response.data.response.body.items.item);
        setFilteredPbnsData(response.data.response.body.items.item);
      } else {
        console.error("T_OPD_PBNS 데이터 없음!");
      }
    } catch (error) {
      console.error("T_OPD_PBNS API 요청 중 오류 발생:", error);
    }
  };

  const fetchAsbsData = async () => {
    try {
      const response = await axios.get(
        `http://apis.data.go.kr/1051000/MoefOpenAPI/T_OPD_ASBS_IFPBNT`,
        {
          params: {
            serviceKey: API_KEY,
            pageNo: 1,
            numOfRows: 10,
            resultType: "json",
            bsnsyear: 2023,
            jrsd_nm: "보건복지부",
            exc_instt_nm: "제주특별자치도",
          },
        }
      );
      console.log("T_OPD_ASBS_IFPBNT 응답 데이터:", response.data);
      if (response.data.response?.body?.items?.item) {
        setAsbsData(response.data.response.body.items.item);
        setFilteredAsbsData(response.data.response.body.items.item);
      } else {
        console.error("T_OPD_ASBS_IFPBNT 데이터 없음!");
      }
    } catch (error) {
      console.error("T_OPD_ASBS_IFPBNT API 요청 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchPbnsData();
    fetchAsbsData();
  }, []);

  const formatDateString = (dateStr) => {
    if (!dateStr || dateStr.length !== 8) return null;
    return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
  };

  const formatAmount = (amount) => {
    return amount ? parseInt(amount, 10).toLocaleString() + " 원" : "N/A";
  };

  useEffect(() => {
    const filteredPbns = pbnsData.filter((item) => {
      const matchesSearch = item.DDTLBZ_NM?.includes(searchTerm);

      const beginDateStr = formatDateString(item.RCEPT_BEGIN_DE);
      const endDateStr = formatDateString(item.RCEPT_END_DE);
      const beginDate = beginDateStr ? new Date(beginDateStr) : null;
      const endDateValue = endDateStr ? new Date(endDateStr) : null;
      const startFilterDate = startDate ? new Date(startDate) : null;
      const endFilterDate = endDate ? new Date(endDate) : null;

      const matchesDate =
        (!startFilterDate || (beginDate && beginDate >= startFilterDate)) &&
        (!endFilterDate || (endDateValue && endDateValue <= endFilterDate));

      return matchesSearch && matchesDate;
    });

    setFilteredPbnsData(filteredPbns);

    const filteredAsbs = asbsData.filter((item) =>
      item.DDTLBZ_NM?.includes(searchTerm)
    );
    setFilteredAsbsData(filteredAsbs);
  }, [searchTerm, startDate, endDate, pbnsData, asbsData]);

  return (
    <div>
      <h2>📢 2025년 공모사업 목록</h2>

      {/* 검색 및 날짜 필터링 UI */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="🔍 사업명 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "200px", marginRight: "10px" }}
        />
        <label>📅 접수 시작일: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <label>📅 접수 마감일: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ padding: "5px" }}
        />
      </div>

      <h3>📌 공모사업 목록 (T_OPD_PBNS)</h3>
      {filteredPbnsData.length > 0 ? (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>사업명</th>
              <th>수행 기관</th>
              <th>사업 개요</th>
              <th>지원 금액</th>
              <th>접수 기간</th>
              <th>제출 서류</th>
              <th>접수 방법</th>
              <th>담당자 연락처</th>
            </tr>
          </thead>
          <tbody>
            {filteredPbnsData.map((item, index) => (
              <tr key={index}>
                <td>{item.DDTLBZ_NM || "N/A"}</td>
                <td>{item.PSSRP_INSTT_NM || "N/A"}</td>
                <td>{item.BSNS_SMRY || item.BSNS_PURPS_CN || "N/A"}</td>
                <td>{formatAmount(item.SPORT_BGAMT)}</td>
                <td>{item.RCEPT_BEGIN_DE && item.RCEPT_END_DE ? `${formatDateString(item.RCEPT_BEGIN_DE)} ~ ${formatDateString(item.RCEPT_END_DE)}` : "N/A"}</td>
                <td>{item.PRESENTN_PAPERS_GUIDANCE_CN || "N/A"}</td>
                <td>{item.REQST_RCEPT_MTH_CN || "N/A"}</td>
                <td>
                  {item.CHARGER_NM ? `${item.CHARGER_NM} (${item.CHARGER_TELNO || "N/A"})` : "N/A"}
                  <br />
                  {item.CHARGER_EMAIL && <a href={`mailto:${item.CHARGER_EMAIL}`}>{item.CHARGER_EMAIL}</a>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}

      <h3>📌 보조사업 수행기관별 목록 (T_OPD_ASBS_IFPBNT)</h3>
      {filteredAsbsData.length > 0 ? (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>사업명</th>
              <th>수행 기관</th>
              <th>사업 차수</th>
              <th>국고보조금</th>
              <th>지자체보조금</th>
              <th>자기부담금</th> 
              <th>기타부담금</th>
              <th>기준일자</th>
            </tr>
          </thead>
          <tbody>
            {filteredAsbsData.map((item, index) => (
              <tr key={index}>
                <td>{item.DDTLBZ_NM || "N/A"}</td>
                <td>{item.EXC_INSTT_NM || "N/A"}</td>
                <td>{item.DDTLBZ_ODR || "N/A"}</td>
                <td>{formatAmount(item.GOVSUBY)}</td>
                <td>{formatAmount(item.LOCGOV_ALOTM)}</td>
                <td>{formatAmount(item.SALM)}</td>
                <td>{formatAmount(item.ETC_ALOTM)}</td>
                <td>{item.STDR_DE || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default OpenAPIComponent;
