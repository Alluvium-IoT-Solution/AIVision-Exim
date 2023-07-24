import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import axios from "axios";
import * as Yup from "yup";
import { apiRoutes } from "../utils/apiRoutes";
import Autocomplete from "@mui/material/Autocomplete";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const AssignJobsForm = () => {
  const [users, setUsers] = useState([]);
  const [importerData, setImporterData] = useState([]);
  const { importerListAPI, getUsersAPI, assignJobsAPI } = apiRoutes();

  useEffect(() => {
    async function getUsers() {
      const res = await axios(getUsersAPI);
      setUsers(res.data);
    }
    async function getImporterList() {
      const res = await axios.get(importerListAPI);
      setImporterData(res.data);
    }
    getUsers();
    getImporterList();
  }, []);

  const userList = users.map((user) => user.username);
  const importerNames = importerData.map((importer) => {
    return importer.importerName;
  });

  const validationSchema = Yup.object().shape({
    user: Yup.string().required("User is required"),
    importer: Yup.array()
      .min(1, "Importer is required")
      .required("Importer is required"),
  });

  const formik = useFormik({
    initialValues: {
      user: null,
      importer: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      const res = await axios.post(assignJobsAPI, values);
      console.log(res.data);
    },
  });

  const handleChangeUserAutocomplete = (event, value) => {
    formik.setFieldValue("user", value); // Update the 'user' field in Formik
  };

  const handleChangeImporterAutocomplete = (event, value) => {
    formik.setFieldValue("importer", value); // Update the 'importer' field in Formik
  };

  const handleChangeImporterSelect = (event) => {
    formik.setFieldValue("importer", event.target.value); // Update the 'importer' field in Formik
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Autocomplete
        disablePortal
        options={userList}
        getOptionLabel={(option) => option}
        width="100%"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select user"
            error={formik.touched.user && Boolean(formik.errors.user)}
            helperText={formik.touched.user && formik.errors.user}
          />
        )}
        id="user"
        name="user"
        onChange={handleChangeUserAutocomplete}
        value={formik.values.user}
        style={{ marginBottom: "15px" }}
      />

      <FormControl sx={{ width: "100%" }}>
        <InputLabel>Select importer</InputLabel>
        <Select
          variant="outlined"
          fullWidth
          multiple
          value={formik.values.importer}
          onChange={handleChangeImporterSelect}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          id="importer"
          name="importer"
        >
          {importerNames.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={formik.values.importer.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
        {formik.touched.importer && Boolean(formik.errors.importer) && (
          <div>{formik.errors.importer}</div>
        )}
      </FormControl>

      <br />
      <br />

      <Autocomplete
        disablePortal
        options={importerNames}
        getOptionLabel={(option) => option}
        width="100%"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select importer"
            error={formik.touched.importer && Boolean(formik.errors.importer)}
            helperText={formik.touched.importer && formik.errors.importer}
          />
        )}
        id="importer"
        name="importer"
        onChange={handleChangeImporterAutocomplete}
        value={formik.values.importer}
        style={{ marginBottom: "5px" }}
      />

      <Button
        fullWidth
        type="submit"
        className="submit-form-btn"
        aria-label="login"
      >
        Assign
      </Button>
    </form>
  );
};

export default AssignJobsForm;
