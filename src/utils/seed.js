const dotenv = require("dotenv");
const connectDB = require("../config/db");
const NamasteCode = require("../models/NamasteCode");
const loadCSV = require("./csvLoader");

dotenv.config();
connectDB();

const runSeeder = async () => {
  try {
    await loadCSV("data/namaste.csv");
    console.log(" NAMASTE data seeded!");
    process.exit();
  } catch (err) {
    console.error(" Error seeding:", err);
    process.exit(1);
  }
};

runSeeder();
