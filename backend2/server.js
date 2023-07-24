// // server.js
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const multer = require("multer");
// const path = require("path");

// const app = express();
// const PORT = 9002; // You can choose any available port

// // Enable CORS
// app.use(cors());

// // Body parser middleware
// app.use(bodyParser.json());

// // backend/controllers/excelController.js
// const multer = require("multer");
// const nodemailer = require("nodemailer");

// // Configure multer to handle file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage }).single("excelFile"); // The field name should match the one used in the frontend

// // Create a nodemailer transport for sending emails
// const transporter = nodemailer.createTransport({
//   host: "smtp.example.com", // Replace with your email host
//   port: 587,
//   auth: {
//     user: "abc@example.com", // Replace with your dummy email ID
//     pass: "your_dummy_email_password", // Replace with your dummy email password
//   },
// });

// // API endpoint for receiving the Excel file
// exports.uploadExcel = (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ error: "Failed to upload Excel file." });
//     }

//     // Get the Excel file buffer from the request
//     const excelBuffer = req.file.buffer;

//     // Send email with the Excel file as an attachment
//     try {
//       await transporter.sendMail({
//         from: "abc@example.com",
//         to: "sameery.020@gmail.com",
//         subject: "Excel File Attachment",
//         text: "Please find the attached Excel file.",
//         attachments: [
//           {
//             filename: "your_file_name.xlsx", // Replace with the desired filename for the attachment
//             content: excelBuffer,
//           },
//         ],
//       });

//       return res.status(200).json({ message: "Excel file sent successfully!" });
//     } catch (error) {
//       console.error("Error sending email:", error);
//       return res.status(500).json({ error: "Failed to send email." });
//     }
//   });
// };

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// backend/server.js
const express = require("express");
const cors = require("cors");
const excelController = require("./controllers/excelController");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post("/api/upload-excel", excelController.uploadExcel);

const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
