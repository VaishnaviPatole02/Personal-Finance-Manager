import React, { useState, useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import { getExpenses, deleteExpense, updateExpense } from "../services/api";
import EditFormModel from "../components/EditFormModel"; 

const Transactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [transactions, filter]);

  const fetchTransactions = async () => {
    const data = await getExpenses();
    if (!data.error) {
      setTransactions(data);
    } else {
      console.error("Error fetching transactions:", data.error);
    }
  };

  const applyFilters = () => {
    let filteredData = [...transactions];
    const now = new Date();

    filteredData = filteredData.filter((t) => {
      const transactionDate = new Date(t.date);
      if (isNaN(transactionDate)) return false;

      if (filter === "lastWeek") {
        const lastWeek = new Date();
        lastWeek.setDate(now.getDate() - 7);
        return transactionDate >= lastWeek;
      } else if (filter === "lastMonth") {
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);
        return transactionDate >= lastMonth;
      }
      return true;
    });

    filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
    setFilteredTransactions(filteredData);
  };

  const handleDelete = async (id) => {
    const response = await deleteExpense(id);
    if (!response.error) {
      setTransactions(transactions.filter((t) => t._id !== id));
    } else {
      console.error("Failed to delete transaction:", response.error);
    }
  };

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!selectedTransaction || !selectedTransaction._id) return;
    try {
      const response = await updateExpense(selectedTransaction._id, selectedTransaction);
      if (!response.error) {
        setTransactions((prev) => prev.map((t) => (t._id === selectedTransaction._id ? response : t)));
        setShowModal(false);
      } else {
        console.error("Error updating transaction:", response.error);
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  return (
    <>
      <NavbarComponent />
      <Container>
        <h3 className="text-center my-4 fw-bold">Track Your Expenses</h3>

        <div className="d-flex justify-content-center mb-4">
          <select className="form-select w-auto me-2 fw-bold" onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Transactions</option>
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
          </select>
        </div>

        <Table>
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              <th>Date</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t) => (
              <tr key={t._id}>
                <td>{t.title}</td>
                <td>₹{t.amount}</td>
                <td>{t.category}</td>
                <td>{t.type}</td>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td>{t.description}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(t)}>✏️</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(t._id)}>🗑️</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <EditFormModel
          showModal={showModal}
          selectedTransaction={selectedTransaction}
          setSelectedTransaction={setSelectedTransaction}
          handleUpdate={handleUpdate}
          setShowModal={setShowModal}
        />
      </Container>
    </>
  );
};

export default Transactions;
