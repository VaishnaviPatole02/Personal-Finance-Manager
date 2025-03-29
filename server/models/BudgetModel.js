// import mongoose from "mongoose";

// const BudgetSchema = new mongoose.Schema({
//   category: { type: String, required: true },
//   amount: { type: Number, required: true },
// });

// const Budget = mongoose.model("Budget", BudgetSchema);
// export default Budget;
import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Associate with User
  category: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Budget = mongoose.model("Budget", BudgetSchema);
export default Budget;
