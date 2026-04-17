import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginBox = styled.div`
  background: #f5efe6;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 380px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  color: #06d6a0;
  font-family: "Poppins", sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  text-align: center;
  outline: none;
  transition: 0.3s;

  &:focus {
    border-color: #06d6a0;
    box-shadow: 0px 2px 8px rgba(6, 214, 160, 0.2);
  }
`;

const Button = styled.button`
  background-color: ${(props) => (props.secondary ? "#0073e6" : "#06d6a0")};
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
  transition: 0.3s;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${(props) => (props.secondary ? "#005bb5" : "#04b589")};
    transform: scale(1.02);
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d4d;
  font-size: 0.9rem;
`;

const SignUpMessage = styled.p`
  margin-top: 15px;
  font-size: 0.9rem;
  color: #555;
`;

const Modal = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  width: 340px;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 1000;
`;

const ModalHeading = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username] && users[username].password === password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", username);

      // Save Last Login Date
      const currentDateTime = new Date().toLocaleString();
      users[username].lastLogin = currentDateTime;
      localStorage.setItem("users", JSON.stringify(users));

      setIsLoggedIn(true);
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleSignUp = () => {
    setShowSignUp(true);
  };

  const handleRegister = () => {
    if (!newUsername || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[newUsername]) {
      setError("Username already exists.");
      return;
    }

    const currentDateTime = new Date().toLocaleString();

    users[newUsername] = {
      password: newPassword,
      accountCreation: currentDateTime,
      lastLogin: "Never",
    };

    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem(`transactions_${newUsername}`, JSON.stringify([]));

    setError("Account created successfully! Now login.");
    setShowSignUp(false);
  };

  return (
    <Container>
      <LoginBox>
        <Title>Expense Tracker</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Login</Button>
        <SignUpMessage>New to Expense Tracker?</SignUpMessage>
        <Button secondary onClick={handleSignUp}>
          Sign Up
        </Button>
      </LoginBox>

      {/* Sign-up Modal */}
      <Modal show={showSignUp}>
        <ModalHeading>Sign Up</ModalHeading>
        <Input
          type="text"
          placeholder="Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button onClick={handleRegister}>Register</Button>
        <Button secondary onClick={() => setShowSignUp(false)}>
          Close
        </Button>
      </Modal>
    </Container>
  );
};

export default Login;
