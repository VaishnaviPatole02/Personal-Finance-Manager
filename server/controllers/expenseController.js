import Expense from "../models/expenseSchema.js";
import mongoose from "mongoose";


export const addExpense = async (req, res) => {
    try {
        const { title, amount, category, type, date, description } = req.body;

        if (!title || !amount || !category || !type || !date) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newExpense = new Expense({
            userId: req.user.id, 
            title,
            amount: parseFloat(amount), 
            category,
            type,
            date: new Date(date), 
            description,
        });

        await newExpense.save();
        res.status(201).json({ message: "Expense Added Successfully", expense: newExpense });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id }); // ✅ Filter by user
        return res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Received DELETE request for ID:", id);

        const deletedExpense = await Expense.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!deletedExpense) {
            console.log("Expense not found in DB or does not belong to the user");
            return res.status(404).json({ error: "Expense not found or unauthorized" });
        }

        return res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Expense ID" });
        }

        const updatedExpense = await Expense.findOneAndUpdate(
            { _id: id, userId: req.user.id }, // ✅ Ensure user can only update their own expense
            updatedData,
            { new: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({ error: "Expense not found or unauthorized" });
        }

        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
