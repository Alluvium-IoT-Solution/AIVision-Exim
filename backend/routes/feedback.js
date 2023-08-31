const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");

// Set your SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API);

router.post("/api/feedback", async (req, res) => {
  try {
    const { email, title, description } = req.body.data;

    const msg = {
      to: "sameery.020@gmail.com", // Recipient's email
      from: email, // Sender's email (taken from req.body.data.email)
      subject: title, // Email subject (taken from req.body.data.title)
      text: description, // Plain text version of the email content (taken from req.body.data.description)
      html: `<p>${description}</p>`, // HTML version of the email content
    };

    await sgMail.send(msg);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the email" });
  }
});

module.exports = router;
