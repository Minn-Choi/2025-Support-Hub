import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/main/home.jsx";
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import styled from "styled-components"; 

const MainContainer = styled.main`
    width: 80%; 
    margin: 0 auto;  
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
`;

function App() {
    return (
        <Router>
            <Header />
            <MainContainer>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </MainContainer>
            <Footer /> 
        </Router>
    );
}

export default App;
