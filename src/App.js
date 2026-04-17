import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import Tracker from "./components/Tracker";
import Login from "./components/Login";
import GlobalStyles from "./globalStyles";
import { lightTheme, darkTheme } from "./components/Theme";
import image from "./bg_img.jpg";
import imageDark from "./dark_bg_img_2.jpg"; 
import favicon from "./favicon_2.ico";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnalysisTools from "./components/AnalysisTools";
import TrackerAI from "./components/TrackerAI"; // Imported TrackerAI page

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: ${(props) =>
    props.theme === lightTheme ? `url(${image})` : `url(${imageDark})`}; 
  background-color: ${(props) => props.theme.body}; 
  background-size: cover;
  background-position: center;
`;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.title = "Expense Tracker";

    const link = document.createElement("link");
    link.rel = "icon";
    link.href = favicon;
    document.head.appendChild(link);

    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedUser = localStorage.getItem("currentUser");

    if (storedLogin === "true" && storedUser) {
      setIsLoggedIn(true);
      setCurrentUser(storedUser);
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Router>
        <Main>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Tracker
                    setIsLoggedIn={handleLogout}
                    currentUser={currentUser}
                    toggleTheme={toggleTheme}
                  />
                ) : (
                  <Login setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />
                )
              }
            />
            <Route path="/analysis-tools" element={<AnalysisTools />} />
            <Route path="/tracker-ai" element={<TrackerAI />} /> 
          </Routes>
        </Main>
      </Router>
    </ThemeProvider>
  );
};

export default App;
