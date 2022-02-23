const User = require("../models/User");
const bcrypt = require("bcryptjs");

/***************************** User register  ********************** */

exports.userRegister = async (req, res) => {
  const newUser = await new User({ ...req.body });
  const email = newUser.email;

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(402).json({ msg: "User already exist" });

    // Hashage algorith complexity
    const salt = await bcrypt.genSalt(10);
    // Hashed password
    const hash = await bcrypt.hash(newUser.password, salt);

    newUser.password = hash;

    newUser.save();
    res.status(202).json({ msg: "Rgister success" });
  } catch (error) {
    console.log(error);
    res.status(402).json({ msg: "User register failed", errors: error });
  }
};
