import Expense from "../models/expenseSchema.js";
import mongoose from "mongoose";

// ✅ Add Expense
export const addExpense = async (req, res) => {
    try {
        const { title, amount, category, type, date, description } = req.body;

        if (!title || !amount || !category || !type || !date) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newExpense = new Expense({
            title,
            amount: parseFloat(amount), // Ensure amount is stored as a number
            category,
            type,
            date: new Date(date), // Ensure date is stored correctly
            description,
        });

        await newExpense.save();
        res.status(201).json({ message: "Expense Added Successfully", expense: newExpense });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get Expenses
export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        return res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// ✅ Delete Expense
export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Received DELETE request for ID:", id);

        const deletedExpense = await Expense.findByIdAndDelete(id);

        if (!deletedExpense) {
            console.log("Expense not found in DB");
            return res.status(404).json({ error: "Expense not found" });
        }

        return res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


//✅Update Expense
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Expense ID" });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

