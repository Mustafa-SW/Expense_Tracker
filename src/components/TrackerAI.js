import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation} from "react-router-dom";
import { IoSend } from "react-icons/io5"; // New icon for a fresh look
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 750px;
  max-width: 95%;
  background-color: #f8f9fa;
  border: 2px solid #06d6a0;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  margin: 40px auto;
  padding: 25px;
  position: relative;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Heading = styled.h2`
  color: #06d6a0;
  font-weight: bold;
  font-size: 28px; /* Increased font size for better prominence */
`;


const BackButton = styled.button`
  background-color: #e63946;
  color: #ffffff;
  border: none;
  border-radius: 15px;
  padding: 10px 20px; /* Increased padding for larger size */
  font-size: 16px; /* Slightly larger text */
  cursor: pointer;

  &:hover {
    background-color: #d62839;
  }
`;


const ChatWindow = styled.div`
  height: 350px; /* Reduced height for a more compact look */
  overflow-y: auto;
  background: linear-gradient(135deg, #e6f9f5 0%, #f3f4f6 100%);
  border: 1px solid #06d6a0;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.1);
`;


const Message = styled.div`
  margin-bottom: 10px;
  padding: 12px 18px;
  border-radius: 10px;
  background-color: ${({ isUser }) => (isUser ? "#06d6a0" : "rgba(250, 240, 230, 0.7)")}; /* Softer crème with higher opacity */
  color: ${({ isUser }) => (isUser ? "#fff" : "#444")}; /* Slightly darker text for contrast */
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  max-width: 70%;
  border: ${({ isUser }) => (isUser ? "none" : "1px solid rgba(224, 201, 169, 0.8)")}; /* Softer border */
`;



const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  height: 70px;    /* Increased height for a larger input area */
`;

const Input = styled.input`
  flex: 1;
  padding: 18px;    /* Adjusted padding to match the increased height */
  border: 2px solid #06d6a0;
  border-radius: 15px;
  background-color: #ffffff;
  font-size: 16px;  /* Kept font size reasonable for better readability */
`;


const SendButton = styled.button`
  background-color: #06d6a0;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 8px; /* Added margin for better alignment */

  &:hover {
    background-color: #04b58e;
  }

  svg {
    color: #ffffff;
    font-size: 22px;
  }
`;


const TrackerAI = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const location = useLocation();
  const transactions = location.state?.transactions || [];
  
  const [messages, setMessages] = useState([
    { text: "Welcome to Tracker AI. Feel free to seek help and advice regarding your transaction data.", isUser: false }
  ]);

  const API_KEY = "6bcc31de228e20132c893801a098c6e78aaaa596184f07ea7872cb0de0c5f97a";  // Replace with your actual API key
  const API_URL = "https://api.together.xyz/v1/chat/completions";

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, isUser: true }];
    setMessages(newMessages);
    setInput("");

    // Function to format dates properly
    const formatDate = (dateStr) => {
        const dateObj = new Date(dateStr);
        return isNaN(dateObj) ? dateStr : dateObj.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
    };

    // Structure transactions with formatted dates
    const transactionText = transactions.length > 0
        ? transactions.map((t, i) => 
            `(${i + 1}) Date: ${formatDate(t.transactionDate)}, Category: ${t.category}, Amount: ₹${t.amount}`
          ).join("\n")
        : "No transactions available.";

    const userPrompt = `User's transaction history (formatted):\n${transactionText}\n\nUser's query: ${input}`;

    try {
        const response = await axios.post(
            API_URL,
            {
                model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
                messages: [{ role: "user", content: userPrompt }],
                max_tokens: 200
            },
            {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const aiResponse = response.data.choices[0].message.content;
        setMessages([...newMessages, { text: aiResponse, isUser: false }]);
    } catch (error) {
        console.error("Error fetching AI response:", error);
        setMessages([...newMessages, { text: "Error: Unable to reach AI. Please try again.", isUser: false }]);
    }
};

 
  return (
    <Container>
      <TopBar>
        <Heading>Tracker AI</Heading>
        <BackButton onClick={() => navigate("/")}>Back to Tracker</BackButton>
      </TopBar>

      <ChatWindow>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.isUser}>
            {msg.text}
          </Message>
        ))}
      </ChatWindow>

      <InputContainer>
        <Input
          type="text"
          placeholder="Ask Tracker AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <SendButton onClick={handleSendMessage}>
        <IoSend />
        </SendButton>
      </InputContainer>
    </Container>
  );
};

export default TrackerAI;
