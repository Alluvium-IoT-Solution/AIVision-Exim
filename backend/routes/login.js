const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/api/login", async (req, res) => {
  const { email, password, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not registered" });
    }

    bcrypt.compare(password, user.password, (passwordErr, passwordResult) => {
      if (passwordErr) {
        console.error(passwordErr);
        return res.json({ message: "Something went wrong" });
      }

      if (passwordResult) {
        // Password matched, now compare OTP
        if (otp === user.otp) {
          // OTP matched as well
          const token = jwt.sign(
            {
              email: user.email,
            },
            process.env.SECRET_KEY
          );

          user.otp = undefined;
          user.save();

          return res.json({
            message: "Login Successful",
            user: token,
            username: user.username,
            email: user.email,
            role: user.role,
            importers: user.importers,
          });
        } else {
          return res.json({ message: "OTP didn't match" });
        }
      } else {
        return res.json({ message: "Password didn't match" });
      }
    });
  } catch (err) {
    console.error(err);
    return res.json({ message: "Something went wrong" });
  }
});

module.exports = router;
