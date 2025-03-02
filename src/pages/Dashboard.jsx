// import React, { useState } from "react";
// import { Container, Card, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import AddExpenseForm from "../components/AddExpenseForm";

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const [showModal,setShowModal] = useState(false);

//   // ✅ Get User Data from Local Storage
//   const user = JSON.parse(localStorage.getItem("user"));
  
//   if (!user) {
//     navigate("/login"); // Redirect if no user data
//     return null;
//   }

//   return (
//     <>
//     <Container className="mt-4">
//       <h2 className="text-center text-primary">Welcome, {user.email}!</h2>
      
//       {/* <Card className="shadow p-4 mt-3">
//         <Card.Body>
//           <h4>Dashboard Overview</h4>
//           <p>You can track expenses, set budgets, and view reports here.</p>
          
//           <Button variant="primary" className="m-2" onClick={() => navigate("/expenses")}>
//             Track Expenses
//           </Button>
//           <Button variant="success" className="m-2" onClick={() => navigate("/budget")}>
//             Set Monthly Budget
//           </Button>
//           <Button variant="info" className="m-2" onClick={() => navigate("/reports")}>
//             View Reports
//           </Button>
//           <Button variant="warning" className="m-2" onClick={() => navigate("/settings")}>
//             Settings
//           </Button>
//         </Card.Body>
//       </Card> */
//       <div>
//       <button onClick={()=>setShowModal(true)}>AddNew</button>
//       <AddExpenseForm show={showModal} handleClose{()=>setShowModal(false)}></AddExpenseForm>
//       </div>
//     </Container>
//     </>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AddExpenseForm from "../components/AddExpenseForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]); // ✅ Store expenses

  // ✅ Get User Data from Local Storage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login");
    } else {
      setUser(userData);
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary">Welcome, {user.email}!</h2>

      <Card className="shadow p-4 mt-3 text-center">
        <Card.Body>
          <h4>Add Your Expenses</h4>
          <p>Click below to add a new expense.</p>

          <Button variant="dark" size="lg" onClick={() => setShowForm(true)}>
            + Add Expense
          </Button>
        </Card.Body>
      </Card>

      {showForm && (
        <AddExpenseForm onClose={() => setShowForm(false)} setExpenses={setExpenses} />
      )}
    </Container>
  );
};

export default Dashboard;
