import Expense from "../models/expenseSchema.js";

// Add Expense
export const addExpense = async (req, res) => {
  try {
      const { title, amount, category, type, date, description } = req.body;

      if (!title || !amount || !category || !type || !date) {
          return res.status(400).json({ error: "All fields are required" });
      }

      const newExpense = new Expense({
          title,
          amount: parseFloat(amount),  // Ensure amount is stored as Number
          category,
          type,
          date: new Date(date),  // Ensure date is stored as Date
          description
      });

      await newExpense.save();
      res.status(201).json({ message: "Expense Added Successfully", expense: newExpense });

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Get Expenses
export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        return res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
