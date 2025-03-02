// // import React from "react";
// // import { Container, Form, Button } from "react-bootstrap";
// // import { useNavigate } from "react-router-dom";

// // const Login = () => {
// //   const navigate = useNavigate();

// //   const handleLogin = (e) => {
// //     e.preventDefault();
// //     localStorage.setItem("isLoggedIn", "true");
// //     navigate("/dashboard");
// //   };

// //   return (
// //     <Container className="mt-4">
// //       <h2 className="text-center text-primary">Login</h2>
// //       <Form onSubmit={handleLogin} className="p-4 shadow rounded bg-light">
// //         <Form.Group className="mb-3">
// //           <Form.Label>Email</Form.Label>
// //           <Form.Control type="email" required />
// //         </Form.Group>
// //         <Form.Group className="mb-3">
// //           <Form.Label>Password</Form.Label>
// //           <Form.Control type="password" required />
// //         </Form.Group>
// //         <Button variant="primary" type="submit">Login</Button>
// //       </Form>
// //     </Container>
// //   );
// // };

// // export default Login;
// import React, { useState } from "react";
// import { Container, Form, Button, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../services/api";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await loginUser(formData);
//       localStorage.setItem("token", data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <Container className="mt-4">
//       <h2 className="text-center text-primary">Login</h2>
//       {error && <Alert variant="danger">{error}</Alert>}
//       <Form onSubmit={handleLogin} className="p-4 shadow rounded bg-light">
//         <Form.Group className="mb-3">
//           <Form.Label>Email</Form.Label>
//           <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Password</Form.Label>
//           <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
//         </Form.Group>
//         <Button variant="primary" type="submit">Login</Button>
//       </Form>
//     </Container>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      
      // ✅ Store Token in Local Storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      // ✅ Navigate to Dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin} className="p-4 shadow rounded bg-light">
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;
