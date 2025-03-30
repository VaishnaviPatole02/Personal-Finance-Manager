// import React, { useState, useEffect } from "react";
// import { Container, Card } from "react-bootstrap";
// import ExpensesTable from "../components/ExpensesTable";
// import EditFormModel from "../components/EditFormModel";
// import { getExpenses, deleteExpense, updateExpense } from "../services/api";

// const Expenses = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedTransaction, setSelectedTransaction] = useState(null);

//   //  Fetch expenses on component mount
//   useEffect(() => {
//     const loadExpenses = async () => {
//       try {
//         const response = await getExpenses();
//         setExpenses(response);
//       } catch (error) {
//         console.error("Error fetching expenses:", error);
//       }
//     };
//     loadExpenses();
//   }, []);

//   //  Function to delete an expense
//   const handleDelete = async (id) => {
//     try {
//       await deleteExpense(id);
//       setExpenses(expenses.filter((expense) => expense._id !== id));
//     } catch (error) {
//       console.error("Failed to delete expense:", error);
//     }
//   };

//   //  Function to open edit modal
//   const handleEdit = (expense) => {
//     setSelectedTransaction(expense);
//     setShowModal(true);
//   };

//   //  Function to update an expense
//   const handleUpdate = async (updatedExpenseData) => {
//     try {
//       const response = await updateExpense(selectedTransaction._id, updatedExpenseData);
//       if (!response.error) {
//         setExpenses(expenses.map((expense) => (expense._id === selectedTransaction._id ? response : expense)));
//         setShowModal(false);
//       } else {
//         console.error("Error updating expense:", response.error);
//       }
//     } catch (error) {
//       console.error("Error updating expense:", error);
//     }
//   };

//   return (
//     <Container className="mt-4">
//       <Card>
//         <Card.Body>
//           <h4>Track Your Expenses</h4>
//           <ExpensesTable transactions={expenses} onEdit={handleEdit} onDelete={handleDelete} />
//         </Card.Body>
//       </Card>

//       {/* Edit Expense Modal */}
//       <EditFormModel
//         showModal={showModal}
//         selectedTransaction={selectedTransaction}
//         setSelectedTransaction={setSelectedTransaction}
//         handleUpdate={handleUpdate}
//         setShowModal={setShowModal}
//       />
//     </Container>
//   );
// };

// export default Expenses;
import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import ExpensesTable from "../components/ExpensesTable";
import EditFormModel from "../components/EditFormModel";
import { getExpenses, deleteExpense, updateExpense } from "../services/api";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Fetch expenses on component mount
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const response = await getExpenses();
        if (response.error) {
          console.error("Error fetching expenses:", response.error);
          setExpenses([]); // Default to empty array on error
        } else if (Array.isArray(response)) {
          setExpenses(response);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    loadExpenses();
  }, []);

  // Function to delete an expense
  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  // Function to open edit modal
  const handleEdit = (expense) => {
    setSelectedTransaction(expense);
    setShowModal(true);
  };

  // Function to update an expense
  const handleUpdate = async (updatedExpenseData) => {
    if (!selectedTransaction) return;
    try {
      await updateExpense(selectedTransaction._id, updatedExpenseData);

      // Update UI manually to reflect changes
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense._id === selectedTransaction._id
            ? { ...expense, ...updatedExpenseData }
            : expense
        )
      );

      setShowModal(false);
      setSelectedTransaction(null);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <h4>Track Your Expenses</h4>
          <ExpensesTable transactions={expenses} onEdit={handleEdit} onDelete={handleDelete} />
        </Card.Body>
      </Card>

      {/* Edit Expense Modal */}
      <EditFormModel
        showModal={showModal}
        selectedTransaction={selectedTransaction}
        setSelectedTransaction={setSelectedTransaction}
        handleUpdate={handleUpdate}
        setShowModal={setShowModal}
      />
    </Container>
  );
};

export default Expenses;
