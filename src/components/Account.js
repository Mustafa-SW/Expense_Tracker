import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaUser, FaKey, FaCog, FaSlidersH, FaChartBar, FaCommentDots, FaTimes, FaCalendarAlt, FaClock } from "react-icons/fa";

const AccountContainer = styled.div`
  position: fixed;
  top: 60px;
  left: 20px;
  width: 360px;
  background: rgba(255, 255, 255, 0.98);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
  display: ${(props) => (props.isOpen ? "block" : "none")};
  z-index: 200;
  backdrop-filter: blur(12px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transform: ${(props) => (props.isOpen ? "scale(1)" : "scale(0.95)")};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #06d6a0;
  padding: 12px 15px;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
`;

const CloseIcon = styled(FaTimes)`
  cursor: pointer;
  font-size: 1.3rem;
  transition: color 0.3s;

  &:hover {
    color: #ff4b5c;
  }
`;

const OptionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 15px 0 0 0;
`;

const OptionItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;
  background: #f8f9fa;
  margin-bottom: 8px;
  color: #333;

  &:hover {
    background: #06d6a0;
    color: white;
  }

  svg {
    margin-right: 10px;
    font-size: 1.2rem;
  }
`;

// Improved Account Details Window Design
const DetailsWindow = styled.div`
  position: absolute;
  top: 0; /* Aligns with the Account window */
  left: 105%;
  width: 340px;
  background: #ffffff;
  border: 3px solid #06d6a0;
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.3);
  z-index: 300;
  display: ${(props) => (props.isVisible ? "block" : "none")};
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DetailsContent = styled.div`
  position: relative;
  background: #f9fafb;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
`;

const DetailsItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  svg {
    margin-right: 12px;
    color: #06d6a0;
    font-size: 1.3rem;
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: #333;
    font-weight: 500;
  }
`;

const DetailsCloseIcon = styled(FaTimes)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 1.5rem;
  color: #333;

  &:hover {
    color: #ff4b5c;
  }
`;

// Password Change Window Styling
const PasswordWindow = styled.div`
  position: absolute;
  top: 0;
  left: 105%;
  width: 340px;
  background: #ffffff;
  border: 3px solid #06d6a0;
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.3);
  z-index: 300;
  display: ${(props) => (props.isVisible ? "block" : "none")};
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const PasswordContent = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);

  h3 {
    text-align: center;
    color: #06d6a0;
    margin-bottom: 20px;
    font-weight: bold;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #333;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 2px solid #ddd;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #06d6a0;
    }
  }

  button {
    width: 100%;
    background: #06d6a0;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s;

    &:hover {
      background: #05c093;
    }
  }
`;

const PasswordCloseIcon = styled(FaTimes)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 1.5rem;
  color: #333;

  &:hover {
    color: #ff4b5c;
  }
`;

const PreferencesWindow = styled.div`
  position: absolute;
  top: 0;
  left: 105%;
  width: 340px;
  background: #ffffff;
  border: 3px solid #06d6a0; /* Added light green border */
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.3);
  z-index: 300;
  display: ${(props) => (props.isVisible ? "block" : "none")};
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;


const PreferencesContent = styled.div`
  background: #f0f2f5;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  h3 {
    text-align: center;
    color: #06d6a0;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.3rem;
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #444;
  }

  select {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 2px solid #ddd;
    border-radius: 10px;
    outline: none;
    background: #ffffff;
    transition: border-color 0.3s;

    &:focus {
      border-color: #06d6a0;
    }
  }

  button {
    width: 100%;
    background: #06d6a0;
    color: #fff;
    padding: 12px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s;

    &:hover {
      background: #05c093;
      transform: scale(1.03);
    }
  }
`;

const PreferencesCloseIcon = styled(FaTimes)`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  font-size: 1.5rem;
  color: #333;

  &:hover {
    color: #ff4b5c;
  }
`;

const SettingsWindow = styled.div`
  position: absolute;
  top: 0;
  left: 105%;
  width: 340px;
  background: #ffffff;
  border: 3px solid #06d6a0;
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.3);
  z-index: 300;
  display: ${(props) => (props.isVisible ? "block" : "none")};
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SettingsContent = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);

  h3 {
    text-align: center;
    color: #06d6a0;
    margin-bottom: 30px; /* Increased from 20px to 30px for better spacing */
    font-weight: bold;
    font-size: 1.3rem; /* Matches Password Change Window's heading size */
}

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #444;
  }

  select {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 2px solid #ddd;
    border-radius: 10px;
    outline: none;
    background: #ffffff;
    transition: border-color 0.3s;

    &:focus {
      border-color: #06d6a0;
    }
  }

  button {
    width: 100%;
    background: #06d6a0;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.1rem; /* Increased font size for better visibility */
    transition: background 0.3s;

    &:hover {
        background: #05c093;
        transform: scale(1.03);
    }
}

`;

const SettingsCloseIcon = styled(FaTimes)`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  font-size: 1.5rem;
  color: #333;

  &:hover {
    color: #ff4b5c;
  }
