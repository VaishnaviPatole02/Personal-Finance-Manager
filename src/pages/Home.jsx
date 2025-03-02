import React from "react";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="mt-4 text-center">
      <h2 className="text-primary">Welcome to Personal Finance Manager</h2>
      <p className="text-muted">Login or Register to manage your expenses efficiently.</p>
    </Container>
  );
};

export default Home;
