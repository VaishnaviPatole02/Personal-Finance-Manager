import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import ExpensesTable from "./ExpensesTable";
import PieChartComponent from "./PieChartComponent";  
import BarChartComponent from "./BarChartComponent";
import AddExpenseForm from "./AddExpenseForm";

const Expenses = () => {
  const [showPieChart, setShowPieChart] = useState(false);
  const [showBarChart, setShowBarChart] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [transactions, setTransactions] = useState([
    { date: "2025-02-23", title: "Groceries", amount: 500, type: "debit", category: "Food" },
    { date: "2025-02-22", title: "Freelance Payment", amount: 3000, type: "credit", category: "Income" },
  ]);

  // Add New Expense
  const addExpense = (newExpense) => {
    setTransactions([...transactions, newExpense]);
  };

  // Delete Expense
  const handleDelete = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
  };

  return (
    <Container className="mt-5">
      <h1 className="fw-bold text-primary text-center">Expense Dashboard</h1>

      {/* Add Expense Button */}
      <Button 
        variant="success" 
        className="mb-3" 
        onClick={() => setShowAddExpense(true)}
      >
        + Add Expense
      </Button>

      {/* Show Pie Chart & Bar Chart Buttons */}
      <div className="mb-3">
        <Button 
          variant="primary" 
          className="me-2" 
          onClick={() => setShowPieChart(!showPieChart)}
        >
          {showPieChart ? "Hide Pie Chart" : "Show Pie Chart"}
        </Button>

        <Button 
          variant="primary" 
          onClick={() => setShowBarChart(!showBarChart)}
        >
          {showBarChart ? "Hide Bar Chart" : "Show Bar Chart"}
        </Button>
      </div>

      {/* Expense Table */}
      <ExpensesTable transactions={transactions} onDelete={handleDelete} />

      {/* Conditional Rendering for Charts */}
      {showPieChart && <PieChartComponent transactions={transactions} />}
      {showBarChart && <BarChartComponent transactions={transactions} />}

      {/* Add Expense Form (Modal-like) */}
      {showAddExpense && <AddExpenseForm addExpense={addExpense} onClose={() => setShowAddExpense(false)} />}
    </Container>
  );
};

export default Expenses;
