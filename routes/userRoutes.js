const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const router = express.Router();

router.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    company,
    country,
    city,
    address,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      role,
      company,
      country,
      city,
      address,
    });

    await user.save();

    res.status(201).json({ message: "User added successfully", user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error adding user", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(password);

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If credentials are correct, return the user (or a token if needed)
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
