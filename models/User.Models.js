const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please add your email address"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(); // Generate salt
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next();
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
