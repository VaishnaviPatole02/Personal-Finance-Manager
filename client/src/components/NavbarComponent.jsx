import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/home");
  };

  return (
    <Navbar bg="light" expand="lg" className="px-4 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Personal Finance Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {user ? (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  🏠 Home
                </Nav.Link>
                <Nav.Link as={Link} to="/expenses">
                  📄 Transactions
                </Nav.Link>
                <Nav.Link as={Link} to="/budget">
                  💰 Budget
                </Nav.Link>
                <Nav.Link as={Link} to="/reports">
                  📊 Reports
                </Nav.Link>
                <Button variant="danger" onClick={handleLogout}>
                  🚪 Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
