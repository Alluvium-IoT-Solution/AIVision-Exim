import mongoose from "mongoose";
import feedbackSchema from "../schemas/feedbackSchema.mjs";

const FeedbackModel = new mongoose.model("feedback", feedbackSchema);
export default FeedbackModel;
