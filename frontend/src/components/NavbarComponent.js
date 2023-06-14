import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Sidebar from "./Sidebar";
import { Routes, Route, useNavigate } from "react-router-dom";
import sidebarBg from "../assets/images/sidebar-bg.png";
import Redirect from "./Redirect";
import { SwipeableDrawer } from "@mui/material";
import Importer from "../components/Importer";
import JobsList from "./JobsList";
import * as xlsx from "xlsx";
import axios from "axios";
import JobDetails from "./JobDetails";
import MainReport from "./MainReport";

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
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = handleFileRead;
    reader.readAsBinaryString(file);
  };

  const handleFileRead = (event) => {
    const content = event.target.result;
    const workbook = xlsx.read(content, { type: "binary" });

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { raw: false });

    const convertKeys = (arr) => {
      return arr.map((obj) => {
        const newObj = {};
        for (let key in obj) {
          const newKey = key.toLowerCase().replace(/\s+/g, "_");
          newObj[newKey] = obj[key];
        }
        return newObj;
      });
    };

    const convertedData = convertKeys(jsonData);

    const clientData = [];

    // Iterate over the JSON data and filter based on client name
    convertedData.forEach((item) => {
      const clientName = item.client;

      // Check if the client already exists in the clientData array
      const existingClient = clientData.find(
        (client) => client.client === clientName
      );

      // If the client already exists, push the item to its data array
      if (existingClient) {
        existingClient.data.push(item);
      } else {
        // If the client doesn't exist, create a new client object and add it to the clientData array
        const newClient = {
          client: clientName.toLowerCase().replace(/ /g, "_"),
          data: [item],
        };
        clientData.push(newClient);
      }
    });

    async function uploadExcelData() {
      const res = await axios.post(
        "http://localhost:9002/jobs/addJob",
        clientData
      );
      console.log(res.data);
      navigate("/importer");
    }

    uploadExcelData();
  };

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

          <label
            htmlFor="uploadBtn"
            style={{
              backgroundColor: "#273041",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            Upload Party Data (excel file)
          </label>
          <input
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            id="uploadBtn"
            name="uploadBtn"
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
          },
        }}
      >
        <Toolbar />

        <Routes>
          <Route exact path="/" element={<Redirect />} />
          <Route exact path="/importer" element={<Importer />} />
          <Route exact path="/:client/jobs/:status" element={<JobsList />} />
          <Route exact path="/:client/job/:jobNo" element={<JobDetails />} />
          <Route exact path="/main_report" element={<MainReport />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
