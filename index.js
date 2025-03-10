// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";
// import userRoutes from "./routes/userRoutes.js";
// import expenseRoutes from "./routes/expenseRouter.js";
// import budgetRoutes from "./routes/budgetRoutes.js"; // ✅ Import Budget Routes
// import connectDB from "./DB/Database.js"; // ✅ Ensure correct path

// dotenv.config();
// connectDB();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cors());

// // ✅ Use Routes
// app.use("/api/users", userRoutes);
// app.use("/api/expenses", expenseRoutes);
// app.use("/api/budget", budgetRoutes); // ✅ Add Budget Routes

// // ✅ Test Route
// app.get("/", (req, res) => {
//   res.send("Hello, Server is Running & MongoDB is Connected!");
// });

// // ✅ Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRouter.js";
import budgetRoutes from "./routes/budgetRoutes.js"; // ✅ Import budget routes
import connectDB from "./DB/Database.js"; 


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// ✅ Use Routes
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budget", budgetRoutes);  // ✅ Ensure Budget Routes are Registered

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Hello, Server is Running & MongoDB is Connected!");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});



