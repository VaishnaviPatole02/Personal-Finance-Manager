const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["credit", "debit"], required: true },
  date: { type: Date, default: Date.now },
  title: { type: String, required: true }
});

module.exports = mongoose.model("Expense", expenseSchema);
