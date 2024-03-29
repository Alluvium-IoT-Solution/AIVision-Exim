import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get(
  "/api/:year/:importerURL/jobs/:status/:detailedStatus",
  async (req, res) => {
    try {
      const { year, importerURL, status, detailedStatus } = req.params;

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

      // Match the detailed status stored in db
      if (detailedStatus !== "all") {
        if (detailedStatus === "estimated_time_of_arrival") {
          query.detailed_status = "Estimated Time of Arrival";
        }
        if (detailedStatus === "discharged") {
          query.detailed_status = "Discharged";
        }
        if (detailedStatus === "gateway_igm_filed") {
          query.detailed_status = "Gateway IGM Filed";
        }
        if (detailedStatus === "be_noted_arrival_pending") {
          query.detailed_status = "BE Noted, Arrival Pending";
        }
        if (detailedStatus === "be_noted_clearance_pending") {
          query.detailed_status = "BE Noted, Clearance Pending";
        }
        if (detailedStatus === "custom_clearance_completed") {
          query.detailed_status = "Custom Clearance Completed";
        }
      }

      // Query the database and select relevant fields for sorting
      let jobs;

      if (detailedStatus === "estimated_time_of_arrival") {
        console.log(query);
        jobs = await JobModel.find(query).select(
          "job_no custom_house awb_bl_no container_nos vessel_berthing_date remarks detailed_status be_no be_date transporter"
        );
      } else if (detailedStatus === "discharged") {
        jobs = await JobModel.find(query).select(
          "job_no custom_house awb_bl_no container_nos discharge_date remarks detailed_status be_no be_date transporter"
        );
      } else if (detailedStatus === "gateway_igm_filed") {
        jobs = await JobModel.find(query).select(
          "job_no custom_house awb_bl_no container_nos vessel_berthing_date remarks detailed_status be_no be_date transporter"
        );
      } else if (detailedStatus === "be_noted_arrival_pending") {
        jobs = await JobModel.find(query).select(
          "job_no custom_house be_no be_date transporter container_nos vessel_berthing_date remarks detailed_status be_no be_date transporter"
        );
      } else if (detailedStatus === "be_noted_clearance_pending") {
        jobs = await JobModel.find(query).select(
          "job_no custom_house be_no be_date transporter container_nos remarks detailed_status be_no be_date transporter"
        );
      } else if (detailedStatus === "custom_clearance_completed") {
        jobs = await JobModel.find(query).select(
          "job_no custom_house be_no be_date transporter container_nos out_of_charge remarks detailed_status be_no be_date transporter"
        );
      } else {
        jobs = await JobModel.find(query).select(
          "job_no custom_house awb_bl_no container_nos vessel_berthing_date remarks detailed_status be_no be_date transporter"
        );
      }

      // Apply the provided sorting logic to the jobs array
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

        // If detailed_status is empty, move job to the bottom
        if (!statusA && !statusB) {
          return 0;
        } else if (!statusA) {
          return 1;
        } else if (!statusB) {
          return -1;
        }

        // Compare based on priority if both have detailed_status
        const priorityDiff = statusPriority[statusA] - statusPriority[statusB];
        if (priorityDiff !== 0) {
          return priorityDiff;
        }

        // If priorities are the same, maintain relative order
        return 0;
      });

      // Calculate the total count of matching documents
      const total = await JobModel.countDocuments(query);

      res.send({ data: jobs, total });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default router;
