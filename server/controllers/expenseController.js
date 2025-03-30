// // // // // import Expense from "../models/expenseSchema.js";
// // // // // import mongoose from "mongoose";

// // // // // // ✅ Add Expense
// // // // // export const addExpense = async (req, res) => {
// // // // //     try {
// // // // //         const { title, amount, category, type, date, description } = req.body;

// // // // //         if (!title || !amount || !category || !type || !date) {
// // // // //             return res.status(400).json({ error: "All fields are required" });
// // // // //         }

// // // // //         const newExpense = new Expense({
// // // // //             title,
// // // // //             amount: parseFloat(amount), // Ensure amount is stored as a number
// // // // //             category,
// // // // //             type,
// // // // //             date: new Date(date), // Ensure date is stored correctly
// // // // //             description,
// // // // //         });

// // // // //         await newExpense.save();
// // // // //         res.status(201).json({ message: "Expense Added Successfully", expense: newExpense });

// // // // //     } catch (error) {
// // // // //         res.status(500).json({ error: error.message });
// // // // //     }
// // // // // };

// // // // // // ✅ Get Expenses
// // // // // export const getExpenses = async (req, res) => {
// // // // //     try {
// // // // //         const expenses = await Expense.find();
// // // // //         return res.status(200).json(expenses);
// // // // //     } catch (error) {
// // // // //         return res.status(500).json({ error: error.message });
// // // // //     }
// // // // // };

// // // // // // ✅ Delete Expense
// // // // // export const deleteExpense = async (req, res) => {
// // // // //     try {
// // // // //         const { id } = req.params;
// // // // //         console.log("Received DELETE request for ID:", id);

// // // // //         const deletedExpense = await Expense.findByIdAndDelete(id);

// // // // //         if (!deletedExpense) {
// // // // //             console.log("Expense not found in DB");
// // // // //             return res.status(404).json({ error: "Expense not found" });
// // // // //         }

// // // // //         return res.status(200).json({ message: "Expense deleted successfully" });
// // // // //     } catch (error) {
// // // // //         return res.status(500).json({ error: error.message });
// // // // //     }
// // // // // };


// // // // // //✅Update Expense
// // // // // export const updateExpense = async (req, res) => {
// // // // //   try {
// // // // //     const { id } = req.params;
// // // // //     const updatedData = req.body;

// // // // //     if (!mongoose.Types.ObjectId.isValid(id)) {
// // // // //       return res.status(400).json({ error: "Invalid Expense ID" });
// // // // //     }

// // // // //     const updatedExpense = await Expense.findByIdAndUpdate(id, updatedData, { new: true });

// // // // //     if (!updatedExpense) {
// // // // //       return res.status(404).json({ error: "Expense not found" });
// // // // //     }

// // // // //     res.status(200).json(updatedExpense);
// // // // //   } catch (error) {
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // };

// // // // import Expense from "../models/expenseSchema.js";

// // // // // ✅ Add Expense for a Specific User
// // // // export const addExpense = async (req, res) => {
// // // //     const { title, amount, category, type, date, description } = req.body;
// // // //     const userId = req.user.userId; // Extract user ID

// // // //     try {
// // // //         const newExpense = new Expense({ userId, title, amount, category, type, date, description });
// // // //         await newExpense.save();
// // // //         res.status(201).json({ message: "Expense added successfully", expense: newExpense });
// // // //     } catch (err) {
// // // //         res.status(500).json({ message: "Server Error", error: err.message });
// // // //     }
// // // // };

// // // // // ✅ Get Expenses for a Specific User
// // // // export const getExpenses = async (req, res) => {
// // // //     const userId = req.user.userId; // Extract user ID

// // // //     try {
// // // //         const expenses = await Expense.find({ userId });
// // // //         res.json(expenses);
// // // //     } catch (err) {
// // // //         res.status(500).json({ message: "Server Error", error: err.message });
// // // //     }
// // // // };
// // // import Expense from "../models/expenseSchema.js"; // ✅ Import Expense model

// // // // ✅ Add Expense
// // // export const addExpense = async (req, res) => {
// // //   try {
// // //     const { title, amount, category, date, userId } = req.body;
// // //     const newExpense = new Expense({ title, amount, category, date, userId });
// // //     await newExpense.save();
// // //     res.status(201).json({ message: "Expense added successfully", newExpense });
// // //   } catch (err) {
// // //     res.status(500).json({ message: "Server Error", error: err.message });
// // //   }
// // // };

// // // // ✅ Get Expenses (Only for Logged-in User)
// // // export const getExpenses = async (req, res) => {
// // //   try {
// // //     const { userId } = req.params; // Get userId from request params
// // //     const expenses = await Expense.find({ userId }); // Filter by userId
// // //     res.status(200).json(expenses);
// // //   } catch (err) {
// // //     res.status(500).json({ message: "Server Error", error: err.message });
// // //   }
// // // };

// // // // ✅ Delete Expense
// // // export const deleteExpense = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const deletedExpense = await Expense.findByIdAndDelete(id);
// // //     if (!deletedExpense) return res.status(404).json({ message: "Expense not found" });

// // //     res.status(200).json({ message: "Expense deleted successfully" });
// // //   } catch (err) {
// // //     res.status(500).json({ message: "Server Error", error: err.message });
// // //   }
// // // };

// // // // ✅ Update Expense
// // // export const updateExpense = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });

// // //     if (!updatedExpense) return res.status(404).json({ message: "Expense not found" });

// // //     res.status(200).json({ message: "Expense updated successfully", updatedExpense });
// // //   } catch (err) {
// // //     res.status(500).json({ message: "Server Error", error: err.message });
// // //   }
// // // };
// // import Expense from "../models/expenseSchema.js";

// // // Fetch expenses for logged-in user
// // export const getExpenses = async (req, res) => {
// //   try {
// //     const expenses = await Expense.find({ userId: req.user.userId });
// //     res.json(expenses);
// //   } catch (err) {
// //     res.status(500).json({ message: "Server Error", error: err.message });
// //   }
// // };

// // // Add expense with user ID
// // export const addExpense = async (req, res) => {
// //   try {
// //     const { title, amount, category } = req.body;
// //     const newExpense = new Expense({ title, amount, category, userId: req.user.userId });
// //     await newExpense.save();
// //     res.status(201).json(newExpense);
// //   } catch (err) {
// //     res.status(500).json({ message: "Server Error", error: err.message });
// //   }
// // };
// import Expense from "../models/ExpenseModel.js";

// // ✅ Fetch expenses securely
// export const getExpenses = async (req, res) => {
//   try {
//     if (!req.user) return res.status(401).json({ message: "Unauthorized access" });

//     const expenses = await Expense.find({ userId: req.user.id });

//     if (!expenses || expenses.length === 0) return res.status(404).json({ message: "No expenses found" });

//     res.json(expenses);
//   } catch (error) {
//     console.error("Error fetching expenses:", error);
//     res.status(500).json({ message: "Server Error", error });
//   }
// };
import Expense from "../models/expenseSchema.js";

export const addExpense = async (req, res) => {
  try {
    const { amount, category, date } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const newExpense = new Expense({
      userId: req.user.id,
      amount,
      category,
      date,
    });

    await newExpense.save();
    res.status(201).json({ message: "Expense added successfully" });
  } catch (error) {
    console.error("Error adding expense:", error.message);
    res.status(500).json({ error: "Server error while adding expense" });
  }
};

export const getExpenses = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const expenses = await Expense.find({ userId: req.user.id });
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error.message);
    res.status(500).json({ error: "Server error while fetching expenses" });
  }
};
