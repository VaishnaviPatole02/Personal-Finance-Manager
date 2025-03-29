// // import Budget from "../models/BudgetModel.js";
// // import Expense from "../models/expenseSchema.js"; // ✅ Import expenses for balance calculation

// // // ✅ Save Budget Entry
// // export const saveBudget = async (req, res) => {
// //   try {
// //     const { category, amount } = req.body;

// //     if (!category || !amount) {
// //       return res.status(400).json({ error: "Category and Amount are required." });
// //     }

// //     const existingBudget = await Budget.findOne({ category });

// //     if (existingBudget) {
// //       existingBudget.amount = amount; // ✅ Update existing budget amount
// //       await existingBudget.save();
// //       return res.status(200).json({ message: "Budget updated successfully.", budget: existingBudget });
// //     } else {
// //       const newBudget = new Budget({ category, amount });
// //       await newBudget.save();
// //       return res.status(201).json({ message: "Budget added successfully.", budget: newBudget });
// //     }
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // // ✅ Fetch All Budgets & Calculate Current Balance
// // export const getBudgets = async (req, res) => {
// //   try {
// //     const budgets = await Budget.find();

// //     // ✅ Fetch all expenses for balance calculation
// //     const expenses = await Expense.find({ type: "debit" });

// //     // ✅ Add "currentBalance" field to each budget
// //     const budgetsWithBalance = budgets.map((budget) => {
// //       const totalExpenses = expenses
// //         .filter((expense) => expense.category === budget.category)
// //         .reduce((sum, expense) => sum + expense.amount, 0);

// //       return {
// //         ...budget.toObject(),
// //         currentBalance: budget.amount - totalExpenses, // ✅ Subtract debit transactions
// //       };
// //     });

// //     res.status(200).json(budgetsWithBalance);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };
// import Budget from "../models/BudgetModel.js";

// // ✅ Save Budget for a Specific User
// export const saveBudget = async (req, res) => {
//     const { category, amount } = req.body;
//     const userId = req.user.userId; // Extract user ID from token

//     try {
//         const newBudget = new Budget({ userId, category, amount });
//         await newBudget.save();
//         res.status(201).json({ message: "Budget saved successfully", budget: newBudget });
//     } catch (err) {
//         res.status(500).json({ message: "Server Error", error: err.message });
//     }
// };

// // ✅ Get Budgets for a Specific User
// export const getBudgets = async (req, res) => {
//     const userId = req.user.userId; // Extract user ID

//     try {
//         const budgets = await Budget.find({ userId });
//         res.json(budgets);
//     } catch (err) {
//         res.status(500).json({ message: "Server Error", error: err.message });
//     }
// };
import Budget from "../models/BudgetModel.js";

// Fetch budgets for logged-in user
export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.userId }); // Fetch only for logged-in user
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Save budget with user ID
export const saveBudget = async (req, res) => {
  try {
    const { category, amount } = req.body;
    const newBudget = new Budget({ category, amount, userId: req.user.userId });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
