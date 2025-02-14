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
    backgroundColor: "#f9f9f9",
    padding: "10px",
    margin: "5px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

export const detailButtonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "5px",
};

export const popupOverlayStyle = {
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
    backgroundColor: "pink",
    color: "black",
    padding: "10px 5px",
    borderRadius: "5px",
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