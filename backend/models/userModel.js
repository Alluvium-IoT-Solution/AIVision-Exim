const mongoose = require("mongoose");
const userSchema = require("../schemas/userSchema.js");

const User = new mongoose.model("User", userSchema);
module.exports = User;
