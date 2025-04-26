const User = require("../models/userModel");
const Product = require("../models/productModel");
const bcrypt = require("bcryptjs");

// Fetch all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    company,
    country,
    city,
    address,
  } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if they are provided
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    if (password) {
      user.password = password || user.password;
    }
    user.company = company || user.company;
    user.country = country || user.country;
    user.city = city || user.city;
    user.address = address || user.address;

    // Save updated user
    const updatedUser = await user.save();

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check for products created by this user
    const productCount = await Product.countDocuments({ sellerId: userId });
    if (productCount > 0) {
      return res.status(400).json({
        message: "Cannot delete user: user has existing products",
        productCount,
      });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
