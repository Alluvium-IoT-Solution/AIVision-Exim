import express from "express";
import User from "../models/userModel.mjs";
import schedule from "node-schedule";
import sgMail from "@sendgrid/mail";

const router = express.Router();
sgMail.setApiKey(process.env.SENDGRID_API);

const removeOTP = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      user.changePasswordOtp = null; // Remove OTP
      await user.save();
    }
  } catch (error) {
    console.error(`Error removing OTP: ${error}`);
  }
};

router.post("/api/sendChangePasswordOtp", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not registered" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.changePasswordOtp = otp;
    await user.save();

    // Schedule OTP removal after 5 minutes
    schedule.scheduleJob(`*/5 * * * *`, () => {
      removeOTP(user._id);
    });

    const msg = {
      to: email,
      from: "manu@surajforwarders.com",
      subject: "OTP to change password for EXIM",
      text: `${otp} is the OTP to change password for your EXIM account.`,
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

export default router;
