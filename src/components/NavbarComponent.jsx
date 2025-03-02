// import React from "react";
// import { Navbar, Nav, Container, Button } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";

// const NavbarComponent = () => {
//   const navigate = useNavigate();
//   const isLoggedIn = localStorage.getItem("token"); // ✅ Correct way to check login

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login"); // ✅ Redirect to login after logout
//   };

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg">
//       <Container>
//         <Navbar.Brand as={Link} to="/">Expense Tracker</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             {isLoggedIn ? (
//               <>
//                 <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
//                 <Nav.Link as={Link} to="/expenses">Track Expenses</Nav.Link>
//                 <Nav.Link as={Link} to="/budget">View Budget</Nav.Link>
//                 <Nav.Link as={Link} to="/reports">Reports</Nav.Link>
//                 <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
//                 <Button variant="danger" className="ms-3" onClick={handleLogout}>Logout</Button>
//               </>
//             ) : (
//               <>
//                 <Nav.Link as={Link} to="/login">Login</Nav.Link>
//                 <Nav.Link as={Link} to="/register">Register</Nav.Link>
//               </>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavbarComponent;
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Finance Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/track-expenses">Track Expenses</Nav.Link>
                <Nav.Link as={Link} to="/view-budget">Budget</Nav.Link>
                <Nav.Link as={Link} to="/reports">Reports</Nav.Link>
                <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
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
