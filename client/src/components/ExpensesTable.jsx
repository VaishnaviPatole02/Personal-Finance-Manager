import React from "react";

const ExpensesTable = ({ transactions = [], onEdit, onDelete }) => {
  if (!Array.isArray(transactions)) {
    console.error("Transactions is not an array:", transactions);
    return <p className="text-danger">Error loading transactions.</p>;
  }

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
