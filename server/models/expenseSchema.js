// import mongoose from "mongoose";

// const ExpenseSchema = new mongoose.Schema({
//     title: { 
//         type: String, 
//         required: true 
//     },
//     amount: { 
//         type: Number, 
//         required: true 
//     },
//     category: { 
//         type: String, 
//         required: true 
//     },
//     type: { 
//         type: String, 
//         enum: ["debit", "credit"], 
//         required: true 
//     },
//     date: { 
//         type: Date, 
//         required: true 
//     },
//     description: { 
//         type: String 
//     },
// }, { timestamps: true });

// const Expense = mongoose.model("Expense", ExpenseSchema);
// export default Expense;
import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Associate with User
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    type: { type: String, enum: ["debit", "credit"], required: true },
    date: { type: Date, required: true },
    description: { type: String },
}, { timestamps: true });

const Expense = mongoose.model("Expense", ExpenseSchema);
export default Expense;
