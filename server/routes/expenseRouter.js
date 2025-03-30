// // // import express from "express";
// // // import { addExpense, getExpenses, deleteExpense, updateExpense } from "../controllers/expenseController.js";

// // // const router = express.Router();

// // // router.post("/add", addExpense);
// // // router.get("/:userId", getExpenses); // Fetch expenses for a specific user
// // // router.delete("/:id", deleteExpense);
// // // router.put("/:id", updateExpense);

// // // export default router;
// // import express from "express";
// // import { addExpense, getExpenses, deleteExpense, updateExpense } from "../controllers/expenseController.js";
// // import authMiddleware from "../middleware/authMiddleware.js";

// // const router = express.Router();

// // router.post("/add", authMiddleware, addExpense);
// // router.get("/get", authMiddleware, getExpenses);
// // router.delete("/delete/:id", authMiddleware, deleteExpense);
// // router.put("/update/:id", authMiddleware, updateExpense);

// // export default router;
// import express from "express";
// import { addExpense, getExpenses } from "../controllers/expenseController.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/add", authMiddleware, addExpense);
// router.get("/", authMiddleware, getExpenses);

// export default router;

import express from "express";
import { addExpense, getExpenses } from "../controllers/expenseController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // ✅ Import middleware

const router = express.Router();

router.post("/add", authMiddleware, addExpense); // ✅ Protected Add Expense
router.get("/", authMiddleware, getExpenses); // ✅ Protected Get Expenses

export default router;
