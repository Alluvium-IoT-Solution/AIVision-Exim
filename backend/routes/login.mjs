import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.mjs";
import jwt from "jsonwebtoken";

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
        const token = jwt.sign(
          {
            email: user.email,
          },
          "rNgvq7ZjPkxiwhuT"
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

        return res.json({ message: "OTP didn't match" });
      } else {
        return res.json({ message: "Password didn't match" });
      }
    });
  } catch (err) {
    console.error(err);
    return res.json({ message: "Something went wrong" });
  }
});

export default router;
