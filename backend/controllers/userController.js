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

    // username = username.replace(/[^a-zA-Z _]/g, "");
    // username = username.toLowerCase();

    const userAlreadyExist = await User.exists({ email });
    if (userAlreadyExist) {
      return res.status(400).send({
        success: false,
        message:
          "Email is already registered. Please recheck email else login.",
        details: null,
      });
    }

    const usernameAlreadyExist = await User.exists({ username });
    if (usernameAlreadyExist) {
      return res.status(400).send({
        success: false,
        message: "Username is not available. Please choose another username.",
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
      maxAge: 900000000,
      secure: false,
    });
    res.cookie("isUserLoggedIn", 1, {
      httpOnly: false,
      maxAge: 900000000,
      secure: false,
    });
    return res.status(200).send({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = await req.body;

    const foundUser = await User.findOne({ email: email.trim() }).select(
      "+password"
    );

    if (!foundUser) {
      return res.status(400).send({
        success: false,
        message:
          "Email isn't registered. Please check your email or register first.",
        details: null,
      });
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(400).send({
        success: false,
        message: "Wrong password! Please double check your password.",
        details: null,
      });
    }
    const token = await foundUser.generateToken();
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 900000000,
      secure: false,
    });
    res.cookie("isUserLoggedIn", 1, {
      httpOnly: false,
      maxAge: 900000000,
      secure: false,
    });
    return res
      .status(200)
      .send({ success: true, message: "Login successful.", details: null });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("isUserLoggedIn");
    res.clearCookie("jwt");
    return res.status(200).send({
      success: true,
      message: "Logged out successfully",
      details: null,
    });
  } catch (error) {
    res.clearCookie("isUserLoggedIn");
    res.clearCookie("jwt");
    return res.status(500).send({
      success: false,
      message: "Logged out successfully",
      details: null,
    });
  }
};
