import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get(
  "/api/:year/:importerURL/jobs/:status/:pageNo/:filterJobNumber/:detailedStatus",
  async (req, res) => {
    try {
      const {
        year,
        importerURL,
        status,
        pageNo,
        filterJobNumber,
        detailedStatus,
      } = req.params;
      const itemsPerPage = 25; // Number of items to show per page
      const skip = (pageNo - 1) * itemsPerPage;
      console.log(detailedStatus);

      // Create a query object with year and importerURL criteria
      const query = {
        year,
        importerURL,
      };

      // Convert the status parameter to title case (e.g., "pending" to "Pending")
      const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

      // Check if status is one of the specific values ("Pending", "Completed", "Canceled")
      if (
        formattedStatus === "Pending" ||
        formattedStatus === "Completed" ||
        formattedStatus === "Cancelled"
      ) {
        query.status = formattedStatus; // Filter by specific status
      }

      if (detailedStatus !== "all") {
        if (detailedStatus === "estimated_time_of_arrival") {
          query.detailedStatus = "Estimated Time of Arrival";
        }
        if (detailedStatus === "discharged") {
          query.detailedStatus = "Discharged";
        }
        if (detailedStatus === "gateway_igm_filed") {
          query.detailedStatus = "Gateway IGM Filed";
        }
        if (detailedStatus === "be_noted_arrival_pending") {
          query.detailedStatus = "BE Noted, Arrival Pending";
        }
        if (detailedStatus === "be_noted_clearance_pending") {
          query.detailedStatus = "BE Noted, Clearance Pending";
        }
        if (detailedStatus === "custom_clearance_completed") {
          query.detailedStatus = "Custom Clearance Completed";
        }
      }

      // Check if filterJobNumber is provided and not empty
      if (filterJobNumber.trim() !== "all" && filterJobNumber.trim() !== "") {
        // Add a condition to filter by job_no containing filterJobNumber
        query.job_no = { $regex: filterJobNumber, $options: "i" }; // Case-insensitive matching
      }

      // Query the database based on the criteria in the query object
      let jobs = await JobModel.find(query);

      if (detailedStatus === "estimated_time_of_arrival") {
        // Sort the sorted jobs by ETA using the custom sorting function
        jobs = jobs.sort(sortETA);
      }
      if (detailedStatus === "discharged") {
        // Sort the sorted jobs by discharge date using the custom sorting function
        jobs = jobs.sort(sortDischargeDate);
      }

      // Limit the results to 25 items after sorting
      jobs = jobs.slice(skip, skip + itemsPerPage);

      // Calculate the total count of matching documents
      const total = await JobModel.countDocuments(query);

      function sortETA(a, b) {
        // Helper function to parse date strings into Date objects
        function parseDate(dateString) {
          const parts = dateString.split("-");
          return new Date(parts[0], parts[1] - 1, parts[2]);
        }

        // Extract the eta field from each job item
        const etaA = a.eta;
        const etaB = b.eta;

        // If both job items have valid eta values, compare them as Date objects
        if (etaA && etaB) {
          const dateA = parseDate(etaA);
          const dateB = parseDate(etaB);

          // Compare the dates as Date objects
          if (dateA < dateB) {
            return -1;
          } else if (dateA > dateB) {
            return 1;
          } else {
            return 0;
          }
        }

        // If only one job item has a valid eta value, it comes first
        if (etaA) {
          return -1;
        }
        if (etaB) {
          return 1;
        }

        // If neither job item has a valid eta value, leave them in their original order
        return 0;
      }

      function sortDischargeDate(a, b) {
        // Helper function to parse date strings into Date objects
        function parseDate(dateString) {
          const parts = dateString.split("-");
          return new Date(parts[0], parts[1] - 1, parts[2]);
        }

        // Extract the eta field from each job item
        const discharge_date_A = a.discharge_date;
        const discharge_date_B = b.discharge_date;

        // If both job items have valid eta values, compare them as Date objects
        if (discharge_date_A && discharge_date_B) {
          const dateA = parseDate(discharge_date_A);
          const dateB = parseDate(discharge_date_B);

          // Compare the dates as Date objects
          if (dateA < dateB) {
            return -1;
          } else if (dateA > dateB) {
            return 1;
          } else {
            return 0;
          }
        }

        // If only one job item has a valid eta value, it comes first
        if (discharge_date_A) {
          return -1;
        }
        if (discharge_date_B) {
          return 1;
        }

        // If neither job item has a valid eta value, leave them in their original order
        return 0;
      }

      res.send({ data: jobs, total });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default router;
