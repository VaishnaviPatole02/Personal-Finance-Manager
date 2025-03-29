import React, { useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EditFormModel = ({ showModal, selectedTransaction, setSelectedTransaction, handleUpdate, setShowModal }) => {
  
  useEffect(() => {
    if (selectedTransaction) {
      console.log("Editing Transaction:", selectedTransaction);
    }
  }, [selectedTransaction]);

  if (!selectedTransaction) return null;

  const handleChange = (e) => {
    setSelectedTransaction({ ...selectedTransaction, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => { e.preventDefault(); handleUpdate(selectedTransaction); }}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={selectedTransaction.title} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" name="amount" value={selectedTransaction.amount} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" name="category" value={selectedTransaction.category} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="date" value={selectedTransaction.date.split("T")[0]} onChange={handleChange} required />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button type="submit" variant="success">Update Expense</Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditFormModel;
