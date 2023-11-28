import express from "express";
import schedule from "node-schedule";
import sgMail from "@sendgrid/mail";
import User from "../models/userModel.mjs";
import JobModel from "../models/jobModel.mjs"; // Assuming this is your Job model
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API);

// schedule.scheduleJob("*/10 * * * * *", async () => {
schedule.scheduleJob("00 22 * * */1", async () => {
  try {
    // Fetch all users and their importer URLs
    const users = await User.find({});

    // Iterate through users
    for (const user of users) {
      const userEmail = user.email;

      const importerURLs = user.importers.map(
        (importer) => importer.importerURL
      );

      // Get today's date and calculate two days from now
      const today = new Date();
      const twoDaysFromNow = new Date(today);
      twoDaysFromNow.setDate(today.getDate() + 2);

      // Format dates to compare with the schema
      const todayFormatted = today.toISOString().split("T")[0];
      const twoDaysFromNowFormatted = twoDaysFromNow
        .toISOString()
        .split("T")[0];

      const convertToDate = (dateString) => {
        const months = {
          Jan: "01",
          Feb: "02",
          Mar: "03",
          Apr: "04",
          May: "05",
          Jun: "06",
          Jul: "07",
          Aug: "08",
          Sep: "09",
          Oct: "10",
          Nov: "11",
          Dec: "12",
        };
        const [day, month, year] = dateString.split("-");

        const fullYear = parseInt(year, 10) <= 29 ? `20${year}` : `19${year}`;
        return new Date(`${fullYear}-${months[month]}-${day}`);
      };

      // Query jobs with matching importer URLs and specific conditions
      const pendingJobsInitial = await JobModel.find({
        importerURL: { $in: importerURLs },
        $or: [{ be_no: { $exists: false, $in: [null, ""] } }, { be_no: "--" }],
        vessel_berthing_date: {
          $exists: true,
          $ne: "",
          $nin: ["Invalid-Date"],
        },
      });

      const pendingJobs = pendingJobsInitial.filter((job) => {
        const vesselBerthingDate = convertToDate(job.vessel_berthing_date);
        return (
          vesselBerthingDate >= today && vesselBerthingDate <= twoDaysFromNow
        );
      });

      // Filter jobs for this user meeting the conditions
      const userPendingJobs = pendingJobs.filter((job) =>
        importerURLs.includes(job.importerURL)
      );

      //   If there are pending jobs for this user, prepare and send an email
      if (userPendingJobs.length > 0) {
        const jobNumbers = userPendingJobs.map((job) => job.job_no).join(", ");

        const msg = {
          to: { userEmail },
          from: "manu@surajforwarders.com",
          subject: "Pending Bill of Entry Filing",
          text: `Your bill of entry filing is pending for job numbers: ${jobNumbers}. Please take necessary action.`,
        };

        sgMail
          .send(msg)
          .then(() => console.log(`Email sent to ${userEmail}`))
          .catch((error) =>
            console.error(
              `Error sending email to ${userEmail}:`,
              error.toString()
            )
          );
      }
    }
  } catch (error) {
    console.error(error);
  }
});

export default router;
