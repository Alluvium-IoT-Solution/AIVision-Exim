import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRoutes } from "../utils/apiRoutes";
import axios from "axios";
import { useFormik } from "formik";
import { convertDateFormatForDB } from "../utils/convertDateFormatForDB";
import { convertDateFormatForUI } from "../utils/convertDateFormatForUI";

function useFetchJobDetails(params, checked) {
  const { updateJobAPI, getJobAPI } = apiRoutes(params.importer, params.jobNo);
  const [data, setData] = useState(null);
  const [detentionFrom, setDetentionFrom] = useState([]);
  const navigate = useNavigate();

  // Use today's date if date is not available in db
  const date = new Date();
  function formatDate(date) {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  const dateString = formatDate(date);

  // Fetch data
  useEffect(() => {
    async function getJobDetails() {
      const response = await axios.get(`${getJobAPI}`);
      setData(response.data);
    }

    getJobDetails();
  }, [params.importer, params.jobNo, getJobAPI]);

  // Formik
  const formik = useFormik({
    initialValues: {
      container_nos: "",
      eta: "",
      status: "",
      detailed_status: "",
      free_time: "",
      arrival_date: "",
    },

    onSubmit: async (values) => {
      const eta = convertDateFormatForDB(values.eta); // convert date to dd.mm.yy

      const res = await axios.put(`${updateJobAPI}`, {
        eta,
        checked,
        free_time: values.free_time,
        status: values.status,
        detailed_status: values.detailed_status,
        container_nos: values.container_nos,
        arrival_date: values.arrival_date,
      });
      navigate(`/${params.importer}/jobs/pending`);
    },
  });

  // Update formik intial values when data is fetched from db
  useEffect(() => {
    if (data) {
      const container_nos = data.container_nos.map((container) => ({
        arrival_date:
          container.arrival_date === undefined
            ? dateString
            : convertDateFormatForUI(container.arrival_date), // convert date to yyyy-mm-dd
        container_number: container.container_number,
      }));

      formik.setValues({
        ...{ container_nos },
        arrival_date: container_nos[0].arrival_date,
        eta:
          data.eta === undefined
            ? dateString
            : convertDateFormatForUI(data.eta),
        free_time: data.free_time === undefined ? 14 : data.free_time,
        status: data.status,
        detailed_status:
          data.detailed_status === undefined
            ? "Estimated Time of Arrival"
            : data.detailed_status,
      });
    }
    // eslint-disable-next-line
  }, [data]);

  // Update detention-from date
  useEffect(() => {
    function addDaysToDate(dateString, days) {
      var date = new Date(dateString);
      date.setDate(date.getDate() + days);
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, "0");
      var day = String(date.getDate()).padStart(2, "0");
      return year + "-" + month + "-" + day;
    }

    if (formik.values.container_nos !== "" && data !== null) {
      // If all containers do not arrive at the same time, use the arrival date of individual container
      if (!checked) {
        const updatedDate = formik.values.container_nos.map((container) =>
          addDaysToDate(
            container.arrival_date,
            parseInt(formik.values.free_time)
          )
            .split("-")
            .reverse()
            .join("-")
        );
        setDetentionFrom(updatedDate);
      } else {
        // If all containers arrive at the same time, use the common arrival date
        const updatedDate = formik.values.container_nos.map((container) =>
          addDaysToDate(
            formik.values.arrival_date,
            parseInt(formik.values.free_time)
          )
            .split("-")
            .reverse()
            .join("-")
        );
        setDetentionFrom(updatedDate);
      }
    }
  }, [
    formik.values.arrival_date,
    formik.values.free_time,
    formik.values.container_nos,
    data,
    checked,
  ]);

  return { data, detentionFrom, formik };
}

export default useFetchJobDetails;
