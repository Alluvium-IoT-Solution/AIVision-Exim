import express from "express";
import PrData from "../../models/pr.mjs";

const router = express.Router();

router.post("/api/getContainers/", async (req, res) => {
  const { pr_no } = req.body;
  try {
    const job = await PrData.findOne({ pr_no }).sort({ _id: -1 });

    res.status(200).send(job);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
