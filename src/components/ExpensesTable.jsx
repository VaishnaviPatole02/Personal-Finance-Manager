// import React from "react";

// const ExpensesTable = ({ transactions = [], onDelete }) => {
//   if (!Array.isArray(transactions)) {
//     console.error("Transactions is not an array:", transactions);
//     return <p className="text-danger">Error loading transactions.</p>;
//   }

//   return (
//     <div className="table-responsive mt-3">
//       <table className="table table-hover table-bordered rounded shadow-sm">
//         <thead className="table-dark">
//           <tr>
//             <th>Date</th>
//             <th>Title</th>
//             <th>Amount</th>
//             <th>Type</th>
//             <th>Category</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.length > 0 ? (
//             transactions.map((transaction, index) => (
//               <tr key={index} className={transaction.type === "credit" ? "table-success" : "table-danger"}>
//                 <td>{transaction.date}</td>
//                 <td>{transaction.title}</td>
//                 <td>₹{transaction.amount}</td>
//                 <td>{transaction.type === "credit" ? "Credit" : "Debit"}</td>
//                 <td>{transaction.category}</td>
//                 <td>
//                   <button 
//                     className="btn btn-danger btn-sm"
//                     onClick={() => onDelete(index)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center text-muted">No transactions found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ExpensesTable;
import React, { useState, useEffect } from "react";
import { Container, Card, Dropdown } from "react-bootstrap";
import ExpensesTable from "../components/ExpensesTable";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filter, setFilter] = useState("All");

  // ✅ Fetch expenses from backend
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/expenses");
        const data = await response.json();
        setExpenses(data);
        setFilteredExpenses(groupByPeriod(data, "All")); 
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    loadExpenses();
  }, []);

  // ✅ Function to update filter & refresh table
  const updateFilter = (period) => {
    setFilter(period);
    setFilteredExpenses(groupByPeriod(expenses, period));
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary">Track Expenses</h2>

      {/* ✅ Sorting Dropdown */}
      <div className="text-center mb-3">
        <Dropdown>
          <Dropdown.Toggle variant="dark">Filter: {filter}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => updateFilter("All")}>All Transactions</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Card>
        <Card.Body>
          <ExpensesTable transactions={filteredExpenses} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Expenses;
