import express from "express";
import { saveBudget, getBudget } from "../controllers/budgetController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/save", authMiddleware, saveBudget);
router.get("/get", authMiddleware, getBudget); // ✅ Ensure this matches frontend

export default router;
