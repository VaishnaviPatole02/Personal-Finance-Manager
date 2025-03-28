// // import User from "../models/UserSchema.js";
// // import bcrypt from "bcryptjs";
// // import jwt from "jsonwebtoken";

// // // ✅ User Registration
// // export const registerUser = async (req, res) => {
// //   const { name, email, password } = req.body;
  
// //   try {
// //     let user = await User.findOne({ email });
// //     if (user) return res.status(400).json({ message: "User already exists" });

// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     user = new User({ name, email, password: hashedPassword });
// //     await user.save();

// //     res.status(201).json({ message: "User registered successfully" });
// //   } catch (err) {
// //     res.status(500).json({ message: "Server Error", error: err.message });
// //   }
// // };

// // // ✅ User Login
// // export const loginUser = async (req, res) => {
// //   const { email, password } = req.body;
  
// //   try {
// //     const user = await User.findOne({ email });
// //     if (!user) return res.status(400).json({ message: "Invalid credentials" });

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

// //     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
// //     res.json({ token, email: user.email });
// //   } catch (err) {
// //     res.status(500).json({ message: "Server Error", error: err.message });
// //   }
// // };
// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const user = await User.findOne({ email });
//       if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
//       res.json({ token, userId: user._id, email: user.email }); // Return userId
//     } catch (err) {
//       res.status(500).json({ message: "Server Error", error: err.message });
//     }
//   };
import User from "../models/UserSchema.js"; // ✅ Import User Model
import bcrypt from "bcryptjs"; // ✅ Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // ✅ Import JWT for authentication

// ✅ User Registration
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ User Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, userId: user._id, email: user.email }); // ✅ Return userId
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
