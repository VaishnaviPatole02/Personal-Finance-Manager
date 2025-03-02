import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

const Budget = () => {
  const [budget, setBudget] = useState("");
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("budget", budget); // ✅ Save budget to local storage
    setSuccess("Monthly budget updated successfully!");
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary">Set Monthly Budget</h2>

      <Card className="p-4 shadow mt-3">
        <Card.Body>
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Enter Monthly Budget (₹)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="mt-3">
              Save Budget
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Budget;
