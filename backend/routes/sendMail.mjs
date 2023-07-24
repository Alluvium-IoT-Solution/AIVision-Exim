// import express from "express";
// import multer from "multer";

// const router = express.Router();
// const upload = multer({ dest: "uploads/" }); // Set the destination folder for uploaded files

// router.post("/api/send-mail", upload.single("file"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }

//   // At this point, the file is saved in the 'uploads/' folder with a temporary name
//   // You can now process the file (e.g., read, parse, save to database, etc.)

//   // Replace the following with your desired file processing logic
//   console.log("Uploaded file:", req.file);

//   // Respond with success message
//   res.json({ message: "File uploaded successfully" });
// });

// export default router;

import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder where the uploaded files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueFileName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueFileName); // Set a unique filename for the uploaded file
  },
});

const fileFilter = (req, file, cb) => {
  // Only allow certain file types, for example, image and pdf files
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image and pdf files are allowed."), false);
  }
};

const upload = multer({ storage, fileFilter });

// POST route to handle file upload
router.post("/send-mail", upload.single("file"), (req, res) => {
  try {
    // At this point, the file has been uploaded and stored in the 'uploads/' folder
    // You can now process the file, send an email, or perform any other action here

    // Assuming the processed file's download URL is 'http://localhost:9002/api/download-file/filename.ext'
    // Replace 'filename.ext' with the actual filename and extension

    const downloadURL = `http://localhost:9002/api/download-file/${req.file.filename}`;
    res.json({ fileURL: downloadURL });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing the file." });
  }
});

export default router;
