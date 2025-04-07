import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/"); 
  };

  return (
    <Navbar style={{ backgroundColor: "#6c757d" }} expand="lg" className="px-4 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-white">
          Personal Finance Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {user ? (
              <>
                <Nav.Item>
                  <Link to="/dashboard" className="nav-link text-white">🏠 Home</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/expenses" className="nav-link text-white">📄 Transactions</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/budget" className="nav-link text-white">💰 Budget</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/reports" className="nav-link text-white">📊 Reports</Link>
                </Nav.Item>
                <Button variant="light" onClick={handleLogout} className="text-dark ms-3">🚪 Logout</Button>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Link to="/login" className="nav-link text-white">Login</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/register" className="nav-link text-white">Register</Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
