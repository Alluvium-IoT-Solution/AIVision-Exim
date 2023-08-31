import React, { useContext, useEffect, useState } from "react";
import { apiRoutes } from "../../../utils/apiRoutes";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import { SelectedYearContext } from "../../../Context/SelectedYearContext";

function TrackTasks() {
  const [usernames, setUsernames] = useState([]);
  const [counts, setCounts] = useState([]);
  const { getUsersWithJobsAPI } = apiRoutes();
  const { selectedYear } = useContext(SelectedYearContext);

  useEffect(() => {
    async function getData() {
      const res = await axios.get(`${getUsersWithJobsAPI}/${selectedYear}`);

      setUsernames(res.data.map((item) => item.username));
      setCounts(res.data.map((item) => item.jobsCount));
    }

    getData();
  }, []);

  const donutState = {
    series: counts,
    options: {
      chart: {
        width: 350,
        height: 400,
        type: "donut",
      },
      labels: usernames,
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
    <div className="dashboard-col-inner" style={{ flex: "1 !important" }}>
      <h4 style={{ textAlign: "left" }}>Pending Work</h4>
      <ReactApexChart
        options={donutState.options}
        series={donutState.series}
        type="donut"
        width={500}
      />
    </div>
  );
}

export default TrackTasks;
