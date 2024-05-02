import mongoose from "mongoose";
import trSchema from "../schemas/tr.mjs";

const Tr = new mongoose.model("Tr", trSchema);
export default Tr;
