import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 20px 15px;
  margin-bottom: 25px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  border: none;
  max-width: 500px;
  margin: 0 auto;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  outline: none;
  border-radius: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  font-size: 1rem;
  background-color: rgba(240, 240, 240, 0.8);
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #06d6a0;
    box-shadow: 0 0 4px rgba(6, 214, 160, 0.8);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 15px;
  outline: none;
  border-radius: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  font-size: 1rem;
  background-color: rgba(240, 240, 240, 0.8);
  cursor: pointer;
`;

const ErrorMessage = styled.span`
  position: absolute;
  top: 100%;
  left: 10px;
  font-size: 0.85rem;
  color: #e63946;
  margin-top: 5px;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const RadioContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
  gap: 20px;
`;

const Label = styled.label`
  margin-left: 8px;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
`;

const RadioBtn = styled.div`
  display: flex;
  align-items: center;
`;

const SubmitBtn = styled.button`
  background-color: #06d6a0;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #05c392;
  }
  &:active {
    transform: scale(0.98);
  }
`;

// List of categories with types
const categories = [
  // Expense Categories
  { name: "Food", icon: "🍔", type: "expense" },
  { name: "Transport", icon: "🚗", type: "expense" },
  { name: "Shopping", icon: "🛍️", type: "expense" },
  { name: "Bills", icon: "💡", type: "expense" },
  { name: "Entertainment", icon: "🎬", type: "expense" },
  { name: "Health", icon: "🏥", type: "expense" },
  { name: "Education", icon: "📚", type: "expense" },

  // Income Categories
  { name: "Salary", icon: "💰", type: "income" },
  { name: "Freelancing", icon: "🖥️", type: "income" },
  { name: "Bonus", icon: "🎁", type: "income" },
  { name: "Investments", icon: "📈", type: "income" },
  { name: "Gifts", icon: "🎉", type: "income" },
  { name: "Returns", icon: "🔄", type: "income" },
  { name: "Other", icon: "✨", type: "income" },
];

const isValidDate = (dateStr) => {
  const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dateStr.match(datePattern);

  if (!match) return false; // Invalid format

  const [day, month, year] = match.slice(1).map(Number); // Extract values directly
  const enteredDate = new Date(year, month - 1, day); // JavaScript months are 0-indexed

  const isValid = 
    enteredDate.getDate() === day &&
    enteredDate.getMonth() === month - 1 &&
    enteredDate.getFullYear() === year;

  const today = new Date();
  return isValid && enteredDate <= today;
};

const AddTransaction = ({ setToggle, AddTransactions }) => {
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [transType, setTransType] = useState("expense");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAmount(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Only digits are allowed!");
    }
  };

  // Filter categories based on selected transaction type
  const filteredCategories = categories.filter((cat) => cat.type === transType);

  const AddTransactionData = () => {
    if (!amount || !details || !transactionDate || !selectedCategory) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (!isValidDate(transactionDate)) {
      setErrorMessage("Invalid date! Please enter a valid past or present date in DD/MM/YYYY format.");
      return;
    }
    AddTransactions({
      amount: Number(amount),
      details,
      transactionDate,
      transType,
      category: selectedCategory, // Store selected category
      id: Date.now(),
    });
    setToggle();
  };

  return (
    <Container>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Enter Amount"
          value={amount}
          onChange={handleAmountChange}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputWrapper>

      <Input
        type="text"
        placeholder="Enter Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
<Input
  type="text"
  placeholder="Enter Date (DD/MM/YYYY)"
  value={transactionDate}
  onChange={(e) => {
    setTransactionDate(e.target.value);
    setErrorMessage(""); // Clear error when user modifies the date
  }}
/>


      {/* Category Dropdown */}
      <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="" disabled>
          Select Category
        </option>
        {filteredCategories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.icon} {category.name}
          </option>
        ))}
      </Select>

      <RadioContainer>
      <RadioBtn>
          <input
            type="radio"
            id="income"
            name="type"
            value="income"
            checked={transType === "income"}
            onChange={(e) => setTransType(e.target.value)}
          />
          <Label htmlFor="income">Income</Label>
        </RadioBtn>
        
        <RadioBtn>
          <input
            type="radio"
            id="expense"
            name="type"
            value="expense"
            checked={transType === "expense"}
            onChange={(e) => setTransType(e.target.value)}
          />
          <Label htmlFor="expense">Expense</Label>
        </RadioBtn>

        
      </RadioContainer>

      <SubmitBtn onClick={AddTransactionData}>Add Transaction</SubmitBtn>
    </Container>
  );
};

export default AddTransaction;
