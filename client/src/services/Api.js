// // import axios from "axios";

// // const API = axios.create({
// //     baseURL: "http://localhost:5000/api",
// //     headers: { "Content-Type": "application/json" },
// // });

// // // ✅ Register User
// // export const registerUser = async (userData) => {
// //     try {
// //         const response = await API.post("/users/register", userData);
// //         return response.data;
// //     } catch (error) {
// //         console.error("Registration Error:", error.response?.data || error.message);
// //         throw error.response?.data || error.message;
// //     }
// // };

// // // ✅ Login User
// // export const loginUser = async (userData) => {
// //     try {
// //         const response = await API.post("/users/login", userData);
// //         return response.data; // ✅ Make sure token is returned
// //     } catch (error) {
// //         console.error("Login Error:", error.response?.data || error.message);
// //         throw error.response?.data || error.message;
// //     }
// // };

// // // ✅ Get Current User (Protected Route)
// // export const getCurrentUser = async (token) => {
// //     try {
// //         const response = await API.get("/users/me", {
// //             headers: { Authorization: `Bearer ${token}` },
// //         });
// //         return response.data;
// //     } catch (error) {
// //         console.error("Fetch User Error:", error.response?.data || error.message);
// //         throw error.response?.data || error.message;
// //     }
// // };

// // // ✅ Add Expense API
// // export const addExpense = async (expenseData) => {
// //     try {
// //         const response = await API.post("/expenses/add", expenseData);
// //         return response.data;
// //     } catch (error) {
// //         console.error("Error adding expense:", error);
// //         return { error: error.response?.data?.error || "Failed to add expense" };
// //     }
// // };

// // // ✅ Get Expenses API
// // export const getExpenses = async () => {
// //     try {
// //         const response = await API.get("/expenses/");
// //         return response.data;
// //     } catch (error) {
// //         return { error: error.response?.data?.error || "Failed to fetch expenses" };
// //     }
// // };

// // // ✅ Delete Expense API
// // export const deleteExpense = async (id) => {
// //     try {
// //         const response = await API.delete(`/expenses/${id}`);
// //         return response.data;
// //     } catch (error) {
// //         console.error("Error deleting expense:", error);
// //         return { error: error.message };
// //     }
// // };

// // // ✅ Update Expense API
// // export const updateExpense = async (id, expenseData) => {
// //     try {
// //         const response = await API.put(`/expenses/${id}`, expenseData);
// //         return response.data;
// //     } catch (error) {
// //         return { error: error.response?.data?.error || "Failed to update expense" };
// //     }
// // };

// // // ✅ Fetch Transactions
// // export const getTransactions = async () => {
// //     try {
// //         const response = await API.get("/expenses/");
// //         return response.data;
// //     } catch (error) {
// //         console.error("Error fetching transactions:", error);
// //         return { error: error.response?.data || "Failed to fetch transactions" };
// //     }
// // };

// // // ✅ Save Budget Entry
// // export const saveBudget = async (budget) => {
// //     try {
// //         const response = await API.post("/budget/set", budget);
// //         return response.data;
// //     } catch (error) {
// //         return { error: error.response?.data || "Failed to save budget" };
// //     }
// // };

// // // ✅ Get All Budget Entries
// // export const getBudgets = async () => {
// //   try {
// //     const response = await API.get("/budget/get");
// //     return response.data;
// //   } catch (error) {
// //     return { error: error.response?.data || "Failed to fetch budgets" };
// //   }
// // };

// // export const fetchExpenses = async () => {
// //     try {
// //       const token = localStorage.getItem("token"); // ✅ Retrieve token
// //       const response = await axios.get(`${API_BASE_URL}/expenses/get`, {
// //         headers: { Authorization: `Bearer ${token}` }, // ✅ Attach token
// //       });
// //       return response.data;
// //     } catch (error) {
// //       console.error("Failed to fetch expenses:", error.message);
// //       return [];
// //     }
// //   };

// // export const fetchBudget = async () => {
// //   try {
// //     const response = await axios.get('/api/budget/get');
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error fetching budget:', error.message);
// //     return [];
// //   }
// // };
// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
//   headers: { "Content-Type": "application/json" },
// });

// // ✅ Attach token to every request
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
//       console.error("⚠️ No Token Found in LocalStorage!");
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ✅ API Calls

// export const registerUser = async (userData) => {
//   try {
//     const response = await API.post("/users/register", userData);
//     return response.data;
//   } catch (error) {
//     console.error("Registration Error:", error.response?.data || error.message);
//     throw error.response?.data || error.message;
//   }
// };

// export const loginUser = async (userData) => {
//   try {
//     const response = await API.post("/users/login", userData);
//     return response.data;
//   } catch (error) {
//     console.error("Login Error:", error.response?.data || error.message);
//     throw error.response?.data || error.message;
//   }
// };

// export const getCurrentUser = async () => {
//   try {
//     const response = await API.get("/users/me");
//     return response.data;
//   } catch (error) {
//     console.error("Fetch User Error:", error.response?.data || error.message);
//     throw error.response?.data || error.message;
//   }
// };

// export const getExpenses = async () => {
//   try {
//     const response = await API.get("/expenses");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching expenses:", error.response?.data || error.message);
//     return { error: error.response?.data?.error || "Failed to fetch expenses" };
//   }
// };
import axios from "axios";

// ✅ Configure Axios
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token"); // Retrieve token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("⚠️ No Token Found! Redirecting to Login...");
        window.location.href = "/login"; // Redirect to login page if no token
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  

// ✅ User Authentication APIs

export const registerUser = async (userData) => {
  try {
    const response = await API.post("/users/register", userData);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await API.post("/users/login", userData);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await API.get("/users/me");
    return response.data;
  } catch (error) {
    console.error("Fetch User Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// ✅ Expense APIs

export const addExpense = async (expenseData) => {
  try {
    const response = await API.post("/expenses/add", expenseData);
    return response.data;
  } catch (error) {
    console.error("Error adding expense:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Failed to add expense" };
  }
};

export const getExpenses = async () => {
    try {
      const response = await API.get("/expenses");
      return response.data;
    } catch (error) {
      console.error("Error fetching expenses:", error.response?.data || error.message);
      
      // ✅ Redirect to login if token is invalid
      if (error.response?.status === 401) {
        console.warn("⚠️ Unauthorized! Redirecting to login...");
        localStorage.removeItem("token"); // Clear invalid token
        window.location.href = "/login"; // Redirect user to login
      }
  
      return { error: "Failed to fetch expenses" };
    }
  };
  

export const updateExpense = async (id, expenseData) => {
  try {
    const response = await API.put(`/expenses/${id}`, expenseData);
    return response.data;
  } catch (error) {
    console.error("Error updating expense:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Failed to update expense" };
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await API.delete(`/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting expense:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Failed to delete expense" };
  }
};

// ✅ Budget APIs

export const saveBudget = async (budgetData) => {
  try {
    const response = await API.post("/budget/set", budgetData);
    return response.data;
  } catch (error) {
    console.error("Error saving budget:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Failed to save budget" };
  }
};

export const getBudgets = async () => {
  try {
    const response = await API.get("/budget/get");
    return response.data;
  } catch (error) {
    console.error("Error fetching budgets:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Failed to fetch budgets" };
  }
};

export const fetchBudget = async () => {
  try {
    const response = await API.get("/budget/get");
    return response.data;
  } catch (error) {
    console.error("Error fetching budget:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Failed to fetch budget" };
  }
};
