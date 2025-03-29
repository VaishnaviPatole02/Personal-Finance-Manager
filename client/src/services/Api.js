import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: { "Content-Type": "application/json" },
});

// ✅ Register User
export const registerUser = async (userData) => {
    try {
        const response = await API.post("/users/register", userData);
        return response.data;
    } catch (error) {
        console.error("Registration Error:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

// ✅ Login User
export const loginUser = async (userData) => {
    try {
        const response = await API.post("/users/login", userData);
        return response.data; // ✅ Make sure token is returned
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        throw error.response?.data || error.message;
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
        throw error.response?.data || error.message;
    }
};

// ✅ Add Expense API
export const addExpense = async (expenseData) => {
    try {
        const response = await API.post("/expenses/add", expenseData);
        return response.data;
    } catch (error) {
        console.error("Error adding expense:", error);
        return { error: error.response?.data?.error || "Failed to add expense" };
    }
};

// ✅ Get Expenses API
export const getExpenses = async () => {
    try {
        const response = await API.get("/expenses/");
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.error || "Failed to fetch expenses" };
    }
};

// ✅ Delete Expense API
export const deleteExpense = async (id) => {
    try {
        const response = await API.delete(`/expenses/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting expense:", error);
        return { error: error.message };
    }
};

// ✅ Update Expense API
export const updateExpense = async (id, expenseData) => {
    try {
        const response = await API.put(`/expenses/${id}`, expenseData);
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.error || "Failed to update expense" };
    }
};

// ✅ Fetch Transactions
export const getTransactions = async () => {
    try {
        const response = await API.get("/expenses/");
        return response.data;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return { error: error.response?.data || "Failed to fetch transactions" };
    }
};

// ✅ Save Budget Entry
export const saveBudget = async (budget) => {
    try {
        const response = await API.post("/budget/set", budget);
        return response.data;
    } catch (error) {
        return { error: error.response?.data || "Failed to save budget" };
    }
};

// ✅ Get All Budget Entries
export const getBudgets = async () => {
  try {
    const response = await API.get("/budget/get");
    return response.data;
  } catch (error) {
    return { error: error.response?.data || "Failed to fetch budgets" };
  }
};

