import mongoose from "mongoose";
import prDataSchema from "../schemas/pr.mjs";

const PrData = new mongoose.model("PrData", prDataSchema);
export default PrData;
