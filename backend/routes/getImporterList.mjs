import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/getImporterList", async (req, res) => {
  try {
    const importers = await JobModel.find({}, { importerName: 1, importer: 1 });

    const importerList = importers.map((importer) => ({
      importerName: importer.importerName,
      importer: importer.importer,
    }));

    res.status(200).json(importerList);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching importers.");
  }
});

export default router;
