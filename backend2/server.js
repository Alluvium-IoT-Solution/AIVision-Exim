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
