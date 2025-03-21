// import axios from "axios";

// // ✅ Set Base URL for Backend
// const API = axios.create({
//   baseURL: "http://localhost:5000/api",  // Change if backend runs on a different port
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ Register User
// export const registerUser = async (userData) => {
//   try {
//     const response = await API.post("/users/register", userData);
//     return response.data;
//   } catch (error) {
//     console.error("Registration Error:", error.response?.data || error.message);
//     throw error.response?.data || error.message;
//   }
// };

// // ✅ Login User
// export const loginUser = async (userData) => {
//     try {
//       const response = await API.post("/users/login", userData);
//       return response.data; // ✅ Make sure token is returned
//     } catch (error) {
//       console.error("Login Error:", error.response?.data || error.message);
//       throw error.response?.data || error.message;
//     }
//   };

// // ✅ Get Current User (Protected Route)
// export const getCurrentUser = async (token) => {
//   try {
//     const response = await API.get("/users/me", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Fetch User Error:", error.response?.data || error.message);
//     throw error.response?.data || error.message;
//   }
// };

// // ✅ Add Expense
// export const addExpense = async (expenseData) => {
//     try {
//       const response = await API.post("/expenses/add", expenseData);
//       return response.data;
//     } catch (error) {
//       return { error: error.response?.data?.error || "Failed to add expense" };
//     }
//   };
  
//   // ✅ Get Expenses
//   export const getExpenses = async () => {
//     try {
//       const response = await API.get("/expenses/");
//       return response.data;
//     } catch (error) {
//       return { error: error.response?.data?.error || "Failed to fetch expenses" };
//     }
//   };

// export default API;
import axios from "axios";

// ✅ Set Base URL for Backend
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Change if backend runs on a different port
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Register User
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/users/register", userData);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Registration failed");
  }
};

// ✅ Login User
export const loginUser = async (userData) => {
  try {
    const response = await API.post("/users/login", userData);
    return response.data; // ✅ Ensure token is returned
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Login failed");
  }
};

// ✅ Get Current User (Protected Route)
export const getCurrentUser = async (token) => {
  try {
    const response = await API.get("/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Fetch User Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Failed to fetch user");
  }
};

// ✅ Add Expense (Now properly throws errors)
export const addExpense = async (expenseData) => {
  try {
    const response = await API.post("/expenses/add", expenseData);
    console.log("✅ Expense added:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Add Expense Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Failed to add expense");
  }
};

// ✅ Get Expenses
export const getExpenses = async () => {
  try {
    const response = await API.get("/expenses/");
    return response.data;
  } catch (error) {
    console.error("❌ Fetch Expenses Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Failed to fetch expenses");
  }
};

export default API;
