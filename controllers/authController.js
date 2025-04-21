const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Fetch all users
const login = async (req, res) => {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    console.log(token);

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const register = async (req, res) => {
  let {
    firstName,
    lastName,
    email,
    phone,
    password,
    role,
    company,
    country,
    city,
    address,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      phone,
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
};

module.exports = { login, register };
