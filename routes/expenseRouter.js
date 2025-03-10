// import express from "express";
// import { addExpense, getExpenses, deleteExpense } from "../controllers/expenseController.js";

// const router = express.Router();

// router.post("/add", addExpense);
// router.get("/", getExpenses);
// router.delete("/:id", deleteExpense); // ✅ Delete expense by ID

// export default router;
import express from "express";
import { addExpense, getExpenses, deleteExpense, updateExpense } from "../controllers/expenseController.js";

const router = express.Router();

router.post("/add", addExpense);
router.get("/", getExpenses);
router.delete("/:id", deleteExpense);
router.put("/:id", updateExpense); // ✅ New route for updating expense

export default router;
