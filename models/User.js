const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: {
    type: String,
  },
  email: String,
  adress: String,
  phoneNumber: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
