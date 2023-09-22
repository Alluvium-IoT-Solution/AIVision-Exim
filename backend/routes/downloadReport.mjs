import express from "express";
const router = express.Router();
import JobModel from "../models/jobModel.mjs";

router.get(
  "/api/downloadReport/:year/:importerURL/:status",
  async (req, res) => {
    try {
      const { year, importerURL, status } = req.params;
      const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

      // Create a query object with year and importerURL criteria
      const query = {
        year,
        importerURL,
        status: formattedStatus,
      };

      // Query the database based on the criteria in the query object
      const jobs = await JobModel.find(query);

      // Sort the jobs in ascending order based on the eta field (if available)
      jobs.sort((a, b) => {
        // Handle cases where one or both documents don't have an eta field
        if (!a.eta && !b.eta) {
          return 0; // Both documents don't have an eta field, no preference
        }
        if (!a.eta) {
          return 1; // Put b before a because a doesn't have an eta
        }
        if (!b.eta) {
          return -1; // Put a before b because b doesn't have an eta
        }

        // Both documents have an eta field, compare them as Date objects
        const etaA = new Date(a.eta);
        const etaB = new Date(b.eta);
        return etaA - etaB;
      });

      res.send(jobs);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default router;
