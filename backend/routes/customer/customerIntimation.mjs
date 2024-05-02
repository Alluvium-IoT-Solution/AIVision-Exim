import express from "express";
import schedule from "node-schedule";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import JobModel from "../../models/jobModel.mjs";
import Customer from "../../models/customer/customerModel.mjs";
dotenv.config();

const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API);
schedule.scheduleJob("*/10 * * * * *", async () => {
  try {
    // Calculate the date 3 days from now
    const today = new Date();
    const threeDaysFromNow = new Date(
      today.getTime() + 3 * 24 * 60 * 60 * 1000
    );

    // Find customers with importerURL
    const customers = await Customer.find({});

    // Iterate through each customer
    for (const customer of customers) {
      // Iterate through each user in the customer's document
      for (const user of customer.user) {
        // Find jobs related to the user's importerURL with detention dates within the next 3 days
        const jobs = await JobModel.find({
          importerURL: customer.importerURL,
          "container_nos.detention_from": {
            $lte: threeDaysFromNow.toISOString(), // Find detention dates before or equal to threeDaysFromNow
          },
        });

        // Iterate through each job
        for (const job of jobs) {
          // Iterate through each container in the job
          for (const container of job.container_nos) {
            // Check if the detention date is within the next 3 days and in the future
            const detentionDate = new Date(container.detention_from);
            if (detentionDate <= threeDaysFromNow && detentionDate >= today) {
              // Send email notification to user's email
              const msg = {
                to: user.email, // Access the email from the user object
                from: "helpdesk@alluvium.in", // Change this to the sender's email address
                subject: "Detention Date Reminder",
                text: `Reminder: The detention date for container ${container.container_number} is approaching on ${container.detention_from}.`,
              };

              // await sgMail.send(msg);
              console.log(msg);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
});

export default router;
