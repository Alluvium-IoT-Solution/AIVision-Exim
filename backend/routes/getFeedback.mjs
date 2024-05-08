import express from "express";
import FeedbackModel from "../models/feedbackModel.mjs";

const router = express.Router();

router.get("/api/getFeedback", async (req, res) => {
  const data = await FeedbackModel.find({});
  res.send(data);
});

export default router;
