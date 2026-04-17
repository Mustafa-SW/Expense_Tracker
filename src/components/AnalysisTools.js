import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  max-width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 40px 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  margin: 20px auto;
  backdrop-filter: blur(10px);
  position: relative;
`;

const Heading = styled.h1`
  text-align: center;
  color: #06d6a0;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 2rem;
`;

const BackButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #06d6a0;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;

  &:hover {
    background-color: #04b58e;
  }
`;

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 10px;
  border: 2px solid #06d6a0;
  border-radius: 8px;
  background-color: #ffffff;
  width: 100%;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid #06d6a0;
  border-radius: 8px;
  background-color: #ffffff;
  width: 100%;
`;

const GraphContainer = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
  margin-top: 20px;
`;

const GraphBox = styled.div`
  flex: 1;
  border: 2px solid #06d6a0;
  border-radius: 10px;
  padding: 15px;
  background: #f8f9fa;
`;

const AnalysisTools = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transactions = location.state?.transactions || [];

  const [analysisType, setAnalysisType] = useState("yearly");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState("");

  const incomeCategories = [
    "Salary",
    "Investments",
    "Freelance",
    "Bonus",
    "Gifts",
    "Returns",
    "Other",
  ];

  const expenseCategories = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
  ];

  const normalizeDate = (dateStr) => {
    if (!dateStr) return null; // Handle undefined or empty date safely
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`; // Converts to YYYY-MM-DD format for consistent parsing
  };
  
  const calculateCategoryData = (categories, type) => {
    return categories.map((category) =>
      transactions
        .filter((item) => {
          const itemDate = normalizeDate(item.transactionDate); // Correct date field reference
          if (!itemDate) return false; // Skip invalid dates
          
          const parsedDate = new Date(itemDate);
  
          if (isNaN(parsedDate.getTime())) return false; // Skip if parsing fails
  
          const itemYear = parsedDate.getFullYear().toString();
          const itemMonth = parsedDate.toLocaleString("default", { month: "long" });
  
          if (analysisType === "yearly") {
            return (
              item.transType === type &&
              item.category === category &&
              itemYear === year
            );
          }
  
          if (analysisType === "monthly") {
            return (
              item.transType === type &&
              item.category === category &&
              itemYear === year &&
              itemMonth === month
            );
          }
  
          return false;
        })
        .reduce((sum, item) => sum + (item.amount || 0), 0) // Handle undefined amounts safely
    );
  };
  
  const incomeData = {
    labels: incomeCategories,
    datasets: [
      {
        label: "Income",
        data: calculateCategoryData(incomeCategories, "income"),
        backgroundColor: "#06d6a0",
      },
    ],
  };

  const expenseData = {
    labels: expenseCategories,
    datasets: [
      {
        label: "Expenses",
        data: calculateCategoryData(expenseCategories, "expense"),
        backgroundColor: "#e63946",
      },
    ],
  };

  return (
    <Container>
      <BackButton onClick={() => navigate("/")}>Back to Tracker</BackButton>
      <Heading>Analysis Tools</Heading>

      <SelectionContainer>
        <Select
          value={analysisType}
          onChange={(e) => setAnalysisType(e.target.value)}
        >
          <option value="yearly">Yearly</option>
          <option value="monthly">Monthly</option>
        </Select>

        {analysisType === "yearly" && (
          <Input
            type="number"
            placeholder="Enter Year (e.g., 2025)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        )}

        {analysisType === "monthly" && (
          <>
            <Select value={month} onChange={(e) => setMonth(e.target.value)}>
              <option value="">Select Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </Select>

            <Input
              type="number"
              placeholder="Enter Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </>
        )}
      </SelectionContainer>

      <GraphContainer>
        <GraphBox>
          <Bar data={incomeData} />
        </GraphBox>

        <GraphBox>
          <Bar data={expenseData} />
        </GraphBox>
      </GraphContainer>
    </Container>
  );
};

export default AnalysisTools;
