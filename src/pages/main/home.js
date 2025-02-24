export const buttonStyle = (isActive) => ({
    margin: "5px",
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: isActive ? "lightblue" : "white",
    border: "1px solid #ccc",
    borderRadius: "5px",
});

export const listItemStyle = {
    zIndex: "0",
    position: "relative",
    padding: "10px 20px",
    margin: "5px auto", 
    display: "flex",
    alignItems: "center", 
    justifyContent: "space-between", 
    width: '100%',
    maxWidth: '900px',
    height: '70px',
    flexShrink: '0',
    borderRadius: '40px',
    background: '#FFF',
    boxShadow: '2px 4px 10px 0px rgba(0, 0, 0, 0.25)',
    marginBottom: '40px',
};

export const sortContainer = {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",  
    width: "90%",              
    maxWidth: "880px",
    gap: "10px",
    marginLeft: "auto",        
    marginRight: "auto",
};

export const sortOption = (isActive) => ({
    fontWeight: isActive ? "bold" : "normal",
    cursor: "pointer",
    textDecoration: isActive ? "none" : "none",
    color: "#1B1C1E",
    textAlign: "center",
    fontFeatureSettings: "'liga' off, 'clig' off",
    fontFamily: "Pretendard",
    fontSize: "14px",
    fontStyle: "normal",
    
});

export const detailButtonStyle = {
    backgroundColor: "white",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "5px",
};

export const sortButtonStyle = {
    margin: "5px",
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#f0f0f0",  
    border: "1px solid #ccc",
    borderRadius: "5px",
};


export const Right = {
    position: "absolute",
    right:'5px',
}

export const popupOverlayStyle = {
    zIndex:'2',
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

export const popupContentStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "60%",
    textAlign: "left",
};

export const detailTextStyle = {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    borderRadius: "5px",
    whiteSpace: "pre-wrap",
    maxHeight: "300px",
    overflowY: "auto",
};

export const closeButtonStyle = {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px",
};

export const ors = {
    position: 'absolute',
    top:'-22px',
    left:'44px',
    backgroundColor: "#FC521C",
    color: "white",
    padding: "8px 9px 6px 8px",
    borderRadius: "10px 20px 10px 10px",
    fontSize: '13px'
};

export const ors1 = {
    position: 'absolute',
    top:'-22px',
    left:'30px',
};

export const ors2 = {
    position: 'absolute',
    top:'-15px',
    left:'40px',
};
export const Title = {
    fontSize:'18px',
    marginLeft: '20px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',  
    textOverflow: 'ellipsis',  
    maxWidth: '62%',
};

export const calendarEventStyle = (eventCount) => ({
    backgroundColor: eventCount > 1 ? "#FFF8B0" : "#007bff",
    color: "black",
    fontSize: "10px",
    padding: "5px",
    borderRadius: "5px",
    textAlign: "center",
    width: "90%", 
    margin: "auto",
});