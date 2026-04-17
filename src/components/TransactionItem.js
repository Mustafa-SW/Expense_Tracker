import React, { useEffect, useState } from "react";
import styled from "styled-components";

const categoryIcons = {
  Food: "🍔",
  Transport: "🚗",
  Shopping: "🛍️",
  Bills: "💡",
  Entertainment: "🎬",
  Health: "🏥",
  Education: "📚",
  Salary: "💰",
  Freelancing: "🖥️",
  Bonus: "🎁",
  Investments: "📈",
  Gifts: "🎉",
  Returns: "🔄",
  Other: "✨",
};

const currencySymbols = {
  rupee: "₹",
  dollar: "$",
  euro: "€",
  pound: "£",
  yen: "¥",
};

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 22px;
  border: 1px solid #e6e8e9;
  border-radius: 12px;
  background-color: #ffffff;
  border-left: 8px solid ${(props) => (props.isExpense ? "#e63946" : "#06d6a0")};
  margin-bottom: 15px;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 7px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #444;
  flex: 1.5;
`;

const CategoryIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 10px;
`;

const Detail = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  flex: 2;
`;

const Amount = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => (props.isExpense ? "#e63946" : "#06d6a0")};
  flex: 1;
  text-align: center;
`;

const Date = styled.span`
  font-size: 1rem;
  color: #666;
  flex: 1;
  text-align: center;
`;

const RemoveButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  font-size: 1rem;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  flex: 0.8;
  text-transform: uppercase;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e63946;
  }

  &:active {
    transform: scale(0.96);
  }
`;

const TransactionItem = ({ transaction, removeTransaction }) => {
  const [currencySymbol, setCurrencySymbol] = useState("₹");

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency") || "rupee";
    setCurrencySymbol(currencySymbols[savedCurrency] || "₹");
  }, []);

  return (
    <Item isExpense={transaction?.transType === "expense"}>
      <Category>
        <CategoryIcon>{categoryIcons[transaction.category] || "❓"}</CategoryIcon>
        {transaction.category}
      </Category>
      <Detail>{transaction.details}</Detail>
      <Amount isExpense={transaction?.transType === "expense"}>
        {currencySymbol}{transaction.amount}
      </Amount>
      <Date>{transaction.transactionDate}</Date>
      <RemoveButton onClick={() => removeTransaction(transaction.id)}>
        Remove
      </RemoveButton>
    </Item>
  );
};

export default TransactionItem;
