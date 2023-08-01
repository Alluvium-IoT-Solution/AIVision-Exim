import express from "express";
import multer from "multer";
import sgMail from "@sendgrid/mail";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("excelFile");

const sendgridAPIKey =
  "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";
sgMail.setApiKey(sendgridAPIKey);

router.post("/api/send-mail", async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: "Failed to upload Excel file." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file found in the request." });
    }

    // Get the Excel file buffer from the request
    const excelBuffer = req.file.buffer;
    console.log(req.file.originalname, req.file); // Log the file received

    // Send email with the Excel file as an attachment using SendGrid
    try {
      await sgMail
        .send({
          to: "sameery.020@gmail.com",
          from: "sameery.020@gmail.com",
          subject: "Excel File Attachment",
          text: "Please find the attached Excel file.",
          attachments: [
            {
              filename: req.file.originalname,
              content: excelBuffer.toString("base64"),
              type: req.file.mimetype,
              disposition: "attachment",
            },
          ],
        })
        .then(() => console.log("Email sent"));

      return res.status(200).json({ message: "Excel file sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send email." });
    }
  });
});

export default router;
