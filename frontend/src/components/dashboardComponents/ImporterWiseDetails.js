import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { apiRoutes } from "../../utils/apiRoutes";
import axios from "axios";
import { Col } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";

function ImporterWiseDetails(props) {
  const selectedYear = props.selectedYear;
  const [importerData, setImporterData] = useState([]);
  const [selectedImporter, setSelectedImporter] = useState(
    "LAXCON STEELS LIMITED - IMPORT"
  );
  const [data, setData] = useState([]);
  const { importerListAPI, importerJobsAPI } = apiRoutes();

  const importerNames = importerData.map((importer) => {
    return importer.importerName;
  });

  // Get importer list for MUI autocomplete
  useEffect(() => {
    async function getImporterList() {
      const res = await axios.get(`${importerListAPI}/${selectedYear}`);
      setImporterData(res.data);
    }
    getImporterList();
  }, [selectedYear]);

  // Set selected importer on autocomplete onChange
  const handleImporterChange = (event, selectedImporter) => {
    setSelectedImporter(selectedImporter);
  };

  // Fetch the details of the selected importer
  useEffect(() => {
    async function getImporterData(props) {
      const res = await axios.get(
        `${importerJobsAPI}/${selectedImporter
          .toLowerCase()
          .replace(/ /g, "_")
          .replace(/\./g, "")
          .replace(/\//g, "_")
          .replace(/-/g, "")
          .replace(/_+/g, "_")
          .replace(/\(/g, "")
          .replace(/\)/g, "")
          .replace(/\[/g, "")
          .replace(/\]/g, "")
          .replace(/,/g, "")}/${selectedYear}`
      );

      setData(res.data);
    }
    getImporterData();
  }, [selectedImporter]);

  const donutState = {
    series: data,
    options: {
      chart: {
        width: 380,
        type: "donut",
      },
      labels: ["All Jobs", "Pending Jobs", "Completed Jobs", "Canceled Jobs"],
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      legend: {
        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        },
        position: "right",
      },
      title: {
        text: "Importer Wise Jobs",
        align: "left",
        margin: 40,
        floating: true,
        style: {
          fontSize: "1rem",
          fontWeight: "500",
          fontFamily: "poppins",
          color: "#212121",
          lineHeight: "1.2",
          marginBottom: "50px !important",
        },
      },
      responsive: [
        {
          breakpoint: 1320,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <Col xs={12} sm={6} className="dashboard-col">
      <div className="dashboard-col-inner">
        <Autocomplete
          disablePortal
          options={importerNames}
          getOptionLabel={(option) => option}
          value={importerNames.length > 0 ? importerNames[0] : null}
          onChange={handleImporterChange}
          width="100%"
          renderInput={(params) => (
            <TextField {...params} label="Select importer" />
          )}
        />

        <br />
        <ReactApexChart
          options={donutState.options}
          series={donutState.series}
          type="donut"
          width={500}
        />
      </div>
    </Col>
  );
}

export default ImporterWiseDetails;