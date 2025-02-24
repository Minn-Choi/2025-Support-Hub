import { useEffect, useState } from "react";
import axios from "axios";
import CustomCalendar from "../../components/calendar/calendar.jsx"; 

const OpenAPIComponent = () => {
  const [pbnsData, setPbnsData] = useState([]);
  const [asbsData, setAsbsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDate, setSelectedDate] = useState(null); 
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

  const Card = ({ item, index, formatDateString, formatAmount }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "relative",
          width: "350px",
          height:'205px',
          padding: "0px 15px",
          borderRadius: "10px",
          boxShadow:'2px 4px 8px 0px rgba(0, 0, 0, 0.10)',
          backgroundColor: isHovered ? "#FC521C" : "white",
          transition: "transform 0.2s ease-in-out",
        }}
      >
        <p style={{ 
            color: isHovered ? "white" : "black",
            fontFeatureSettings: "'liga' off, 'clig' off", 
            fontFamily: "Pretendard", 
            fontSize: "17px",
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "150%"
          }}>{item.PSSRP_INSTT_NM || "N/A"}</p>
        <h3 
          style={{ 
            marginBottom: "10px", 
            fontSize: "18px", 
            fontWeight: "bold",
            color: "#333", 
            whiteSpace: "nowrap", 
            overflow: "hidden", 
            textOverflow: "ellipsis", 
            maxWidth: "330px",
            color: isHovered ? "white" : "black",
            fontFeatureSettings: "'liga' off, 'clig' off", 
            fontFamily: "Pretendard", 
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "150%"
          }}
        >
          {item.DDTLBZ_NM || "N/A"}
        </h3>
        <p
        style={{ 
          color: isHovered ? "white" : "black",
          marginTop:'80px',
          fontFeatureSettings: "'liga' off, 'clig' off", 
          fontFamily: "Pretendard", 
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: 200,
          lineHeight: "150%"
        }}>{item.RCEPT_BEGIN_DE && item.RCEPT_END_DE
          ? `${formatDateString(item.RCEPT_BEGIN_DE)} ~ ${formatDateString(item.RCEPT_END_DE)}`
          : "N/A"}
        </p>
  
        {isHovered && (
          <div
            style={{
              position: "absolute",
              top: "0%",
              left: index % 3 === 2 ? "auto" : "100%",
              right: index % 3 === 2 ? "100%" : "auto", 
              transform: "translateX(0px)",
              width: "380px",
              border: '2px solid #E8E7E5',
              backgroundColor: "white",
              padding: "10px",
              boxShadow: "2px 4px 8px 0px rgba(0, 0, 0, 0.10)",
              zIndex: "1000",
              borderRadius: "10px",
              transition: "opacity 0.3s ease-in-out",
              color: "#000",
              fontFeatureSettings: "'liga' off, 'clig' off", 
              fontFamily: "Pretendard", 
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "150%",
              paddingTop:'0px'
            }}
          >
            <p><strong>사업 개요 <br/></strong> {item.BSNS_SMRY || item.BSNS_PURPS_CN || "N/A"}</p>
            <p><strong>지원 금액 <br/></strong> {formatAmount(item.SPORT_BGAMT)}</p>
            <p><strong>제출 서류 <br/></strong> {item.PRESENTN_PAPERS_GUIDANCE_CN || "N/A"}</p>
            <p><strong>접수 방법 <br/></strong> {item.REQST_RCEPT_MTH_CN || "N/A"}</p>
            <p style={{ margin: "0" }}>
              <strong>담당자:</strong> {item.CHARGER_NM ? `${item.CHARGER_NM} (${item.CHARGER_TELNO || "N/A"})` : "N/A"}
            </p>
            {item.CHARGER_EMAIL && (
              <p style={{ margin: "0" }}>
                <a href={`mailto:${item.CHARGER_EMAIL}`}>{item.CHARGER_EMAIL}</a>
              </p>
            )}
          </div>
        )}
      </div>
    );
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

      const matchesCalendar =
        !selectedDate || (beginDate && endDateValue && beginDate <= selectedDate && selectedDate <= endDateValue);

      return matchesSearch && matchesDate && matchesCalendar;
    });

    setFilteredPbnsData(filteredPbns);

    const filteredAsbs = asbsData.filter((item) =>
      item.DDTLBZ_NM?.includes(searchTerm)
    );
    setFilteredAsbsData(filteredAsbs);
  }, [searchTerm, startDate, endDate, selectedDate, pbnsData, asbsData]);

  return (
    <div>
      <h2>2025년 공모사업 목록</h2>

      <div style={{ marginBottom: "10px", border: 'none' }}>
        <input
          type="text"
          placeholder="사업명 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            width: "300px",
            marginRight: "10px",
            borderRadius: "50px",
            border: '1px solid #ABABAB',
            outline: "none", 
            backgroundColor: "white",
            fontFamily: 'Pretendard',
            marginRight: '50px',
          }}
        />
        <label  style={{fontFamily: 'Pretendard'}}>접수 시작일 </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ padding: "5px", marginRight: "10px",  borderRadius:'13px', borderRadius: "50px",
            border: '1px solid #ABABAB',
            outline: "none", 
            backgroundColor: "white",
            fontFamily: 'Pretendard',
            width:'140px',
          marginRight:'20px',color:'gray'}}
        />
        <label style={{fontFamily: 'Pretendard'}}>접수 마감일 </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ padding: "5px",  borderRadius:'13px',  borderRadius: "50px",
            border: '1px solid #ABABAB',
            outline: "none", 
            backgroundColor: "white",
            fontFamily: 'Pretendard',
          width:'140px',
        color:'gray' }}
        />
      </div>

      <CustomCalendar onSelectDate={setSelectedDate} />

      <h2 style={{
          color: "#000",
          fontFamily: "Pretendard", 
          fontSize: "23px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "normal",
          marginBottom: "5px" ,
          marginTop: '70px'
      }}>
        서울특별시 중구시설관리공단
      </h2>

      <h3 style={{
          color: "#000",
          fontFamily: "Pretendard", 
          fontSize: "21px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "normal",
          marginTop: "0px",
          marginBottom:'40px'
      }}>
        맞춤형 공모사업
      </h3>

      {filteredPbnsData.length > 0 ? (
        <div 
        style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "20px",
          justifyContent: "center", 
          alignItems: "center",  
        }}
      >
          {filteredPbnsData.map((item, index) => (
            <Card key={index} item={item} index={index} formatDateString={formatDateString} formatAmount={formatAmount} />
          ))}
        </div>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}

      <h2 style={{
          color: "#000",
          fontFamily: "Pretendard", 
          fontSize: "23px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "normal",
          marginBottom: "5px" ,
          marginTop: '70px'
      }}>
        서울특별시 중구시설관리공단
      </h2>

      <h3 style={{
          color: "#000",
          fontFamily: "Pretendard", 
          fontSize: "21px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "normal",
          marginTop: "0px",
          marginBottom:'40px'
      }}>
        맞춤형 보조사업
      </h3>
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
