import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { addExpense } from "../services/api"; 

const AddExpenseForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    amount: "",
    type: "debit",
    category: "",
    description: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        amount: formData.amount ? parseFloat(formData.amount) : 0, // Ensure it's a number
        type: formData.type.toLowerCase(),
      };

      await addExpense(formattedData); 

      setSuccess("Expense added successfully!");
      setError(null);

      setTimeout(() => {
        setSuccess(null);
        onClose();
      }, 1000);
    } catch (err) {
      console.error(" API Error:", err.message);
      setError(err.message || "Failed to add expense. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" name="amount" value={formData.amount} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Type</Form.Label>
            <Form.Select name="type" value={formData.type} onChange={handleChange}>
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Category</Form.Label>
            <Form.Select name="category" value={formData.category} onChange={handleChange} required>
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
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button type="submit" variant="success" className="mt-2">Add Expense</Button>
            <Button variant="secondary" className="mt-2" onClick={onClose}>Close</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddExpenseForm;
