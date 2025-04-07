import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import ExpensesTable from "../components/ExpensesTable";
import EditFormModel from "../components/EditFormModel";
import { getExpenses, deleteExpense, updateExpense } from "../services/api";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  //  Fetch expenses on component mount
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const response = await getExpenses();
        setExpenses(response);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    loadExpenses();
  }, []);

  
  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  
  const handleEdit = (expense) => {
    setSelectedTransaction(expense);
    setShowModal(true);
  };

  
  const handleUpdate = async (updatedExpenseData) => {
    try {
      const response = await updateExpense(selectedTransaction._id, updatedExpenseData);
      if (!response.error) {
        setExpenses(expenses.map((expense) => (expense._id === selectedTransaction._id ? response : expense)));
        setShowModal(false);
      } else {
        console.error("Error updating expense:", response.error);
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <h4>Track Your Expenses</h4>
          <ExpensesTable transactions={expenses} onEdit={handleEdit} onDelete={handleDelete} />
        </Card.Body>
      </Card>

      
      <EditFormModel
        showModal={showModal}
        selectedTransaction={selectedTransaction}
        setSelectedTransaction={setSelectedTransaction}
        handleUpdate={handleUpdate}
        setShowModal={setShowModal}
      />
    </Container>
  );
};

export default Expenses;
