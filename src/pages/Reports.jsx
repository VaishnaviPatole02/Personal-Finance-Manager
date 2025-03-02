import React, { useState, useEffect } from "react";
import { Container, Card, Button, Dropdown } from "react-bootstrap";
import BarChartComponent from "../components/BarChartComponent";
import PieChartComponent from "../components/PieChartComponent";

const Reports = () => {
  const [expenses, setExpenses] = useState([]);
  const [groupedExpenses, setGroupedExpenses] = useState([]);
  const [showChart, setShowChart] = useState("");
  const [filter, setFilter] = useState("All");

  // ✅ Fetch expenses from backend
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/expenses");
        const data = await response.json();
        setExpenses(data);
        setGroupedExpenses(groupByPeriod(data, "All"));
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    loadExpenses();
  }, []);

  // ✅ Function to group transactions correctly
  const groupByPeriod = (transactions, period) => {
    const grouped = {};

    transactions.forEach((expense) => {
      const date = new Date(expense.date);
      let key;

      if (period === "Weekly") {
        const week = Math.ceil(date.getDate() / 7);
        key = `Week ${week}`;
      } else if (period === "Monthly") {
        key = date.toLocaleString("default", { month: "short" }); // Jan, Feb, etc.
      } else if (period === "Yearly") {
        key = date.getFullYear().toString(); // 2021, 2022, etc.
      } else {
        key = "All";
      }

      if (!grouped[key]) {
        grouped[key] = 0; // ✅ Store total amount, not an array
      }
      grouped[key] += expense.amount; // ✅ Sum up expenses
    });

    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
    }));
  };

  // ✅ Function to update filter & update charts
  const updateFilter = (period) => {
    setFilter(period);
    setGroupedExpenses(groupByPeriod(expenses, period));
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary">Reports</h2>

      {/* ✅ Sorting Dropdown */}
      <div className="text-center mb-3">
        <Dropdown>
          <Dropdown.Toggle variant="dark">Filter: {filter}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => updateFilter("All")}>All Transactions</Dropdown.Item>
            <Dropdown.Item onClick={() => updateFilter("Weekly")}>Weekly</Dropdown.Item>
            <Dropdown.Item onClick={() => updateFilter("Monthly")}>Monthly</Dropdown.Item>
            <Dropdown.Item onClick={() => updateFilter("Yearly")}>Yearly</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* ✅ Buttons to toggle charts */}
      <div className="text-center mb-3">
        <Button variant="info" className="me-2" onClick={() => setShowChart("pie")}>
          Show Pie Chart
        </Button>
        <Button variant="primary" onClick={() => setShowChart("bar")}>
          Show Bar Chart
        </Button>
      </div>

      {/* ✅ Show Pie Chart */}
      {showChart === "pie" && (
        <Card className="mb-4">
          <Card.Body>
            <h4>Expense Distribution ({filter})</h4>
            <PieChartComponent expenses={groupedExpenses} />
          </Card.Body>
        </Card>
      )}

      {/* ✅ Show Bar Chart */}
      {showChart === "bar" && (
        <Card>
          <Card.Body>
            <h4>Expense Analysis ({filter})</h4>
            <BarChartComponent expenses={groupedExpenses} />
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Reports;
