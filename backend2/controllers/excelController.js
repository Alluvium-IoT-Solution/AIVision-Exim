const multer = require("multer");
const nodemailer = require("nodemailer");

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("excelFile");

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "73a3882da8e640",
    pass: "ce45760b0b4939",
  },
});

// API endpoint for receiving the Excel file
exports.uploadExcel = (req, res) => {
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

    // Send email with the Excel file as an attachment
    try {
      await transporter.sendMail({
        from: "abc@example.com",
        to: "sameery.020@gmail.com",
        subject: "Excel File Attachment",
        text: "Please find the attached Excel file.",
        attachments: [
          {
            filename: req.file.originalname,
            content: excelBuffer,
          },
        ],
      });

      return res.status(200).json({ message: "Excel file sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send email." });
    }
  });
};
