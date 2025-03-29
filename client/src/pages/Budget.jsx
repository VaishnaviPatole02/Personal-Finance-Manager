// import React, { useState, useEffect } from "react";
// import { Form, Button, Alert, Container, Table, Modal } from "react-bootstrap";
// import { saveBudget, getBudgets, getExpenses } from "../services/api";


// const Budget = () => {
//   const [showForm, setShowForm] = useState(false); // Toggle for Budget Form
//   const [budget, setBudget] = useState({
//     category: "",
//     amount: "",
//   });

//   const [success, setSuccess] = useState(null);
//   const [error, setError] = useState(null);
//   const [budgets, setBudgets] = useState([]); // Stores all budget entries
//   const [expenses, setExpenses] = useState([]); // Stores all expenses

//   useEffect(() => {
//     fetchBudgets();
//     fetchExpenses(); // Load expenses to calculate category-wise balance
//   }, []);

//   // Fetch all budgets
//   const fetchBudgets = async () => {
//     const data = await getBudgets();
//     if (!data.error) {
//       setBudgets(data);
//     } else {
//       console.error("Failed to fetch budgets:", data.error);
//     }
//   };

//   // Fetch all expenses
//   const fetchExpenses = async () => {
//     const data = await getExpenses();
//     if (!data.error) {
//       setExpenses(data);
//     } else {
//       console.error("Failed to fetch expenses:", data.error);
//     }
//   };

//   const handleChange = (e) => {
//     setBudget({ ...budget, [e.target.name]: e.target.value });
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     if (!budget.category || !budget.amount) {
//       setError("Both Category and Amount are required!");
//       return;
//     }

//     const response = await saveBudget(budget);
//     if (!response.error) {
//       setSuccess("Budget saved successfully!");
//       setError(null);
//       fetchBudgets(); // Refresh budget table
//       setShowForm(false); // Close form after save
//     } else {
//       setError(response.error);
//     }

//     setTimeout(() => {
//       setSuccess(null);
//       setError(null);
//     }, 2000);
//   };

//   // Calculate current balance for each category
//   const calculateCurrentBalance = (category, budgetAmount) => {
//     const totalExpenses = expenses
//       .filter((expense) => expense.category === category && expense.type === "debit") // Only subtract debits
//       .reduce((sum, expense) => sum + expense.amount, 0);
//     return budgetAmount - totalExpenses;
//   };

//   return (
//     <Container className="mt-4">
//       <h2 className="text-center text-primary">Manage Your Budget</h2>

//       {error && <Alert variant="danger">{error}</Alert>}
//       {success && <Alert variant="success">{success}</Alert>}

//       {/* Set Budget Button */}
//       <Button variant="primary" onClick={() => setShowForm(true)}>
//         Set Budget
//       </Button>

//       {/* Budget Form Modal */}
//       <Modal show={showForm} onHide={() => setShowForm(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Set Monthly Budget</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSave}>
//             <Form.Group className="mb-2">
//               <Form.Label>Category</Form.Label>
//               <Form.Select name="category" value={budget.category} onChange={handleChange} required>
//                 <option value="">Select Category</option>
//                 <option value="Salary">Salary</option>
//                 <option value="Freelancing">Freelancing</option>
//                 <option value="Food">Food</option>
//                 <option value="Shopping">Shopping</option>
//                 <option value="Transport">Transport</option>
//                 <option value="Entertainment">Entertainment</option>
//                 <option value="Others">Others</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mb-2">
//               <Form.Label>Amount</Form.Label>
//               <Form.Control type="number" name="amount" value={budget.amount} onChange={handleChange} required />
//             </Form.Group>

//             <Button type="submit" variant="success" className="mt-2">
//               Save Budget
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Budget Table */}
//       <h3 className="mt-4">Monthly Budget Overview</h3>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Category</th>
//             <th>Budget Amount</th>
//             <th>Current Balance</th>
//           </tr>
//         </thead>
//         <tbody>
//           {budgets.map((b) => (
//             <tr key={b._id}>
//               <td>{b.category}</td>
//               <td>${b.amount}</td>
//               <td>${calculateCurrentBalance(b.category, b.amount)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default Budget;
import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container, Table, Modal } from "react-bootstrap";
import axios from "axios";  // Import axios for API requests

const Budget = () => {
  const [showForm, setShowForm] = useState(false);
  const [budget, setBudget] = useState({ category: "", amount: "" });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchBudgets();
    fetchExpenses();
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/budget/get", getAuthHeader());
      setBudgets(response.data);
    } catch (err) {
      console.error("Failed to fetch budgets:", err);
      setError("Failed to fetch budgets.");
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses", getAuthHeader());
      setExpenses(response.data);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
      setError("Failed to fetch expenses.");
    }
  };

  const handleChange = (e) => {
    setBudget({ ...budget, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!budget.category || !budget.amount) {
      setError("Both Category and Amount are required!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/budget/add", budget, getAuthHeader());
      setSuccess("Budget saved successfully!");
      fetchBudgets();
      setShowForm(false);
    } catch (err) {
      console.error("Error saving budget:", err);
      setError("Error saving budget.");
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

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary">Manage Your Budget</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Button variant="primary" onClick={() => setShowForm(true)}>Set Budget</Button>

      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton><Modal.Title>Set Monthly Budget</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" value={budget.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="Salary">Salary</option>
                <option value="Freelancing">Freelancing</option>
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Others">Others</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" name="amount" value={budget.amount} onChange={handleChange} required />
            </Form.Group>

            <Button type="submit" variant="success" className="mt-2">Save Budget</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <h3 className="mt-4">Monthly Budget Overview</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Category</th>
            <th>Budget Amount</th>
            <th>Current Balance</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((b) => (
            <tr key={b._id}>
              <td>{b.category}</td>
              <td>${b.amount}</td>
              <td>${calculateCurrentBalance(b.category, b.amount)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Budget;
