const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const User = require("./models/userModel");

dotenv.config();
connectDB();

const app = express();
app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(bodyParser.json());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

const createAdminUser = async () => {
  try {
    const adminEmail = "admin@example.com"; // Default admin email
    const adminPassword = "admin123"; // Default admin password
    // const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      email: adminEmail,
      role: "admin",
    });
    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }

    // Create a new admin user
    const adminUser = new User({
      firstName: "Admin",
      lastName: "User",
      email: adminEmail,
      password: adminPassword,
      role: "admin",
      company: "Admin Company",
      country: "Admin Country",
      city: "Admin City",
      address: "Admin Address",
    });

    await adminUser.save();
    console.log("Admin user created successfully.");
  } catch (error) {
    console.error("Error creating admin user:", error.message);
  }
};

// Call the function when the server starts
createAdminUser();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
