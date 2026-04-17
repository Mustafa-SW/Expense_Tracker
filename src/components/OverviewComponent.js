// FileName: OverviewComponent.js

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding: 15px 20px;
  background-color: rgba(255, 255, 255, 0.9); /* Subtle white background */
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15); /* Subtle shadow */
`;

const Balance = styled.h2`
  font-weight: 500;
  font-size: 1.5rem;
  color: #333;
  margin: 0;
  & span {
    font-weight: bold;
    color: ${(props) => (props.bal < 0 ? "#e63946" : "#06d6a0")}; /* Red for negative, green for positive */
  }
`;

const AddBtn = styled.button`
  cursor: pointer;
  background-color: #0073e6; /* Modern blue */
  color: #fff;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  text-transform: uppercase;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 115, 230, 0.3);

  &:hover {
    background-color: #005bb5; /* Slightly darker blue on hover */
    box-shadow: 0px 6px 8px rgba(0, 91, 181, 0.4);
  }

  &:active {
    transform: scale(0.98); /* Slight click effect */
  }
`;

const OverviewComponent = ({ toggle, setToggle, income, expense, currencySymbol }) => {
  const bal = income - expense;

  return (
    <Container>
      <Balance bal={bal}>
        Balance <span>{currencySymbol}{bal}</span> {/* Currency symbol added */}
      </Balance>
      <AddBtn onClick={() => setToggle(!toggle)}>
        {toggle ? "Cancel" : "Add"}
      </AddBtn>
    </Container>
  );
};

export default OverviewComponent;
