import React, { useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Sidebar from "./Sidebar";
import { Routes, Route } from "react-router-dom";
import sidebarBg from "../assets/images/sidebar-bg.png";
import Redirect from "./Redirect";
import { SwipeableDrawer } from "@mui/material";
import Importer from "../components/Importer";
import JobsList from "./JobsList";
import JobDetails from "./JobDetails";
import MainReport from "./MainReport";
import useFileUpload from "../customHooks/useFileUpload";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import Dashboard from "./Dashboard";
// import DeleteCollection from "./DeleteCollection";

const drawerWidth = 250;
const drawerPaperStyles = {
  backgroundColor: "#252e3e",
  backgroundImage: `url(${sidebarBg})`,
  backgroundAttachment: "fixed",
  backgroundPosition: "left 0 bottom 0 !important",
  backgroundSize: "250px !important",
  backgroundRepeat: "no-repeat",
  padding: "0 20px",
};
const drawerStyles = {
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
  },
};

function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const inputRef = useRef();
  const { handleFileUpload, snackbar, loading } = useFileUpload(inputRef);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          backgroundColor: "rgba(249, 250, 251, 0.3)",
          backdropFilter: "blur(6px) !important",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon sx={{ color: "#000" }} />
          </IconButton>
          <div style={{ flex: 1 }}>
            <img
              src={require("../assets/images/topbar-logo.png")}
              alt="logo"
              height="30px"
            />
          </div>

          {loading ? (
            <CircularProgress />
          ) : (
            <label htmlFor="uploadBtn" className="uploadBtn">
              Upload Party Data (excel file)
            </label>
          )}
          <input
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            id="uploadBtn"
            name="uploadBtn"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Drawer mobile */}
        <SwipeableDrawer
          PaperProps={{
            sx: drawerPaperStyles,
          }}
          variant="temporary"
          open={mobileOpen}
          onOpen={() => setMobileOpen(!mobileOpen)}
          onClose={() => setMobileOpen(!mobileOpen)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{ ...drawerStyles, display: { xs: "block", lg: "none" } }}
        >
          <Sidebar />
        </SwipeableDrawer>

        {/* Drawer desktop */}
        <Drawer
          PaperProps={{
            sx: drawerPaperStyles,
          }}
          variant="permanent"
          sx={{
            ...drawerStyles,
            display: { xs: "none", lg: "block" },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>

      {/* Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            lg: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: "rgb(249, 250, 251)",
            height: "100vh",
            overflow: "scroll",
          },
        }}
      >
        <Toolbar />

        <Routes>
          <Route exact path="/" element={<Redirect />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/importer" element={<Importer />} />
          <Route exact path="/:importer/jobs/:status" element={<JobsList />} />
          <Route exact path="/:importer/job/:jobNo" element={<JobDetails />} />
          <Route exact path="/main_report" element={<MainReport />} />
          {/* <Route
            exact
            path="/deleteCollection"
            element={<DeleteCollection />}
          /> */}
        </Routes>
      </Box>

      <Snackbar
        open={snackbar}
        message="Jobs added successfully!"
        sx={{ left: "auto !important", right: "24px !important" }}
      />
    </Box>
  );
}

export default ResponsiveDrawer;