`;

const Account = ({ isOpen, setIsOpen, transactions }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [accountCreated, setAccountCreated] = useState("Not Available");
  const [lastLogin, setLastLogin] = useState("Not Available");

  const currentUser = localStorage.getItem("currentUser") || "User";

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const currentUser = localStorage.getItem("currentUser");

    if (users[currentUser] && users[currentUser].accountCreation) {
        setAccountCreated(users[currentUser].accountCreation);
    } else {
        setAccountCreated("Not Available");
    }

    const now = new Date().toLocaleString();
    localStorage.setItem("lastLogin", now);
    setLastLogin(now);
}, []);


  const [showPasswordWindow, setShowPasswordWindow] = useState(false);

  const handleChangePassword = () => {
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
  
    // Retrieve the currently logged-in user
    const currentUser = localStorage.getItem("currentUser");
  
    if (!currentUser) {
      alert("No user is currently logged in.");
      return;
    }
  
    // Retrieve the users object from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || {};
  
    // Check if current user exists in the stored data
    if (!users[currentUser]) {
      alert("User data not found. Please log in again.");
      return;
    }
  
    // Check if the entered current password matches the stored one
    if (users[currentUser].password !== currentPassword) {
      alert("Current password is incorrect.");
      return;
    }
  
    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
  
    // Update password in localStorage
    users[currentUser].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
  
    alert("Password changed successfully.");
    setShowPasswordWindow(false);
  };
  
  const [showPreferences, setShowPreferences] = useState(false);

  const [showSettings, setShowSettings] = useState(false);
  const [currency, setCurrency] = useState(localStorage.getItem("currency") || "rupee");
  const [tempCurrency, setTempCurrency] = useState(currency); // Add this state

  const handleCurrencyChange = (e) => {
      const selectedCurrency = e.target.value;
      setTempCurrency(selectedCurrency); // Store temporarily instead of changing immediately
  };
  
  const handleSaveSettings = () => {
      if (tempCurrency) {
          setCurrency(tempCurrency); 
          localStorage.setItem("currency", tempCurrency);
          alert(`Currency changed to ${tempCurrency.toUpperCase()}`);
          window.location.reload(); // Refresh the page to reflect changes immediately
      }
      setShowSettings(false);
  };
const navigate = useNavigate();

const handleAnalysisClick = () => {
  navigate('/analysis-tools', { state: { transactions } });
};

const handleTrackerAIClick = () => {
  navigate("/tracker-ai", { state: { transactions } });
};

  return (
    <>
      <AccountContainer isOpen={isOpen}>
        <Header>
          <span>User: {currentUser}</span>
          <CloseIcon onClick={() => setIsOpen(false)} />
        </Header>

        <OptionList>
          <OptionItem onClick={() => setShowDetails(true)}>
            <FaUser /> Account Details
          </OptionItem>
          <OptionItem onClick={() => setShowPasswordWindow(true)}>
  <FaKey /> Change Password
</OptionItem>


<OptionItem onClick={() => setShowSettings(true)}>
  <FaCog /> Settings
</OptionItem>

          <OptionItem onClick={() => setShowPreferences(true)}>
  <FaSlidersH /> Preferences
</OptionItem>

<OptionItem onClick={handleAnalysisClick}>
  <FaChartBar />
  Analysis Tools
</OptionItem>

<OptionItem onClick={handleTrackerAIClick}>
  <FaCommentDots /> Chat with Tracker AI
</OptionItem>
        </OptionList>

        {/* Account Details Window */}
        <DetailsWindow isVisible={showDetails}>
          <DetailsContent>
            <DetailsCloseIcon onClick={() => setShowDetails(false)} />
            <DetailsItem>
              <FaUser />
              <p><strong>Username:</strong> {currentUser}</p>
            </DetailsItem>

            <DetailsItem>
              <FaCalendarAlt />
              <p><strong>Account Created:</strong> {accountCreated}</p>
            </DetailsItem>

            <DetailsItem>
              <FaClock />
              <p><strong>Last Login:</strong> {lastLogin}</p>
            </DetailsItem>
          </DetailsContent>
        </DetailsWindow>

        <PasswordWindow isVisible={showPasswordWindow}>
  <PasswordContent>
    <PasswordCloseIcon onClick={() => setShowPasswordWindow(false)} />
    
    <label>Current Password</label>
    <input id="currentPassword" type="password" />

    <label>New Password</label>
    <input id="newPassword" type="password" />

    <label>Confirm New Password</label>
    <input id="confirmPassword" type="password" />

    <button onClick={handleChangePassword}>Change Password</button>
  </PasswordContent>
</PasswordWindow>

<PreferencesWindow isVisible={showPreferences}>
  <PreferencesContent>
    <PreferencesCloseIcon onClick={() => setShowPreferences(false)} />
    
    <h3>Preferences</h3>

    <label>Theme</label>
    <select
      value={localStorage.getItem("theme") || "light"}
      onChange={(e) => {
        const selectedTheme = e.target.value;
        localStorage.setItem("theme", selectedTheme);
        window.location.reload(); // Refresh to apply theme immediately
      }}
    >
      <option value="light">Light Mode</option>
      <option value="dark">Dark Mode</option>
    </select>
  </PreferencesContent>
</PreferencesWindow>

<SettingsWindow isVisible={showSettings}>
  <SettingsContent>
    <SettingsCloseIcon onClick={() => setShowSettings(false)} />
    <h3>Settings</h3>
    <label>Select Currency:</label>
    <select value={tempCurrency || currency} onChange={handleCurrencyChange}>
      <option value="rupee">Rupee (₹)</option>
      <option value="dollar">Dollar ($)</option>
      <option value="euro">Euro (€)</option>
    </select>
    <button onClick={handleSaveSettings}>Save</button>
  </SettingsContent>
</SettingsWindow>


      </AccountContainer>
    </>
  );
};

export default Account;
