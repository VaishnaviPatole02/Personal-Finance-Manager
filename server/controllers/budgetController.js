import Budget from "../models/budgetModel.js";
import Expense from "../models/expenseSchema.js"; 


export const addBudget = async (req, res) => {
  try {
    const { category, amount } = req.body;
    const userId = req.user.id;

    if (!category || !amount) {
      return res.status(400).json({ error: "Category and Amount are required." });
    }

    const existingBudget = await Budget.findOne({ userId, category });

    if (existingBudget) {
      existingBudget.amount = amount; 
      await existingBudget.save();
      return res.status(200).json({ message: "Budget updated successfully.", budget: existingBudget });
    } else {
      const newBudget = new Budget({ userId, category, amount });
      await newBudget.save();
      return res.status(201).json({ message: "Budget added successfully.", budget: newBudget });
    }
  } catch (error) {
    res.status(500).json({ error: "Error adding/updating budget." });
  }
};


export const getBudgets = async (req, res) => {
  try {
    const userId = req.user.id; 
    const budgets = await Budget.find({ userId }); 
    const expenses = await Expense.find({ userId, type: "debit" }); 

    
    const budgetsWithBalance = budgets.map((budget) => {
      const totalExpenses = expenses
        .filter((expense) => expense.category === budget.category)
        .reduce((sum, expense) => sum + expense.amount, 0);

      return {
        ...budget.toObject(),
        currentBalance: budget.amount - totalExpenses, 
      };
    });

    res.status(200).json(budgetsWithBalance);
  } catch (error) {
    res.status(500).json({ error: "Error fetching budgets." });
  }
};


export const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Get user ID from token

    const budget = await Budget.findOneAndDelete({ _id: id, userId });

    if (!budget) {
      return res.status(404).json({ error: "Budget not found or unauthorized." });
    }

    res.status(200).json({ message: "Budget deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error deleting budget." });
  }
};


export const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, amount } = req.body;
    const userId = req.user.id; 

    const updatedBudget = await Budget.findOneAndUpdate(
      { _id: id, userId },
      { category, amount },
      { new: true }
    );

    if (!updatedBudget) {
      return res.status(404).json({ error: "Budget not found or unauthorized." });
    }

    res.status(200).json({ message: "Budget updated successfully.", budget: updatedBudget });
  } catch (error) {
    res.status(500).json({ error: "Error updating budget." });
  }
};
