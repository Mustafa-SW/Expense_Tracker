import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import TransactionItem from "./TransactionItem";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h2`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border-radius: 5px;
  border: 2px solid #06d6a0; /* Green border for a fresh look */
  background-color: #ffffff; /* White background for clarity */
  color: #333; /* Dark text for readability */
  font-size: 1rem;
  transition: 0.3s ease;

  &:focus {
    border-color: #028a64; /* Slightly darker green on focus */
    box-shadow: 0 0 6px rgba(6, 214, 160, 0.5);
    outline: none;
  }
`;

const Select = styled.select`
  flex: 1;
  padding: 12px;
  border-radius: 5px;
  border: 2px solid #06d6a0; /* Matching border */
  background-color: #ffffff;
  color: #333;
  font-size: 1rem;
  transition: 0.3s ease;

  &:focus {
    border-color: #028a64;
    box-shadow: 0 0 6px rgba(6, 214, 160, 0.5);
    outline: none;
  }
`;



const ClearButton = styled.button`
  background-color: #e63946;
  color: white;
  padding: 10px 15px; /* Reduced padding for a smaller button */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  width: auto; /* Auto width based on content */
  min-width: 120px; /* Ensures it doesn't become too small */
  transition: 0.3s ease;

  &:hover {
    background-color: #d62839;
  }

`;

const TransactionItems = styled.div``;

const TransactionsContainer = ({ transactions, removeTransaction }) => {
  const [searchInput, setSearchInput] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  
  const applyFilters = useCallback(() => {
    let filtered = [...transactions];
  
    if (searchInput.trim()) {
      filtered = filtered.filter((item) =>
        item.details.toLowerCase().includes(searchInput.toLowerCase().trim())
      );
    }
  
    if (dateFilter.trim()) {
      filtered = filtered.filter((item) => {
        const formattedDate = item.transactionDate.trim();
        return formattedDate === dateFilter.trim();
      });
    }
  
    if (categoryFilter.trim()) {
      filtered = filtered.filter((item) => item.category === categoryFilter);
    }
  
    if (minAmount.trim()) {
      filtered = filtered.filter((item) => item.amount >= Number(minAmount));
    }
  
    if (maxAmount.trim()) {
      filtered = filtered.filter((item) => item.amount <= Number(maxAmount));
    }
  
    // Sort transactions by date in descending order
    filtered.sort((a, b) => {
  const parseDate = (dateStr) => {
    const parts = dateStr.trim().split(/[-/]/).map(Number); // Support both '-' and '/'
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return new Date(year, month - 1, day).getTime();
    }
    return 0; // Handle empty or invalid dates
  };

  return parseDate(b.transactionDate) - parseDate(a.transactionDate);
});

  
    setFilteredTransactions(filtered);
  }, [transactions, searchInput, dateFilter, categoryFilter, minAmount, maxAmount]);  
  
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);
  

  const clearFilters = () => {
    setSearchInput("");
    setDateFilter("");
    setCategoryFilter("");
    setMinAmount("");
    setMaxAmount("");
    setFilteredTransactions(transactions);
  };

  return (
    <Container>
      <Heading>Transactions</Heading>

      {/* Filters Section */}
      <FiltersContainer>
  

        <Input
          type="text"
          placeholder="Enter Date (DD-MM-YYYY)"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Salary">Salary</option>
          <option value="Freelancing">Freelancing</option>
          <option value="Bonus">Bonus</option>
          <option value="Investments">Investments</option>
          <option value="Gifts">Gifts</option>
          <option value="Returns">Returns</option>
          <option value="Other">Other</option>
        </Select>

        <Input
          type="number"
          placeholder="Min Amount"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
        />

        <Input
          type="number"
          placeholder="Max Amount"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
        />
        
        <Input
          type="text"
          placeholder="Search by details"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <ClearButton onClick={clearFilters}>Clear Filters</ClearButton>
      </FiltersContainer>

      {/* Transactions List */}
      <TransactionItems>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <TransactionItem
              transaction={transaction}
              key={transaction.id}
              removeTransaction={removeTransaction}
            />
          ))
        ) : (
          <p>No Transactions Found</p>
        )}
      </TransactionItems>
    </Container>
  );
};

export default TransactionsContainer;
