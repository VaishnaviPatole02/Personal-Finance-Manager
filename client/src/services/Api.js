import axios from "axios";

const getToken = () => localStorage.getItem("token");


const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
export const registerUser = async (userData) => (await api.post("/users/register", userData)).data;
export const loginUser = async (userData) => (await api.post("/users/login", userData)).data;
export const getExpenses = async () => (await api.get("/expenses")).data;
export const addExpense = async (expense) => (await api.post("/expenses/add", expense)).data;
export const deleteExpense = async (id) => (await api.delete(`/expenses/${id}`)).data;
export const updateExpense = async (id, expense) => (await api.put(`/expenses/${id}`, expense)).data;
export const getBudgets = async () => (await api.get("/budget")).data;
export const saveBudget = async (budget) => (await api.post("/budget/add", budget)).data;

export default api;
