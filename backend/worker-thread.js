import { parentPort } from "worker_threads";
import express from "express";
import cors from "cors";
import compression from "compression";
import JobModel from "./models/jobModel.mjs";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());

// Example route handler
app.get("/", async (req, res) => {
  const jobs = await JobModel.find({});
  res.status(201).send(jobs);
});

// Listen for messages from the main thread
parentPort.on("message", (message) => {
  console.log("Message received from main thread:", message);
});

// Send a message to the main thread
parentPort.postMessage("Message from worker thread");

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Worker thread listening on port ${PORT}`);
});
