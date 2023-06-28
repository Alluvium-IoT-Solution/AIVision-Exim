import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.scss";
import { sidebarData } from "../assets/data/sidebarData";
import { IconButton, List, ListItem, ListItemButton } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { jobStatus } from "../assets/data/jobStatus";
import { ClientContext } from "../Context/ClientContext";
import { UserContext } from "../Context/UserContext";

function Sidebar() {
  const { importer } = useContext(ClientContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

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
        {sidebarData.map((val) => {
          const { id, icon, name, url } = val;
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
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconButton sx={{ color: "#ffffff9f" }}>
                        {icon}
                      </IconButton>
                      <p className="sidebar-list-text">{name}</p>
                    </div>
                  </ListItemButton>
                </NavLink>
              </ListItem>

              {name === "Jobs" &&
                jobStatus.map((job) => {
                  return (
                    <ListItem
                      disableGutters={true}
                      key={job.id}
                      className="sidebar-listItem"
                      style={{ padding: "0 20px" }}
                    >
                      <NavLink
                        to={`${importer}/jobs/${job.url}`}
                        key={id}
                        className="sidebar-link"
                      >
                        <ListItemButton
                          sx={{ textAlign: "left" }}
                          className="appbar-links"
                          style={{ padding: "5px 0" }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <IconButton
                              sx={{
                                color: "#ffffff9f",
                                border: "none !important",
                              }}
                            >
                              {job.icon}
                            </IconButton>
                            <p className="sidebar-list-text">{job.name}</p>
                          </div>
                        </ListItemButton>
                      </NavLink>
                    </ListItem>
                  );
                })}
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
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton sx={{ color: "#ffffff9f" }}>
                  <LogoutRoundedIcon />
                </IconButton>
                <p className="sidebar-list-text">Logout</p>
              </div>
            </ListItemButton>
          </div>
        </ListItem>
      </List>
    </div>
  );
}

export default Sidebar;
