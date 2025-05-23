import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { saveBudget, getBudgets, getExpenses } from "../services/api";
import api from "../services/api"; 



const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#B3B3B3", "#F7464A"];

const Reports = () => {
  const [chartType, setChartType] = useState("bar");
  const [timeFilter, setTimeFilter] = useState("weekly");
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBudgets();
    fetchExpenses();
  }, []);

  
  const fetchBudgets = async () => {
    try {
      const response = await getBudgets();
      setBudgets(response);
    } catch (err) {
      console.error("Error fetching budgets:", err);
      setError("Failed to load budgets.");
    }
  };

  
  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found! User must log in.");
        return;
      }

      const response = await api.get("/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setError("Failed to load expenses.");
    }
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
      <Container className="mt-4">
        <h2 className="text-center">Financial Reports</h2>

        
        <div className="d-flex justify-content-center flex-wrap gap-3 mt-3">
          <div>
            <label className="fw-bold">Select Chart Type:</label>
            <select className="form-select" value={chartType} onChange={(e) => setChartType(e.target.value)}>
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="pie">Pie Chart</option>
            </select>
          </div>
          {/* <div>
            <label className="fw-bold">Filter By:</label>
            <select className="form-select" value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div> */}
        </div>

        
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
