import React, { useContext } from "react";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { validationSchema } from "../schema/LoginSchema";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import { apiRoutes } from "../utils/apiRoutes";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { loginAPI } = apiRoutes();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await axios.post(loginAPI, values);
      console.log(res);
      if (res.data.message === "User not registered") {
        alert(res.data.message);
      } else if (res.data.message === "Password didn't match") {
        alert(res.data.message);
      } else if (res.data.message === "Login Successfull") {
        localStorage.setItem("user", res.data.user);
        setUser(res.data.user);
        navigate("/importer");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        size="small"
        margin="dense"
        variant="filled"
        fullWidth
        id="username"
        name="username"
        label="Username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
      />
      <TextField
        type="password"
        size="small"
        margin="dense"
        variant="filled"
        fullWidth
        id="password"
        name="password"
        label="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />

      <Button fullWidth type="submit" className="submit-form-btn">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
