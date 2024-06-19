import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mailListener from "mail-listener2";
import xlsx from "xlsx";
import axios from "axios";

dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "100mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression({ level: 9 }));

mongoose.set("strictQuery", true);

mongoose
  .connect(
    // "mongodb://localhost:27017/exim",
    "mongodb+srv://exim:qTT7e4YeE3YSSMiV@aivision.pxmpvlz.mongodb.net/exim?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      minPoolSize: 10,
      maxPoolSize: 1000,
    }
  )
  .then(() => {
    // const mailListenerConfig = {
    //   username: "sameery.020@gmail.com",
    //   password: "leeh qwzs tpbi exsi",
    //   host: "imap.gmail.com",
    //   port: 993,
    //   tls: true,
    //   tlsOptions: { rejectUnauthorized: false },
    //   mailbox: "INBOX",
    //   markSeen: true,
    //   fetchUnreadOnStart: true,
    //   connTimeout: 30000,
    //   authTimeout: 30000,
    // };

    const mailListenerConfig = {
      username: "cloud@novusha.com",
      password: "ahys qfck hgvz lboy",
      host: "imap.gmail.com",
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      mailbox: "INBOX",
      markSeen: true,
      fetchUnreadOnStart: true,
      connTimeout: 30000,
      authTimeout: 30000,
    };

    const watchEmailAddresses = [
      "info@surajforwarders.com",
      "manu@surajforwarders.com",
      "sreekumar@surajforwarders.com",
      "praveena@surajforwarders.com",
      "ravi@surajforwarders.com",
      "import@surajforwarders.com",
      "pramod@surajforwarders.com",
      "rathodbs@surajforwarders.com",
      "deepu@surajforwarders.com",
      "sameer.y020@gmail.com",
      "helpdesk@alluvium.in",
    ];

    const startMailListener = async () => {
      const mailListenerInstance = new mailListener(mailListenerConfig);

      mailListenerInstance.on("error", (error) => {
        setTimeout(startMailListener, 1000);
      });

      mailListenerInstance.start();

      let jsonData1 = [];
      let jsonData2 = [];

      mailListenerInstance.on("mail", async (mail) => {
        if (watchEmailAddresses.includes(mail.from[0].address)) {
          if (mail.attachments && mail.attachments.length > 0) {
            const mergedData = [];
            for (const attachment of mail.attachments) {
              if (
                attachment.contentType ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              ) {
                try {
                  const workbook = xlsx.read(attachment.content, {
                    type: "buffer",
                  });
                  const sheetName = workbook.SheetNames[0];
                  let jsonData;
                  if (attachment.fileName.includes("Register")) {
                    jsonData = xlsx.utils.sheet_to_json(
                      workbook.Sheets[sheetName],
                      { range: 2 }
                    );
                  } else if (attachment.fileName.includes("Containers")) {
                    jsonData = xlsx.utils.sheet_to_json(
                      workbook.Sheets[sheetName]
                    );
                  }

                  const modifiedData = jsonData.map((item) => {
                    const modifiedItem = {};
                    for (const key in item) {
                      if (Object.hasOwnProperty.call(item, key)) {
                        let modifiedKey = key
                          .toLowerCase()
                          .replace(/\s+/g, "_")
                          .replace(/[^\w\s]/gi, "_")
                          .replace(/\//g, "_");

                        if (
                          [
                            "job_date",
                            "invoice_date",
                            "be_date",
                            "igm_date",
                            "gateway_igm_date",
                            "out_of_charge",
                            "awb_bl_date",
                          ].includes(modifiedKey)
                        ) {
                          const date = new Date(item[key]);
                          if (!isNaN(date.getTime())) {
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(
                              2,
                              "0"
                            );
                            const day = String(date.getDate()).padStart(2, "0");
                            modifiedItem[
                              modifiedKey
                            ] = `${year}-${month}-${day}`;
                          } else {
                            modifiedItem[modifiedKey] = item[key];
                          }
                        } else if (modifiedKey === "job_no") {
                          const match = item[key].split("/");
                          modifiedItem.job_no = match[3];
                          modifiedItem.year = match[4];
                        } else if (modifiedKey === "importer") {
                          modifiedItem.importer = item[key];
                          modifiedItem.importerURL = item[key]
                            .toLowerCase()
                            .replace(/\s+/g, "_")
                            .replace(/[^\w]+/g, "")
                            .replace(/_/g, "_")
                            .replace(/_+/g, "_")
                            .replace(/^\_|\_$/g, "");
                        } else if (modifiedKey === "container_no") {
                          modifiedItem.container_nos = item[key];
                        } else if (modifiedKey === "awb_bl_no_") {
                          modifiedItem.awb_bl_no = item[key];
                        } else if (modifiedKey === "assbl__value") {
                          modifiedItem.assbl_value = item[key];
                        } else if (modifiedKey === "ex_rate") {
                          modifiedItem.exrate = item[key];
                        } else if (modifiedKey === "bill_no") {
                          modifiedItem.bill_no = item[key].split(",")[0];
                        } else if (modifiedKey === "bill_date") {
                          modifiedItem.bill_date = item[key].split(",")[0];
                        } else if (
                          modifiedKey !== "noofconts" &&
                          modifiedKey !== "noofcontsbytype" &&
                          modifiedKey !== "container_nos_"
                        ) {
                          modifiedItem[modifiedKey] = item[key];
                        }
                      }
                    }
                    return modifiedItem;
                  });

                  if (jsonData1.length === 0) {
                    jsonData1 = modifiedData;
                  } else {
                    jsonData2 = modifiedData;

                    const jobNos1 = new Set(
                      jsonData1.map((item) => item.job_no)
                    );
                    const jobNos2 = new Set(
                      jsonData2.map((item) => item.job_no)
                    );

                    const commonJobNos = [...jobNos1].filter((jobNo) =>
                      jobNos2.has(jobNo)
                    );

                    commonJobNos.forEach((jobNo) => {
                      const item1 = jsonData1.find(
                        (item) => item.job_no === jobNo
                      );
                      const item2 = jsonData2.find(
                        (item) => item.job_no === jobNo
                      );
                      const mergedItem = { ...item1, ...item2 };
                      mergedData.push(mergedItem);
                    });

                    const uniqueJobNos1 = [...jobNos1].filter(
                      (jobNo) => !jobNos2.has(jobNo)
                    );
                    uniqueJobNos1.forEach((jobNo) => {
                      const item = jsonData1.find(
                        (item) => item.job_no === jobNo
                      );
                      mergedData.push(item);
                    });

                    const uniqueJobNos2 = [...jobNos2].filter(
                      (jobNo) => !jobNos1.has(jobNo)
                    );
                    uniqueJobNos2.forEach((jobNo) => {
                      const item = jsonData2.find(
                        (item) => item.job_no === jobNo
                      );
                      mergedData.push(item);
                    });

                    mergedData.forEach((item) => {
                      if (item.container_nos) {
                        if (typeof item.container_nos === "string") {
                          item.container_nos = item.container_nos
                            .split(",")
                            .map((container) => ({
                              container_number: container.trim(),
                            }));
                        }
                      }
                    });

                    console.log(JSON.stringify(mergedData));

                    async function sendDataToAPI(mergedData) {
                      try {
                        const response = await axios.post(
                          "http://localhost:9002/api/jobs/addJob",
                          mergedData
                        );
                        console.log("Response from API:", response.data);
                      } catch (error) {
                        console.error("Error sending data to API:", error);
                      }
                    }

                    sendDataToAPI(mergedData);
                  }
                } catch (error) {
                  console.error("Excel file can not be converted to JSON");
                }
              } else {
                console.log("Attachment is not an excel file");
              }
            }
          } else {
            console.log("No attachments found in email");
          }
        } else {
          console.log(
            "Email is not from any email in watchEmailAddresses. Ignored."
          );
        }
      });
    };

    startMailListener();

    app.listen(8888, () => {
      console.log(`BE started at port 8888`);
    });
  })
  .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));
