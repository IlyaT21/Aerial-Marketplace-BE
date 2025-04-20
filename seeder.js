require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const connectDB = require("./config/db"); // adjust path as needed

const seedData = async () => {
  try {
    // Connect to DB
    await connectDB();

    // Clean existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Hash common passwords
    const hashedAdminPass = await bcrypt.hash("admin123", 10);
    const hashedSellerPass = await bcrypt.hash("seller123", 10);
    const hashedBuyerPass = await bcrypt.hash("buyer123", 10);

    // Create Admin
    const admin = await User.create({
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      password: hashedAdminPass,
      role: "admin",
      company: "Admin Company",
      country: "Admin Country",
      city: "Admin City",
      address: "Admin Address",
    });

    // Create Sellers
    const seller1 = await User.create({
      firstName: "Seller",
      lastName: "One",
      email: "seller1@example.com",
      phone: "3812345678",
      password: hashedSellerPass,
      role: "seller",
      company: "Seller One Co",
      country: "Country A",
      city: "City A",
      address: "123 Market St",
    });

    const seller2 = await User.create({
      firstName: "Seller",
      lastName: "Two",
      email: "seller2@example.com",
      phone: "3818765432",
      password: hashedSellerPass,
      role: "seller",
      company: "Seller Two Co",
      country: "Country B",
      city: "City B",
      address: "456 Commerce Rd",
    });

    // Create Buyer
    const buyer = await User.create({
      firstName: "Buyer",
      lastName: "User",
      email: "buyer@example.com",
      password: hashedBuyerPass,
      role: "buyer",
    });

    // Create Products for each seller
    const product1 = await Product.create({
      productImage: "placeholder.png",
      productName: "Drone A1",
      category: "Drones",
      productDescription: "High-performance drone A1",
      price: 299,
      model: "A1",
      manufacturer: "DroneCorp",
      year: 2024,
      condition: "new",
      registration: "REG123A",
      sellerId: seller1._id,
    });

    const product2 = await Product.create({
      productImage: "placeholder.png",
      productName: "Helicopter H2",
      category: "Helicopters",
      productDescription: "Lightweight helicopter H2",
      price: 499,
      model: "H2",
      manufacturer: "HeliWorks",
      year: 2023,
      condition: "used",
      registration: "REG456H",
      sellerId: seller2._id,
    });

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();
