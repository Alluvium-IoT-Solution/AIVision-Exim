import * as xlsx from "xlsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiRoutes } from "../utils/apiRoutes";
import { useState } from "react";

function useFileUpload(inputRef) {
  const [snackbar, setSnackbar] = useState(false);
  const navigate = useNavigate();
  const { addJobAPI } = apiRoutes();
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = handleFileRead;
    reader.readAsBinaryString(file);
  };

  const handleFileRead = (event) => {
    const content = event.target.result;
    const workbook = xlsx.read(content, { type: "binary" });

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(worksheet, {
      raw: false,
      defval: "", // provide an empty string to those cells, which have no content in them
    });

    // Convert the object keys to lowercase, and in the desired format
    function modifyKeys(data) {
      const convertedData = [];

      for (let i = 0; i < data.length; i++) {
        const modifiedObject = {};

        for (let key in data[i]) {
          let modifiedKey = key
            .toLowerCase()
            .replace(/ /g, "_") // replace spaces with underscores
            .replace(/\./g, "") // replace dots with nothing
            .replace(/\//g, "_") // replace slashes with underscores
            .replace(/-/g, ""); // replace dashes with nothing

          modifiedObject[modifiedKey] = data[i][key];
        }

        convertedData.push(modifiedObject);
      }

      return convertedData;
    }

    const convertedData = modifyKeys(jsonData);

    const importerData = [];

    // Combine all data from an importer
    convertedData.forEach((item) => {
      const importerName = item.importer;

      // Check if the importer already exists in the importerData array
      const existingImporter = importerData.find(
        (importer) =>
          importer.importer ===
          importerName
            .toLowerCase()
            .replace(/ /g, "_") // replace spaces with underscores
            .replace(/\./g, "") // replace dots with nothing
            .replace(/\//g, "_") // replace slashes with underscores
            .replace(/-/g, "") // replace dashes with nothing
            .replace(/_+/g, "_") // replace underscores with nothing
            .replace(/\(/g, "") // replace ( with nothing
            .replace(/\)/g, "") // replace ) with nothing
            .replace(/\[/g, "") // replace [ with nothing
            .replace(/\]/g, "") // replace ] with nothing
            .replace(/,/g, "") // replace , with nothing
      );

      // If the importer already exists, push the item to its data array
      if (existingImporter) {
        existingImporter.data.push(item);
      } else {
        // If the importer doesn't exist, create a new importer object and add it to the importerData array
        const newImporter = {
          importer: importerName
            .toLowerCase()
            .replace(/ /g, "_") // replace spaces with underscores
            .replace(/\./g, "") // replace dots with nothing
            .replace(/\//g, "_") // replace slashes with underscores
            .replace(/-/g, "") // replace dashes with nothing
            .replace(/_+/g, "_") // replace underscores with nothing
            .replace(/\(/g, "") // replace ( with nothing
            .replace(/\)/g, "") // replace ) with nothing
            .replace(/\[/g, "") // replace [ with nothing
            .replace(/\]/g, "") // replace ] with nothing
            .replace(/,/g, ""), // replace , with nothing
          data: [item],
        };
        importerData.push(newImporter);
      }
    });

    // Combine multiple container numbers and theri data into an array
    function handleMultipleContainers(data) {
      const convertedData = data.map((entry) => {
        const newData = entry.data.map((item) => {
          const containerNumbers = item.container_nos.split(",");
          const size = item.no_of_container.split(",");
          const onlySize = size[0];

          const containerData = [];

          for (let i = 0; i < containerNumbers.length; i++) {
            const containerObj = {
              container_number: containerNumbers[i],
            };
            containerData.push(containerObj);
          }

          return {
            ...item,
            job_no: item.job_no.match(/\/(\d+)\/[^/]*$/)[1], // extract desired part from job number
            container_nos: containerData,
          };
        });

        return {
          importer: entry.importer
            .toLowerCase()
            .replace(/ /g, "_") // replace spaces with underscores
            .replace(/\./g, "") // replace dots with nothing
            .replace(/\//g, "_") // replace slashes with underscores
            .replace(/-/g, "") // replace dashes with nothing
            .replace(/_+/g, "_") // replace underscores with nothing
            .replace(/\(/g, "") // replace ( with nothing
            .replace(/\)/g, "") // replace ) with nothing
            .replace(/\[/g, "") // replace [ with nothing
            .replace(/\]/g, "") // replace ] with nothing
            .replace(/,/g, ""), // replace , with nothing

          data: newData,
        };
      });

      return convertedData;
    }

    const data = handleMultipleContainers(importerData);

    // Set file to null so that same file can be selected again
    if (inputRef.current) {
      inputRef.current.value = null;
    }

    // Upload data to db
    async function uploadExcelData() {
      setLoading(true);
      const res = await axios.post(addJobAPI, data);
      if (res.data === "Jobs added successfully") {
        setSnackbar(true); // show snackbar
      } else {
        alert("Something went wrong");
      }
      setLoading(false);
      navigate("/importer");
    }

    uploadExcelData();
  };

  // Hide snackbar after 2 seconds
  setTimeout(() => {
    setSnackbar(false);
  }, 2000);

  return { handleFileUpload, snackbar, loading };
}

export default useFileUpload;
