import React, { useContext, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.scss";
import { sidebarData } from "../assets/data/sidebarData";
import { IconButton, List, ListItem, ListItemButton } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { jobStatus } from "../assets/data/jobStatus";
import { ClientContext } from "../Context/ClientContext";
import { UserContext } from "../Context/UserContext";
import useFileUpload from "../customHooks/useFileUpload";
import Snackbar from "@mui/material/Snackbar";

function Sidebar() {
  const { importer } = useContext(ClientContext);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const inputRef = useRef();
  const { handleFileUpload, snackbar } = useFileUpload(inputRef);
  const isUserRoleUser = user.role === "User";
  const sidebarDataArray = sidebarData(user.role, user.importerURL);

  return (
    <div className="sidebar">
      <List>
        <div className="avatar">
          <img
            src={require("../assets/images/sidebar-logo.jpeg")}
            alt=""
            width={180}
          />
        </div>

        {!isUserRoleUser && (
          <>
            <label htmlFor="uploadBtn" className="uploadBtn-mobile">
              Upload Party Data (excel file)
            </label>
            <input
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              id="uploadBtn"
              name="uploadBtn"
              ref={inputRef}
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </>
        )}

        {sidebarDataArray.map((val) => {
          const { id, icon, name, url } = val;

          if (
            isUserRoleUser &&
            (name === "Importer" || name === "Main Report")
          ) {
            return null; // Hide Importer and Main Report if user.role === User
          }

          return (
            <div key={id}>
              <ListItem
                disableGutters={true}
                key={id}
                className="sidebar-listItem"
              >
                <NavLink to={`/${url}`} key={id} className="sidebar-link">
                  <ListItemButton
                    sx={{ textAlign: "left" }}
                    className="appbar-links"
                    style={{ padding: "5px 0" }}
                    aria-label="list-item"
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconButton sx={{ color: "#ffffff9f" }} aria-label="icon">
                        {icon}
                      </IconButton>
                      <p className="sidebar-list-text">{name}</p>
                    </div>
                  </ListItemButton>
                </NavLink>
              </ListItem>
              {name === "Jobs" &&
                jobStatus.map((job) => (
                  <ListItem
                    disableGutters={true}
                    key={job.id}
                    className="sidebar-listItem"
                    style={{ padding: "0 20px" }}
                  >
                    <NavLink
                      to={
                        user.role === "User"
                          ? `${user.importerURL}/jobs/${job.url}` // Navigate to the importerURL assigned to the user, if user.role=== User
                          : `${importer}/jobs/${job.url}`
                      }
                      key={job.id}
                      className="sidebar-link"
                    >
                      <ListItemButton
                        sx={{ textAlign: "left" }}
                        className="appbar-links"
                        style={{ padding: "5px 0" }}
                        aria-label="list-item"
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            sx={{
                              color: "#ffffff9f",
                              border: "none !important",
                            }}
                            aria-label="icon"
                          >
                            {job.icon}
                          </IconButton>
                          <p className="sidebar-list-text">{job.name}</p>
                        </div>
                      </ListItemButton>
                    </NavLink>
                  </ListItem>
                ))}
            </div>
          );
        })}

        <ListItem
          sx={{ textAlign: "left" }}
          className="sidebar-listItem"
          style={{
            padding: "5px 0",
          }}
          onClick={() => {
            setUser(null);
            navigate("/");
            localStorage.removeItem("user");
          }}
        >
          <div className="sidebar-link">
            <ListItemButton
              sx={{ textAlign: "left" }}
              className="appbar-links"
              style={{
                padding: "5px 0",
              }}
              aria-label="list-item"
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton sx={{ color: "#ffffff9f" }} aria-label="icon">
                  <LogoutRoundedIcon />
                </IconButton>
                <p className="sidebar-list-text">Logout</p>
              </div>
            </ListItemButton>
          </div>
        </ListItem>
      </List>

      <Snackbar
        open={snackbar}
        message="Jobs added successfully!"
        sx={{ left: "auto !important", right: "24px !important" }}
      />
    </div>
  );
}

export default Sidebar;
