import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TableViewIcon from "@mui/icons-material/TableView";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";

const importer = localStorage.getItem("importer");

export const sidebarData = [
  { id: 1, icon: <HomeRoundedIcon />, name: "Importer", url: "importer" },
  {
    id: 2,
    icon: <TaskAltIcon />,
    name: "Jobs",
    url: `${importer}/jobs/pending`,
  },
  {
    id: 3,
    icon: <TableViewIcon />,
    name: "Main Report",
    url: "main_report",
  },
  { id: 4, icon: <SpaceDashboardIcon />, name: "Dashboard", url: "dashboard" },
];
