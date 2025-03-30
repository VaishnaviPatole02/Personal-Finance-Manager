// // // import User from "../models/UserSchema.js";
// // // import bcrypt from "bcryptjs";
// // // import jwt from "jsonwebtoken";

// // // // ✅ User Registration
// // // export const registerUser = async (req, res) => {
// // //   const { name, email, password } = req.body;
  
// // //   try {
// // //     let user = await User.findOne({ email });
// // //     if (user) return res.status(400).json({ message: "User already exists" });

// // //     const hashedPassword = await bcrypt.hash(password, 10);
// // //     user = new User({ name, email, password: hashedPassword });
// // //     await user.save();

// // //     res.status(201).json({ message: "User registered successfully" });
// // //   } catch (err) {
// // //     res.status(500).json({ message: "Server Error", error: err.message });
// // //   }
// // // };

// // // // ✅ User Login
// // // export const loginUser = async (req, res) => {
// // //   const { email, password } = req.body;
  
// // //   try {
// // //     const user = await User.findOne({ email });
// // //     if (!user) return res.status(400).json({ message: "Invalid credentials" });

// // //     const isMatch = await bcrypt.compare(password, user.password);
// // //     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

// // //     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
// // //     res.json({ token, email: user.email });
// // //   } catch (err) {
// // //     res.status(500).json({ message: "Server Error", error: err.message });
// // //   }
// // // };
// // export const loginUser = async (req, res) => {
// //     const { email, password } = req.body;
  
// //     try {
// //       const user = await User.findOne({ email });
// //       if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
// //       const isMatch = await bcrypt.compare(password, user.password);
// //       if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
// //       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
// //       res.json({ token, userId: user._id, email: user.email }); // Return userId
// //     } catch (err) {
// //       res.status(500).json({ message: "Server Error", error: err.message });
// //     }
// //   };
// import User from "../models/UserSchema.js"; // ✅ Import User Model
// import bcrypt from "bcryptjs"; // ✅ Import bcrypt for password hashing
// import jwt from "jsonwebtoken"; // ✅ Import JWT for authentication

// // ✅ User Registration
// export const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     user = new User({ name, email, password: hashedPassword });
//     await user.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// // ✅ User Login
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.json({ token, userId: user._id, email: user.email }); // ✅ Return userId
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js"; // Make sure you have a User model

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
