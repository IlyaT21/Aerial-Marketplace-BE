require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const connectDB = require("./config/db");

const seedData = async () => {
  try {
    await connectDB();

    // Clean existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Passwords for test users
    const hashedAdminPass = "admin123";
    const hashedSellerPass = "seller123";
    const hashedBuyerPass = "buyer123";

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

    const product3 = await Product.create({
      productName: "SkyMaster P3",
      category: "Planes",
      productDescription: "Lightweight sport plane with modern avionics",
      price: 1250,
      model: "P3",
      manufacturer: "AeroDynamics",
      year: 2022,
      condition: "used",
      registration: "PLN789P",
      sellerId: seller1._id,
    });

    const product4 = await Product.create({
      productName: "GlideG4",
      category: "Other",
      productDescription: "High‑performance glider for recreational pilots",
      price: 800,
      model: "G4",
      manufacturer: "WindRiders",
      year: 2021,
      condition: "new",
      registration: "OTH456G",
      sellerId: seller2._id,
    });

    const product5 = await Product.create({
      productName: "Falcon X2",
      category: "Drones",
      productDescription: "Compact drone with 4K camera",
      price: 349,
      model: "X2",
      manufacturer: "SkyView",
      year: 2025,
      condition: "new",
      registration: "DRN234X",
      sellerId: seller1._id,
    });

    const product6 = await Product.create({
      productName: "Racer Z3",
      category: "Drones",
      productDescription: "High-speed racing drone",
      price: 279,
      model: "Z3",
      manufacturer: "RaceAir",
      year: 2024,
      condition: "used",
      registration: "DRN765Z",
      sellerId: seller2._id,
    });

    const product7 = await Product.create({
      productName: "Surveyor D4",
      category: "Drones",
      productDescription: "Drone built for large-area surveying",
      price: 520,
      model: "D4",
      manufacturer: "GeoFly",
      year: 2023,
      condition: "new",
      registration: "DRN908D",
      sellerId: seller1._id,
    });

    const product8 = await Product.create({
      productName: "Heli Pro E5",
      category: "Helicopters",
      productDescription: "Professional helicopter for aerial work",
      price: 1200,
      model: "E5",
      manufacturer: "RotorTech",
      year: 2022,
      condition: "used",
      registration: "HEL112E",
      sellerId: seller2._id,
    });

    const product9 = await Product.create({
      productName: "Chopper F6",
      category: "Helicopters",
      productDescription: "Lightweight chopper for personal use",
      price: 850,
      model: "F6",
      manufacturer: "AirLift",
      year: 2024,
      condition: "new",
      registration: "HEL334F",
      sellerId: seller1._id,
    });

    const product10 = await Product.create({
      productName: "Rescue G7",
      category: "Helicopters",
      productDescription: "Helicopter outfitted for search and rescue missions",
      price: 1400,
      model: "G7",
      manufacturer: "RescueAir",
      year: 2023,
      condition: "used",
      registration: "HEL556G",
      sellerId: seller2._id,
    });

    const product11 = await Product.create({
      productName: "SkyCruiser H8",
      category: "Planes",
      productDescription: "Comfortable cruiser plane for long distances",
      price: 1600,
      model: "H8",
      manufacturer: "AeroLux",
      year: 2021,
      condition: "used",
      registration: "PLN778H",
      sellerId: seller1._id,
    });

    const product12 = await Product.create({
      productName: "SportJet I9",
      category: "Planes",
      productDescription: "High-performance sport jet",
      price: 2200,
      model: "I9",
      manufacturer: "JetStream",
      year: 2025,
      condition: "new",
      registration: "PLN990I",
      sellerId: seller2._id,
    });

    const product13 = await Product.create({
      productName: "Cargo J10",
      category: "Planes",
      productDescription: "Medium cargo plane for logistics",
      price: 1800,
      model: "J10",
      manufacturer: "CargoFly",
      year: 2022,
      condition: "used",
      registration: "PLN112J",
      sellerId: seller1._id,
    });

    const product14 = await Product.create({
      productName: "Glider K11",
      category: "Other",
      productDescription: "Silent glider for recreational flying",
      price: 650,
      model: "K11",
      manufacturer: "WindRider",
      year: 2023,
      condition: "new",
      registration: "OTH334K",
      sellerId: seller2._id,
    });

    const product15 = await Product.create({
      productName: "Airship L12",
      category: "Other",
      productDescription: "Passenger airship with panoramic views",
      price: 2000,
      model: "L12",
      manufacturer: "SkyBlimp",
      year: 2024,
      condition: "new",
      registration: "OTH556L",
      sellerId: seller1._id,
    });

    const product16 = await Product.create({
      productName: "HotAir M13",
      category: "Other",
      productDescription: "Classic hot air balloon experience",
      price: 400,
      model: "M13",
      manufacturer: "BalloonCo",
      year: 2025,
      condition: "new",
      registration: "OTH778M",
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
