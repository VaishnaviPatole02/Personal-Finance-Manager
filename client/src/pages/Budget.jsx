import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container, Table, Modal } from "react-bootstrap";
import { saveBudget, getBudgets, getExpenses } from "../services/api"; // ✅ Correct Import

const Budget = () => {
  const [showForm, setShowForm] = useState(false);
  const [budget, setBudget] = useState({ category: "", amount: "" });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchBudgets();
    fetchExpenses();
  }, []);

  const fetchBudgets = async () => {
    try {
      const data = await getBudgets();
      setBudgets(data);
    } catch (err) {
      console.error("Failed to fetch budgets:", err);
      setError("Session expired! Please log in again.");
    }
  };
  
  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
      setError("Session expired! Please log in again.");
    }
  };

  const handleChange = (e) => {
    setBudget({ ...budget, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!budget.category || !budget.amount) {
      setError("Both Category and Amount are required!");
      return;
    }

    try {
      await saveBudget(budget);
      setSuccess("Budget saved successfully!");
      fetchBudgets();
      setShowForm(false);
    } catch (err) {
      console.error("Error saving budget:", err);
      setError("Failed to save budget.");
    }

    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 2000);
  };

  // Calculate current balance for each category
  const calculateCurrentBalance = (category, budgetAmount) => {
    const totalExpenses = expenses
      .filter((expense) => expense.category === category && expense.type === "debit")
      .reduce((sum, expense) => sum + expense.amount, 0);
    return budgetAmount - totalExpenses;
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center" style={{ color: "black" }}>Manage Your Budget</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Button variant="dark" onClick={() => setShowForm(true)} style={{ display: "block", margin: "0 auto" }}>Set Budget</Button>

      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Set Monthly Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" value={budget.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="Salary">Salary</option>
                <option value="Freelancing">Freelancing</option>
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Others">Others</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" name="amount" value={budget.amount} onChange={handleChange} required />
            </Form.Group>

            <Button type="submit" variant="dark" className="mt-2">Save Budget</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <h3 className="mt-4">Monthly Budget Overview</h3>
      <Table bordered hover>
      <thead className="table-dark">
          <tr>
            <th>Category</th>
            <th>Budget Amount</th>
            <th>Current Balance</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((b) => (
            <tr key={b._id}>
              <td>{b.category}</td>
              <td>${b.amount}</td>
              <td>${calculateCurrentBalance(b.category, b.amount)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Budget;
