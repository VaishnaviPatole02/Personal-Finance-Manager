import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import colors from "colors"; 
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRouter.js";
import budgetRoutes from "./routes/budgetRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; 

app.use(express.json());
app.use(cors());


app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budget", budgetRoutes);  


app.get("/", (req, res) => {
  res.send("Hello, Server is Running & MongoDB is Connected!");
});


mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected".cyan.bold);
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`.green.bold));
  })
  .catch((error) => {
    console.error(`❌ Connection Error: ${error.message}`.red.bold);
    process.exit(1); 
  });
