import React from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import MenuItem from "@mui/material/MenuItem";
import { validationSchema } from "../schema/LoginSchema";
import "../styles/dashboard.scss";
import axios from "axios";
import RegisterModal from "./RegisterModal";

const Dashboard = () => {
  // Modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      role: "Developer",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      async function register() {
        await axios
          .post("http://localhost:9002/api/register", values)
          .then((res) => {
            alert(res.data.message);
          });
      }

      register();
    },
  });

  return (
    <>
      <div className="user-info">
        <h4>Hello, xyz</h4>
        <button onClick={handleOpenModal} className="add-user-btn">
          Add User
        </button>
      </div>

      <RegisterModal
        openModal={openModal}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default Dashboard;
