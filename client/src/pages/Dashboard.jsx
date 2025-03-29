// import React, { useState, useEffect } from "react";
// import { Container, Card, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AddExpenseForm from "../components/AddExpenseForm";
// import "../styles.css";

// // Import images
// import incomeImg from "../assets/income.png";
// import expenseImg from "../assets/expense.png";
// import balanceImg from "../assets/total.png";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [summary, setSummary] = useState({
//     totalIncome: 0,
//     totalExpense: 0,
//     balance: 0,
//   });

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (!storedUser) {
//       navigate("/login"); // Redirect if not logged in
//     } else {
//       setUser(storedUser);
//       fetchSummary(); // Fetch summary on load
//     }
//   }, [navigate]);

//   const fetchSummary = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get("http://localhost:5000/api/expenses");

//       if (response.data && response.data.length > 0) {
//         let totalIncome = 0;
//         let totalExpense = 0;

//         response.data.forEach((transaction) => {
//           if (transaction.type.toLowerCase() === "credit") {
//             totalIncome += parseFloat(transaction.amount);
//           } else if (transaction.type.toLowerCase() === "debit") {
//             totalExpense += parseFloat(transaction.amount);
//           }
//         });

//         setSummary({
//           totalIncome,
//           totalExpense,
//           balance: totalIncome - totalExpense,
//         });
//       } else {
//         setSummary({ totalIncome: 0, totalExpense: 0, balance: 0 });
//       }
//     } catch (error) {
//       console.error("Error fetching summary:", error);
//       setError("Failed to fetch data. Please try again later.");
//     }

//     setLoading(false);
//   };

//   return (
//     <Container className="mt-4 text-center">
//       {user && <h2 className="text-primary mb-3">Welcome, {user.email}!</h2>}

//       {/* Add Expense Button (Above Cards) */}
//       <div className="mb-4">
//         <Button variant="dark" size="lg" onClick={() => setShowForm(true)}>
//           + Add Expense
//         </Button>
//       </div>

//       {loading ? (
//         <div className="text-center my-4">
//           <Spinner animation="border" variant="primary" />
//           <p>Loading data...</p>
//         </div>
//       ) : error ? (
//         <Alert variant="danger">{error}</Alert>
//       ) : (
//         <Row className="justify-content-center">
//           <Col md={4} sm={12}>
//             <Card className="summary-card shadow-sm bg-success text-white">
//               <Card.Img variant="top" src={incomeImg} alt="Total Income" />
//               <Card.Body>
//                 <Card.Title>Total Income</Card.Title>
//                 <h3>Rs.{summary.totalIncome.toFixed(2)}</h3>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md={4} sm={12}>
//             <Card className="summary-card shadow-sm bg-danger text-white">
//               <Card.Img variant="top" src={expenseImg} alt="Expense" />
//               <Card.Body>
//                 <Card.Title>Total Expense</Card.Title>
//                 <h3>Rs.{summary.totalExpense.toFixed(2)}</h3>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md={4} sm={12}>
//             <Card className="summary-card shadow-sm bg-primary text-white">
//               <Card.Img variant="top" src={balanceImg} alt="Balance" />
//               <Card.Body>
//                 <Card.Title>Balance</Card.Title>
//                 <h3>Rs.{summary.balance.toFixed(2)}</h3>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       )}

//       {/* Expense Form Modal */}
//       {showForm && <AddExpenseForm onClose={() => setShowForm(false)} onExpenseAdded={fetchSummary} />}
//     </Container>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddExpenseForm from "../components/AddExpenseForm";
import "../styles.css";  // Ensure this file exists in the correct directory

import incomeImg from "../assets/income.png";
import expenseImg from "../assets/expense.png";
import balanceImg from "../assets/total.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
      fetchSummary();
    }
  }, [navigate]);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchSummary = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:5000/api/expenses", getAuthHeader());
      let totalIncome = 0, totalExpense = 0;

      response.data.forEach((transaction) => {
        if (transaction.type.toLowerCase() === "credit") totalIncome += parseFloat(transaction.amount);
        else if (transaction.type.toLowerCase() === "debit") totalExpense += parseFloat(transaction.amount);
      });

      setSummary({ totalIncome, totalExpense, balance: totalIncome - totalExpense });
    } catch (err) {
      console.error("Error fetching summary:", err);
      setError("Failed to fetch data. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <Container className="mt-4 text-center">
      {user && <h2 className="text-primary mb-3">Welcome, {user.email}!</h2>}

      <Button variant="dark" size="lg" onClick={() => setShowForm(true)}>+ Add Expense</Button>

      {loading ? <Spinner animation="border" variant="primary" /> : error ? <Alert variant="danger">{error}</Alert> : <div> {/* UI Display */} </div>}

      {showForm && <AddExpenseForm onClose={() => setShowForm(false)} onExpenseAdded={fetchSummary} />}
    </Container>
  );
};

export default Dashboard;
