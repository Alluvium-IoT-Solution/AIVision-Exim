const express = require("express");
const User = require("../models/userModel.js");
const schedule = require("node-schedule");
const sgMail = require("@sendgrid/mail");

const router = express.Router();
// sgMail.setApiKey(process.env.SENDGRID_API);
sgMail.setApiKey(
  "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"
);

const removeOTP = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      user.otp = null; // Remove OTP
      await user.save();
    }
  } catch (error) {
    console.error(`Error removing OTP: ${error}`);
  }
};

router.post("/api/sendOtp", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not registered" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
    await user.save();

    // Schedule OTP removal after 2 minutes
    schedule.scheduleJob(`*/2 * * * *`, () => {
      removeOTP(user._id);
    });

    const msg = {
      to: email,
      from: "manu@surajforwarders.com",
      subject: "OTP for login to EXIM",
      text: `${otp} is the OTP to login to your EXIM account.`,
    };

    try {
      // Send the email
      await sgMail.send(msg);
      console.log("OTP sent successfully");
    } catch (error) {
      console.error(`Error sending email`, error);
    }

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
