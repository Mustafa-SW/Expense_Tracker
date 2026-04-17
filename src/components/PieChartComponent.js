import React from "react";
import styled from "styled-components";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Container = styled.div`
  text-align: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 30px;
  margin: 20px auto;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  max-width: 800px; /* Increased width to fit both charts */
`;


const ChartsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const ChartWrapper = styled.div`
  height: 350px;
  width: 350px;
`;

const ChartHeading = styled.h4`
  text-align: center;
  margin-bottom: 15px; /* Added extra spacing below headings */
  font-size: 1.2rem;
  font-weight: bold;
`;

const categoryColors = [
  "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
  "#FF9F40", "#D9D9D9", "#FF4500", "#8A2BE2", "#5F9EA0",
];

const groupByCategory = (transactions, type) => {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return {};
  }
  return transactions
    .filter((transaction) => transaction.transType === type)
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {});
};

const PieChartComponent = ({ transactions = [] }) => {
  const incomeData = groupByCategory(transactions, "income");
  const expenseData = groupByCategory(transactions, "expense");

  const incomeCategories = Object.keys(incomeData);
  const expenseCategories = Object.keys(expenseData);

  const incomeAmounts = Object.values(incomeData);
  const expenseAmounts = Object.values(expenseData);

  const incomeChartData = {
    labels: incomeCategories.length > 0 ? incomeCategories : ["No Income"],
    datasets: [
      {
        label: "Income Distribution",
        data: incomeCategories.length > 0 ? incomeAmounts : [1],
        backgroundColor: incomeCategories.length > 0
          ? categoryColors.slice(0, incomeCategories.length)
          : ["#D3D3D3"],
        hoverBackgroundColor: categoryColors.slice(0, incomeCategories.length),
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };

  const expenseChartData = {
    labels: expenseCategories.length > 0 ? expenseCategories : ["No Expenses"],
    datasets: [
      {
        label: "Expense Distribution",
        data: expenseCategories.length > 0 ? expenseAmounts : [1],
        backgroundColor: expenseCategories.length > 0
          ? categoryColors.slice(0, expenseCategories.length)
          : ["#D3D3D3"],
        hoverBackgroundColor: categoryColors.slice(0, expenseCategories.length),
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ₹${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <Container>
      <ChartsContainer>
        <ChartWrapper>
          <ChartHeading style={{ color: "#06d6a0" }}>Income Distribution</ChartHeading>
          <Pie data={incomeChartData} options={options} />
        </ChartWrapper>

        <ChartWrapper>
          <ChartHeading style={{ color: "#e63946" }}>Expense Distribution</ChartHeading>
          <Pie data={expenseChartData} options={options} />
        </ChartWrapper>
      </ChartsContainer>
    </Container>
  );
};

export default PieChartComponent;
