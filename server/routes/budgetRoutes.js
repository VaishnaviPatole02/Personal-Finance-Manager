// // import express from "express";
// // import { getBudgets, saveBudget } from "../controllers/budgetController.js";

// // const router = express.Router();

// // router.get("/get", getBudgets); // ✅ Fetch budgets
// // router.post("/set", saveBudget); // ✅ Save budget

// // export default router;
// import express from "express";
// import { getBudgets, saveBudget } from "../controllers/budgetController.js";
// import { protect } from "../middleware/authMiddleware.js"; // Import middleware

// const router = express.Router();

// router.get("/get", protect, getBudgets); // ✅ Fetch budgets for logged-in user
// router.post("/set", protect, saveBudget); // ✅ Save budget for logged-in user

// export default router;
import express from "express";
import { getBudgets, saveBudget } from "../controllers/budgetController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get", authMiddleware, getBudgets); // Secure this route
router.post("/save", authMiddleware, saveBudget);

export default router;
