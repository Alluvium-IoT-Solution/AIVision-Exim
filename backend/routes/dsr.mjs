import express from "express";
const router = express.Router();
import JobModel from "../models/jobModel.mjs";

router.get("/api/dsr/:year/:importerURL", async (req, res) => {
  try {
    const { year, importerURL } = req.params;
    const formattedStatus = "Pending";

    // Create a query object with year and importerURL criteria
    const query = {
      year,
      importerURL,
      status: formattedStatus,
    };
    console.log(query);
    // Query the database based on the criteria in the query object
    const jobs = await JobModel.find(query).select(
      "job_no job_date supplier_exporter invoice_number invoice_date awb_bl_no awb_bl_date commodity no_of_pkgs net_weight loading_port free_time container_nos transporter remarks detailed_status"
    );

    // Sort jobs based on detailed_status priority or move empty detailed_status to the end
    jobs.sort((a, b) => {
      const statusPriority = {
        "Custom Clearance Completed": 1,
        "BE Noted, Clearance Pending": 2,
        "BE Noted, Arrival Pending": 3,
        Discharged: 4,
        "Gateway IGM Filed": 5,
        "Estimated Time of Arrival": 6,
      };

      const statusA = a.detailed_status;
      const statusB = b.detailed_status;

      if (statusA === "" && statusB === "") {
        // If both have empty detailed_status, keep their relative order
        return 0;
      } else if (statusA === "") {
        // Put empty detailed_status at the end
        return 1;
      } else if (statusB === "") {
        // Put empty detailed_status at the end
        return -1;
      } else {
        // Use the priority values for sorting non-empty detailed_status
        return statusPriority[statusA] - statusPriority[statusB];
      }
    });

    res.send(jobs);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
