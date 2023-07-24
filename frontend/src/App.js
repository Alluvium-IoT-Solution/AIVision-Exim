import "./App.scss";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import NavbarComponent from "./components/NavbarComponent";
import { ThemeProvider } from "@mui/material/styles";
import useMuiTheme from "./customHooks/useMuiTheme";
import LoginPage from "./pages/LoginPage";
import { ClientContext } from "./Context/ClientContext";
import { UserContext } from "./Context/UserContext";
import axios from "axios";
import { apiRoutes } from "./utils/apiRoutes";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [importer, setImporter] = useState(localStorage.getItem("importer"));
  const [importerName, setImporterName] = useState(
    localStorage.getItem("importerName")
  );
  const muiTheme = useMuiTheme();
  const { assignedImporterAPI } = apiRoutes();

  useEffect(() => {
    async function getAssignedImporter() {
      const res = await axios(`${assignedImporterAPI}/${user.username}`);
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
    }
    getAssignedImporter();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ClientContext.Provider
        value={{ importer, setImporter, importerName, setImporterName }}
      >
        <ThemeProvider theme={muiTheme}>
          <div className="App">
            {!user ? (
              <LoginPage />
            ) : (
              <Container fluid style={{ padding: 0 }}>
                <NavbarComponent />
              </Container>
            )}
          </div>
        </ThemeProvider>
      </ClientContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
