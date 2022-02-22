const mongoose = require("mongoose");

// Connection data base function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Data base connected successfully");
  } catch (error) {
    console.log("Data base connection failed", error);
  }
};

module.exports = connectDB;
