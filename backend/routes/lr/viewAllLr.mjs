import express from "express";
import Pr from "../../models/pr.mjs";

const router = express.Router();

router.post("/api/viewAllLr", async (req, res) => {
  try {
    const { pr_no } = req.body;

    // Query the database to get the documents matching the pr_no
    const prData = await Pr.find({ pr_no });

    // Map through the data to filter the containers
    const filteredData = prData.map((pr) => {
      const { consignor, consignee, instructions, description, containers } =
        pr;
      const filteredContainers = containers.filter(
        (container) => container.tr_no
      );

      return {
        consignor,
        consignee,
        instructions,
        description,
        containers: filteredContainers,
      };
    });

    res.json(filteredData);
  } catch (error) {
    console.error("Error retrieving LR data:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
