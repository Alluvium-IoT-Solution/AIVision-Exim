import express from "express";
import JobModel from "../../models/jobModel.mjs";

const router = express.Router();

router.get("/api/getJobs", async (req, res) => {
  try {
    // Aggregate to filter containers with transporter === "SRCC" for each job
    const jobs = await JobModel.aggregate([
      {
        $match: {
          "container_nos.transporter": "SRCC",
        },
      },
      {
        $project: {
          job_no: 1,
          pr_no: 1,
          pr_date: 1,
          importer: 1,
          container_count: 1,
          gross_weight: 1,
          shipping_line_airline: 1,
          do_validity: 1,
          be_no: 1,
          be_date: 1,
          consignor: 1,
          consignee: 1,
          type_of_vehicle: 1,
          description_srcc: 1,
          container_loading: 1,
          container_offloading: 1,
          instructions: 1,
          goods_pickup: 1,
          goods_delivery: 1,
          containers: {
            $filter: {
              input: "$container_nos",
              as: "container",
              cond: { $eq: ["$$container.transporter", "SRCC"] },
            },
          },
        },
      },
      {
        $unwind: "$containers",
      },
      {
        $project: {
          job_no: 1,
          pr_no: 1,
          pr_date: 1,
          consignor: 1,
          consignee: 1,
          type_of_vehicle: 1,
          description_srcc: 1,
          container_loading: 1,
          container_offloading: 1,
          instructions: 1,
          goods_pickup: 1,
          goods_delivery: 1,
          importer: 1,
          container_count: 1,
          gross_weight: 1,
          shipping_line_airline: 1,
          do_validity: 1,
          be_no: 1,
          be_date: 1,
          container_number: "$containers.container_number",
          transporter: "$containers.transporter",
          size: "$containers.size",
        },
      },
    ]);
    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
