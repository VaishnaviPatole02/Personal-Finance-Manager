import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddExpenseForm from "../components/AddExpenseForm";
import "../styles.css";


import incomeImg from "../assets/income.png";
import expenseImg from "../assets/expense.png";
import balanceImg from "../assets/total.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login"); 
    } else {
      setUser(storedUser);
      fetchSummary(); 
    }
  }, [navigate]);

  const fetchSummary = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token"); 

    try {
      const response = await axios.get("http://localhost:5000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` }, 
      });

      if (response.data && response.data.length > 0) {
        let totalIncome = 0;
        let totalExpense = 0;

        response.data.forEach((transaction) => {
          if (transaction.type.toLowerCase() === "credit") {
            totalIncome += parseFloat(transaction.amount);
          } else if (transaction.type.toLowerCase() === "debit") {
            totalExpense += parseFloat(transaction.amount);
          }
        });

        setSummary({
          totalIncome,
          totalExpense,
          balance: totalIncome - totalExpense,
        });
      } else {
        setSummary({ totalIncome: 0, totalExpense: 0, balance: 0 });
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
      setError("Failed to fetch data. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <Container className="mt-4 text-center">
      {user && <h2 className="mb-3" style={{ color: "black" }}>Welcome {user.name}!</h2>}


      
      <div className="mb-4">
        <Button variant="dark" size="lg" onClick={() => setShowForm(true)}>
          + Add Expense
        </Button>
      </div>

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <p>Loading data...</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row className="justify-content-center">
          <Col md={4} sm={12}>
            <Card className="summary-card shadow-sm bg-success text-white">
              <Card.Img variant="top" src={incomeImg} alt="Total Income" />
              <Card.Body>
                <Card.Title>Total Income</Card.Title>
                <h3>Rs.{summary.totalIncome.toFixed(2)}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={12}>
            <Card className="summary-card shadow-sm bg-danger text-white">
              <Card.Img variant="top" src={expenseImg} alt="Expense" />
              <Card.Body>
                <Card.Title>Total Expense</Card.Title>
                <h3>Rs.{summary.totalExpense.toFixed(2)}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={12}>
            <Card className="summary-card shadow-sm bg-primary text-white">
              <Card.Img variant="top" src={balanceImg} alt="Balance" />
              <Card.Body>
                <Card.Title>Balance</Card.Title>
                <h3>Rs.{summary.balance.toFixed(2)}</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      
      {showForm && <AddExpenseForm onClose={() => setShowForm(false)} onExpenseAdded={fetchSummary} />}
    </Container>
  );
};

export default Dashboard;
