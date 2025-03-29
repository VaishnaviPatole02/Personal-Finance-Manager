import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Form, Alert, Table, Modal } from "react-bootstrap";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import axios from "axios";
import moment from "moment";
import { saveBudget, getBudgets, getExpenses } from "../services/api";
import { useNavigate } from "react-router-dom";


// ✅ Pie Chart Colors
const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#B3B3B3", "#F7464A"];

const Reports = () => {
  const [chartType, setChartType] = useState("bar");
  const [timeFilter, setTimeFilter] = useState("weekly");
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [budget, setBudget] = useState({ category: "", amount: "" });
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
    fetchExpenses();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchBudgets = async () => {
    const data = await getBudgets();
    if (!data.error) {
      setBudgets(data);
    } else {
      console.error("Failed to fetch budgets:", data.error);
    }
  };

  const fetchExpenses = async () => {
    const data = await getExpenses();
    if (!data.error) {
      setExpenses(data);
    } else {
      console.error("Failed to fetch expenses:", data.error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!budget.category || !budget.amount) {
      setError("Both Category and Amount are required!");
      return;
    }

    const response = await saveBudget(budget);
    if (!response.error) {
      setSuccess("Budget saved successfully!");
      setError(null);
      fetchBudgets();
      setShowForm(false);
    } else {
      setError(response.error);
    }

    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 2000);
  };

  const calculateCurrentBalance = (category, budgetAmount) => {
    const totalExpenses = expenses
      .filter((expense) => expense.category === category && expense.type === "debit")
      .reduce((sum, expense) => sum + expense.amount, 0);
    return budgetAmount - totalExpenses;
  };

  const formatChartData = () => {
    return budgets.map((budget) => ({
      name: budget.category,
      budget: budget.amount,
      spent: expenses
        .filter((exp) => exp.category === budget.category && exp.type === "debit")
        .reduce((sum, exp) => sum + exp.amount, 0),
    }));
  };

  const formatPieData = () => {
    return budgets.map((budget, index) => ({
      name: budget.category,
      value: budget.amount,
      fill: COLORS[index % COLORS.length],
    }));
  };

  return (
  <>

      {/* Financial Reports Section */}
      <Container className="mt-4">
        <h2 className="text-center">Financial Reports</h2>

        {/* Chart Filters */}
        <div className="d-flex justify-content-center flex-wrap gap-3 mt-3">
          <div>
            <label className="fw-bold">Select Chart Type:</label>
            <select className="form-select" value={chartType} onChange={(e) => setChartType(e.target.value)}>
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="pie">Pie Chart</option>
            </select>
          </div>

          <div>
            <label className="fw-bold">Filter By:</label>
            <select className="form-select" value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        {/* Chart Display */}
        <div className="mt-4 d-flex justify-content-center">
          {chartType === "bar" && (
            <ResponsiveContainer width="80%" height={300}>
              <BarChart data={formatChartData()}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="budget" fill="#48A6A7" />
                <Bar dataKey="spent" fill="#E50046" />
              </BarChart>
            </ResponsiveContainer>
          )}

          {chartType === "line" && (
            <ResponsiveContainer width="80%" height={300}>
              <LineChart data={formatChartData()}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="budget" stroke="#48A6A7" />
                <Line type="monotone" dataKey="spent" stroke="#E50046" />
              </LineChart>
            </ResponsiveContainer>
          )}

          {chartType === "pie" && (
            <ResponsiveContainer width="50%" height={300}>
              <PieChart>
                <Pie data={formatPieData()} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </Container>
    </>
  );
};

export default Reports;
