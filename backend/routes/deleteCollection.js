import express from "express";
import { MongoClient } from "mongodb";

const router = express.Router();

// DELETE route for deleting a collection
router.delete("/api/deleteCollection/:collectionName", async (req, res) => {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = client.db("exim");
    const collectionName = req.params.collectionName;

    await db.dropCollection(collectionName);

    client.close();
    console.log(`Collection ${collectionName} deleted successfully.`);

    res.status(200).json({
      message: `Collection ${collectionName} deleted successfully.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
