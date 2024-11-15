const User = require("../models/User.Models");
const { createSecretToken } = require("../utils/Secret.Token");
const bcrypt = require("bcrypt");

const Signup = async (req, res, next) => {
  try {
    const { email, username, password, createdAt } = req.body;

    //check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!email || !username || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const newUser = await User.create({
      email,
      username,
      password,
      createdAt,
    });
    const token = createSecretToken(newUser._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User created successfully", success: true, newUser });
    next();
  } catch (err) {
    console.log(err);
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true, // Set to false so JavaScript can access the cookie
      secure: false, // Set to true if using HTTPS
      sameSite: "Lax", // Set based on your cross-origin requirements
      path: "/", // Ensure the cookie is accessible everywhere
    });
    res.status(200).json({ message: "Login successful", success: true });
    next();
  } catch (err) {
    console.log(err);
  }
};

const Logout = async (req, res) => {
  res.clearCookie("token", {
    path: "/",
    sameSite: "Lax",
    secure: false,
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { Signup, Login, Logout };
