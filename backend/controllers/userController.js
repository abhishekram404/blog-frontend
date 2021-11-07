const User = require("../models/User");
const registerValidator = require("../middlewares/registerValidator");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res) => {
  try {
    const { error, value } = await registerValidator(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    let { name, email, username, password } = await value;

    username = username.replace(/[^a-zA-Z _]/g, "");
    username = username.toLowerCase();

    const userAlreadyExist = await User.exists({ email });
    if (userAlreadyExist) {
      return res.status(400).send({
        success: false,
        message:
          "Email is already registered. Please recheck email else login.",
        details: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
    });
    const token = await newUser.generateToken();

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 2,
      secure: false,
    });
    res.cookie("isUserLoggedIn", true, {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 2,
      secure: false,
    });
    return res.status(200).send({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
      details: error,
    });
  }
};
