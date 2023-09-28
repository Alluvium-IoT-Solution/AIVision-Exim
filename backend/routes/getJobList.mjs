import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get(
  "/api/:year/:importerURL/jobs/:status/:pageNo/:filterText",
  async (req, res) => {
    try {
      const { year, importerURL, status, pageNo, filterText } = req.params;
      const itemsPerPage = 25; // Number of items to show per page
      const skip = (pageNo - 1) * itemsPerPage;

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

      // Check if filterText is provided and not empty
      if (filterText && filterText.trim() !== "all") {
        // Add a condition to filter by job_no containing filterText
        query.job_no = { $regex: filterText, $options: "i" }; // Case-insensitive matching
      }

      // Query the database based on the criteria in the query object
      // const jobs = await JobModel.find(query).skip(skip).limit(itemsPerPage);
      let jobs = await JobModel.find(query);

      // Sort the jobs by arrival date using the custom sorting function
      jobs = jobs.sort(sortArrivalDate);

      // Sort the sorted jobs by ETA using the custom sorting function
      jobs = jobs.sort(sortETA);

      // Calculate the total count of matching documents
      const total = await JobModel.countDocuments(query);

      function sortArrivalDate(a, b) {
        // Helper function to parse date strings into Date objects
        function parseDate(dateString) {
          const parts = dateString.split("-");
          return new Date(parts[0], parts[1] - 1, parts[2]);
        }

        // Extract the arrival dates from each job item
        const arrivalDatesA = a.container_nos.map(
          (container) => container.arrival_date
        );
        const arrivalDatesB = b.container_nos.map(
          (container) => container.arrival_date
        );

        // Filter out empty arrival dates
        const validArrivalDatesA = arrivalDatesA.filter((date) => date);
        const validArrivalDatesB = arrivalDatesB.filter((date) => date);

        // If there are valid arrival dates in both job items, compare the earliest dates
        if (validArrivalDatesA.length > 0 && validArrivalDatesB.length > 0) {
          const earliestDateA = new Date(
            Math.min(...validArrivalDatesA.map(parseDate))
          );
          const earliestDateB = new Date(
            Math.min(...validArrivalDatesB.map(parseDate))
          );

          // Compare the dates as Date objects
          if (earliestDateA < earliestDateB) {
            return -1;
          } else if (earliestDateA > earliestDateB) {
            return 1;
          } else {
            return 0;
          }
        }

        // If only one job item has valid arrival dates, it comes first
        if (validArrivalDatesA.length > 0) {
          return -1;
        }
        if (validArrivalDatesB.length > 0) {
          return 1;
        }

        // If neither job item has valid arrival dates, leave them in their original order
        return 0;
      }

      function sortETA(a, b) {
        // Helper function to parse date strings into Date objects
        function parseDate(dateString) {
          const parts = dateString.split("-");
          return new Date(parts[0], parts[1] - 1, parts[2]);
        }

        // Extract the arrival dates from each job item
        const etaA = a.container_nos.map((container) => container.arrival_date);
        const etaB = b.container_nos.map((container) => container.arrival_date);

        // Filter out empty arrival dates
        const validEtaA = etaA.filter((date) => date);
        const validEtaB = etaB.filter((date) => date);

        // If there are valid arrival dates in both job items, compare the earliest dates
        if (validEtaA.length > 0 && validEtaB.length > 0) {
          const earliestDateA = new Date(Math.min(...validEtaA.map(parseDate)));
          const earliestDateB = new Date(Math.min(...validEtaB.map(parseDate)));

          // Compare the dates as Date objects
          if (earliestDateA < earliestDateB) {
            return -1;
          } else if (earliestDateA > earliestDateB) {
            return 1;
          } else {
            return 0;
          }
        }

        // If only one job item has valid arrival dates, it comes first
        if (validEtaA.length > 0) {
          return -1;
        }
        if (validEtaB.length > 0) {
          return 1;
        }

        // If neither job item has valid arrival dates, leave them in their original order
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
