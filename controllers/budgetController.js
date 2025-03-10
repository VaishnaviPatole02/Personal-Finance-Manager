import Budget from "../models/BudgetModel.js";
import Expense from "../models/expenseSchema.js"; // ✅ Import expenses for balance calculation

// ✅ Save Budget Entry
export const saveBudget = async (req, res) => {
  try {
    const { category, amount } = req.body;

    if (!category || !amount) {
      return res.status(400).json({ error: "Category and Amount are required." });
    }

    const existingBudget = await Budget.findOne({ category });

    if (existingBudget) {
      existingBudget.amount = amount; // ✅ Update existing budget amount
      await existingBudget.save();
      return res.status(200).json({ message: "Budget updated successfully.", budget: existingBudget });
    } else {
      const newBudget = new Budget({ category, amount });
      await newBudget.save();
      return res.status(201).json({ message: "Budget added successfully.", budget: newBudget });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Fetch All Budgets & Calculate Current Balance
export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();

    // ✅ Fetch all expenses for balance calculation
    const expenses = await Expense.find({ type: "debit" });

    // ✅ Add "currentBalance" field to each budget
    const budgetsWithBalance = budgets.map((budget) => {
      const totalExpenses = expenses
        .filter((expense) => expense.category === budget.category)
        .reduce((sum, expense) => sum + expense.amount, 0);

      return {
        ...budget.toObject(),
        currentBalance: budget.amount - totalExpenses, // ✅ Subtract debit transactions
      };
    });

    res.status(200).json(budgetsWithBalance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
