import express from "express";
import { getBudgets, saveBudget } from "../controllers/budgetController.js";

const router = express.Router();

router.get("/get", getBudgets); // ✅ Fetch budgets
router.post("/set", saveBudget); // ✅ Save budget

export default router;
