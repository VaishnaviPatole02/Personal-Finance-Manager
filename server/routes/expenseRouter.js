import express from "express";
import { getExpenses, addExpense, deleteExpense, updateExpense } from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Expense  saves userId
router.post("/add", protect, addExpense);

// Get Expenses filters by userId
router.get("/", protect, getExpenses);

router.delete("/:id", protect, deleteExpense);
router.put("/:id", protect, updateExpense);

export default router;
