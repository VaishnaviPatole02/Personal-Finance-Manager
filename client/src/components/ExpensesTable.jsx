// import React, { useState, useEffect } from "react";
// import { getExpenses } from "../services/api";

// const ExpensesTable = ({ getExpenses, onEdit, onDelete }) => {
//   const [transactions, setTransactions] = useState([]); // ✅ Use inside function

//   useEffect(() => {
//     getExpenses().then((data) => {
//       if (Array.isArray(data)) {
//         setTransactions(data); // ✅ Ensure it's an array
//       } else {
//         console.error("Transactions is not an array:", data);
//         setTransactions([]); // Fallback to empty array
//       }
//     });
//   }, [getExpenses]); // ✅ Add fetchExpenses to dependencies

//   return (
//     <div className="table-responsive mt-3">
//       <table className="table table-hover table-striped table-bordered rounded shadow-sm">
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
//               <tr key={index}>
//                 <td>{transaction.date.split("T")[0]}</td>
//                 <td>{transaction.title}</td>
//                 <td>₹{transaction.amount}</td>
//                 <td>{transaction.type === "credit" ? "Credit" : "Debit"}</td>
//                 <td>{transaction.category}</td>
//                 <td>
//                   <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(transaction)}>✏️</button>
//                   <button className="btn btn-danger btn-sm" onClick={() => onDelete(transaction._id)}>🗑️</button>
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
import { getExpenses } from "../services/api"; // ✅ Correct import

const ExpensesTable = ({ onEdit, onDelete }) => { // ✅ Removed getExpenses from props
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getExpenses().then((data) => {
      if (Array.isArray(data)) {
        setTransactions(data);
      } else {
        console.error("Transactions is not an array:", data);
        setTransactions([]);
      }
    });
  }, []); // ✅ Removed getExpenses from dependencies

  return (
    <div className="table-responsive mt-3">
      <table className="table table-hover table-striped table-bordered rounded shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date.split("T")[0]}</td>
                <td>{transaction.title}</td>
                <td>₹{transaction.amount}</td>
                <td>{transaction.type === "credit" ? "Credit" : "Debit"}</td>
                <td>{transaction.category}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(transaction)}>✏️</button>
                  <button className="btn btn-danger btn-sm" onClick={() => onDelete(transaction._id)}>🗑️</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTable;
