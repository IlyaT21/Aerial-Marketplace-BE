require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/userModel");

async function seedAdmin() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in .env");
    }
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Clear database
    await mongoose.connection.db.dropDatabase();
    console.log("🗑️  Database cleared");

    // Check if the admin email and password are set
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
      throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD missing in .env");
    }

    // Create an admin user
    const adminUser = await User.create({
      firstName: "Admin",
      lastName: "User",
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });
    console.log(`🔐 Admin user created: ${adminUser.email}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedAdmin();
