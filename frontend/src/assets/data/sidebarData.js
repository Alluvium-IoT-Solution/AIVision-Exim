import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TableViewIcon from "@mui/icons-material/TableView";

const client = localStorage.getItem("client");

export const sidebarData = [
  { id: 1, icon: <HomeRoundedIcon />, name: "Importer", url: "importer" },
  {
    id: 2,
    icon: <TaskAltIcon />,
    name: "Jobs",
    url: `${client}/jobs/pending`,
  },
  {
    id: 3,
    icon: <TableViewIcon />,
    name: "Main Report",
    url: "main_report",
  },
];
