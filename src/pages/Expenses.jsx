// import React, { useState, useEffect } from "react";
// import { Container, Card } from "react-bootstrap";
// import ExpensesTable from "../components/ExpensesTable";

// const Expenses = () => {
//   const [expenses, setExpenses] = useState([]);

//   // ✅ Fetch expenses from backend
//   useEffect(() => {
//     const loadExpenses = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/expenses");
//         const data = await response.json();
//         setExpenses(data);
//       } catch (error) {
//         console.error("Error fetching expenses:", error);
//       }
//     };

//     loadExpenses();
//   }, []);

//   return (
//     <Container className="mt-4">
//       <Card>
//         <Card.Body>
//           <h4>Track Your Expenses</h4>
//           <ExpensesTable transactions={expenses} />
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default Expenses;
import React, { useState, useEffect } from "react";
import { Container, Card, Dropdown } from "react-bootstrap";
import ExpensesTable from "../components/ExpensesTable";
import { getExpenses } from "../services/api";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
        setFilteredExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    loadExpenses();
  }, []);

  const updateFilter = (period) => {
    setFilter(period);
    setFilteredExpenses(groupByPeriod(expenses, period));
  };

  const groupByPeriod = (transactions, period) => {
    if (period === "All") return transactions;

    const grouped = {};
    transactions.forEach((expense) => {
      const date = new Date(expense.date);
      let key = period === "Weekly" ? `Week ${Math.ceil(date.getDate() / 7)}` :
                period === "Monthly" ? date.toLocaleString("default", { month: "short" }) :
                date.getFullYear().toString();

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(expense);
    });

    return Object.values(grouped).flat();
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary">Track Expenses</h2>
      <Dropdown>
        <Dropdown.Toggle variant="dark">Filter: {filter}</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => updateFilter("All")}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => updateFilter("Weekly")}>Weekly</Dropdown.Item>
          <Dropdown.Item onClick={() => updateFilter("Monthly")}>Monthly</Dropdown.Item>
          <Dropdown.Item onClick={() => updateFilter("Yearly")}>Yearly</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Card className="mt-3">
        <Card.Body>
          {filteredExpenses.length > 0 ? (
            <ExpensesTable transactions={filteredExpenses} />
          ) : (
            <p className="text-center text-muted">No transactions available.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Expenses;
