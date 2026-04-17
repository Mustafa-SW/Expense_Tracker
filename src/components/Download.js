import React from "react";
import styled from "styled-components";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Correctly importing autoTable

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;

const DownloadButton = styled.button`
  background-color: #0073e6;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background-color: #005bb5;
  }
`;

const Download = ({ transactions }) => {
  // ✅ Function to download XLS file
  const downloadXLS = () => {
    if (!transactions || transactions.length === 0) {
      alert("No transactions available to download!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "transactions.xlsx");
  };

  // ✅ Function to download PDF file
  const downloadPDF = () => {
    if (!transactions || transactions.length === 0) {
      alert("No transactions available to download!");
      return;
    }

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold"); // ✅ Ensure proper font for numbers
    doc.text("Transaction Report", 20, 10);

    const tableColumn = ["Date", "Category", "Details", "Amount", "Type"];
    const tableRows = transactions.map((txn) => [
      txn.transactionDate,
      txn.category,
      txn.details,
      txn.amount.toLocaleString("en-IN"), // ✅ Amount with NO prefix, formatted correctly
      txn.transType,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("transactions.pdf");
  };

  return (
    <Container>
      <DownloadButton onClick={downloadXLS}>Download XLS</DownloadButton>
      <DownloadButton onClick={downloadPDF}>Download PDF</DownloadButton>
    </Container>
  );
};

export default Download;
