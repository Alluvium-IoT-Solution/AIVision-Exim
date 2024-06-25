import express from "express";
import Pr from "../../models/pr.mjs";

const router = express.Router();

router.post("/api/viewAllLr", async (req, res) => {
  try {
    const { tr, branch, year } = req.body;
    const tr_no = `TR/${branch}/${tr}/${year}`;

    // Using aggregation to match the document and filter the containers array
    const result = await Pr.aggregate([
      { $match: { "containers.tr_no": tr_no } },
      {
        $project: {
          _id: 1,
          pr_no: 1,
          pr_date: 1,
          branch: 1,
          consignor: 1,
          consignee: 1,
          container_count: 1,
          containers: {
            $filter: {
              input: "$containers",
              as: "container",
              cond: { $eq: ["$$container.tr_no", tr_no] },
            },
          },
          __v: 1,
          description: 1,
          instructions: 1,
        },
      },
    ]);

    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).send("Document not found");
    }
  } catch (error) {
    console.error("Error retrieving LR data:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
