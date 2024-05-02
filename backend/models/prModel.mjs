import mongoose from "mongoose";
import prSchema from "../schemas/prSchema.mjs";

const Pr = new mongoose.model("Pr", prSchema);
export default Pr;
