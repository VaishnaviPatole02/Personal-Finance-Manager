import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const AddExpenseForm = ({ addExpense, onClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    amount: "",
    type: "debit",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(formData);
    onClose();
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="date" onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" name="amount" onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Type</Form.Label>
            <Form.Select name="type" onChange={handleChange}>
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" name="category" onChange={handleChange} required />
          </Form.Group>

          <Button type="submit" variant="success" className="mt-2">Add Expense</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddExpenseForm;
