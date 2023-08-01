import React from "react";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { validationSchema } from "../schema/LoginSchema";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { registerAPI } = apiRoutes();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      role: "Developer",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await axios.post(registerAPI, values);
      console.log(res);
      if (res.data.message === "User already registered") {
        alert(res.data.message);
      } else if (res.data.message === "Successfully registered, login now.") {
        alert(res.data.message);
        navigate("/dashboard");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="register-form">
      <TextField
        size="small"
        margin="dense"
        variant="outlined"
        fullWidth
        id="username"
        name="username"
        label="Username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        sx={{ marginBottom: "10px" }}
      />

      <TextField
        type="password"
        size="small"
        margin="dense"
        variant="outlined"
        fullWidth
        id="password"
        name="password"
        label="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        sx={{ marginBottom: "10px" }}
      />

      <TextField
        select
        size="small"
        margin="dense"
        variant="outlined"
        fullWidth
        id="role"
        name="role"
        label="Role"
        defaultValue="Developer"
        onChange={formik.handleChange}
        sx={{ marginBottom: "10px" }}
      >
        <MenuItem value="Developer">Developer</MenuItem>
        <MenuItem value="Director">Director</MenuItem>
        <MenuItem value="General Manager">General Manager</MenuItem>
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="User">User</MenuItem>
      </TextField>

      <button
        type="submit"
        className="submit-form-btn"
        aria-labelledby="register-btn"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
