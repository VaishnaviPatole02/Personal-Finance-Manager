// import React, { useState } from "react";
// import { Container, Form, Button, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
    
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     // Simulating registration (you should use a backend API)
//     localStorage.setItem("registeredUser", JSON.stringify({ email: formData.email, password: formData.password }));
//     localStorage.setItem("isLoggedIn", "true");
    
//     navigate("/dashboard");
//   };

//   return (
//     <Container className="mt-4">
//       <h2 className="text-center text-primary">Register</h2>
//       {error && <Alert variant="danger">{error}</Alert>}
//       <Form onSubmit={handleRegister} className="p-4 shadow rounded bg-light">
//         <Form.Group className="mb-3">
//           <Form.Label>Email</Form.Label>
//           <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Password</Form.Label>
//           <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
//         </Form.Group>
//         <Button variant="primary" type="submit">Register</Button>
//       </Form>
//     </Container>
//   );
// };

// export default Register;
import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary">Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleRegister} className="p-4 shadow rounded bg-light">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">Register</Button>
      </Form>
    </Container>
  );
};

export default Register;
