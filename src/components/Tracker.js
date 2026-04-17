import React, { useEffect, useState } from "react"; 
import styled from "styled-components";
import AddTransaction from "./AddTransaction";
import OverviewComponent from "./OverviewComponent";
import TransactionsContainer from "./TransactionsContainer";
import PieChartComponent from "./PieChartComponent";
import Download from "./Download";
import Account from "./Account"; 
import { FaUserCircle } from "react-icons/fa"; 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;
  max-width: 95%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 30px 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  margin: 20px auto;
  backdrop-filter: blur(10px);
  position: relative;
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 30px;
  right: 25px;
  background-color: #e63946;
  color: white;
  padding: 8px 12px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  width: auto; /* Ensures full clickable area */
  display: inline-block; /* Fixes potential shrinking */
  z-index: 10; /* Ensures the button is above overlapping elements */

  &:hover {
    background-color: #d62839;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
    padding: 6px 10px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    position: static;
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    text-align: center;
  }
`;


const HeadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
`;

const AccountIcon = styled(FaUserCircle)` 
  position: absolute;
  left: 20px;
  font-size: 2.5rem;
  color: #06d6a0;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    color: #028b6d;
    transform: scale(1.1);
  }
`;

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #06d6a0;
  text-transform: uppercase;
  text-align: center;
`;

const TransactionDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
`;

const ExpenseBox = styled.div`
  flex: 1;
  border: 1px solid ${(props) => (props.isExpense ? "#e63946" : "#06d6a0")};
  border-radius: 10px;
  padding: 15px 20px;
  background: ${(props) =>
    props.isExpense ? "rgba(230, 57, 70, 0.1)" : "rgba(6, 214, 160, 0.1)"};
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  & span {
    font-weight: bold;
    font-size: 1.5rem;
    display: block;
    color: ${(props) => (props.isExpense ? "#e63946" : "#06d6a0")};
  }
`;

const IncomeBox = styled(ExpenseBox)``;
const currencySymbols = {
  rupee: "₹",
  dollar: "$",
  euro: "€"
};


const Tracker = ({ setIsLoggedIn }) => {
  const currentUser = localStorage.getItem("currentUser");
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [transactions, setTransactions] = useState(() => {
    if (!currentUser) return [];
    const savedTransactions = localStorage.getItem(`transactions_${currentUser}`);
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`transactions_${currentUser}`, JSON.stringify(transactions));
    }
    calculateTransactions(transactions);
  }, [transactions, currentUser]);

  const AddTransactions = (payload) => {
    setTransactions((prevTransactions) => [...prevTransactions, payload]);
  };

  const removeTransaction = (id) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== id)
    );
  };

  const calculateTransactions = (transactionsData) => {
    let exp = 0,
      inc = 0;
    transactionsData.forEach((item) => {
      item.transType === "expense" ? (exp += item.amount) : (inc += item.amount);
    });
    setExpense(exp);
    setIncome(inc);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
  };

  const [currencySymbol, setCurrencySymbol] = useState("₹");

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency") || "rupee"; 
    setCurrencySymbol(currencySymbols[savedCurrency] || "₹"); 
  }, []);

  return (
    <Container>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>

      <HeadingContainer>
        <AccountIcon onClick={() => setIsAccountOpen(!isAccountOpen)} />
        <Heading>Expense Tracker</Heading>
      </HeadingContainer>

      <Account 
       isOpen={isAccountOpen} 
       setIsOpen={setIsAccountOpen}
       transactions={transactions} // Pass transactions as a prop
      />


      <OverviewComponent
        toggle={toggle}
        setToggle={setToggle}
        expense={expense}
        income={income}
        currencySymbol={currencySymbol}
      />

      {toggle && <AddTransaction setToggle={setToggle} AddTransactions={AddTransactions} />}

      <TransactionDetails>
      <IncomeBox>
  Income <span>{currencySymbol}{income}</span>
</IncomeBox>

<ExpenseBox isExpense>
  Expense <span>{currencySymbol}{expense}</span>
</ExpenseBox>

      </TransactionDetails>

      <TransactionsContainer
        transactions={transactions}
        removeTransaction={removeTransaction}
      />
      <PieChartComponent transactions={transactions} />
      <Download transactions={transactions} />
    </Container>
  );
};

export default Tracker;
