import React from "react";
import { Container } from "react-bootstrap";
import Expenses from "./Expenses";

const Home = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Container className="mt-4">
      {isLoggedIn ? <Expenses /> : <h2 className="text-center">Welcome! Please login to view your expenses.</h2>}
    </Container>
  );
};

export default Home;
