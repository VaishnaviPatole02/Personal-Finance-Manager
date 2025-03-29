import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const Settings = () => {
  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary">Settings</h2>
      <Form className="p-4 shadow rounded bg-light">
        <Form.Group className="mb-3">
          <Form.Label>Change Email</Form.Label>
          <Form.Control type="email" placeholder="Enter new email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Change Password</Form.Label>
          <Form.Control type="password" placeholder="Enter new password" />
        </Form.Group>
        <Button variant="warning">Save Changes</Button>
      </Form>
    </Container>
  );
};

export default Settings;
