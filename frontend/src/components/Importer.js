import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { ClientContext } from "../Context/ClientContext";
import { useNavigate } from "react-router-dom";
import "../styles/importer.scss";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";

function Importer() {
  const [filterImporter, setFilterImporter] = useState("");
  const { setImporter, setImporterName } = React.useContext(ClientContext);
  const [importerData, setImporterData] = useState([]);
  const navigate = useNavigate();
  const { importerListAPI } = apiRoutes();

  useEffect(() => {
    async function getImporterList() {
      const res = await axios.get(importerListAPI);
      setImporterData(res.data);
    }
    getImporterList();
  }, []);

  const filteredData = importerData.filter((importer) => {
    console.log(filterImporter);
    if (filterImporter === "") {
      return true;
    } else if (
      importer.importerName !== "--" &&
      importer.importerName.toLowerCase().includes(filterImporter.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  const handleClient = (url, name) => {
    setImporter(url);
    setImporterName(name);
    localStorage.setItem("importer", url);
    localStorage.setItem("importerName", name);
    navigate(`/${url}/jobs/pending`);
  };

  return (
    <Container className="importer">
      <input
        type="text"
        onChange={(e) => setFilterImporter(e.target.value)}
        placeholder="Search importer..."
      />
      <Row className="importer-row">
        {filteredData.map((val, id) => {
          return (
            <Col key={id} xs={12} lg={3} className="importer-col">
              <div
                className="importer-inner-container"
                onClick={() => handleClient(val.importer, val.importerName)}
              >
                {val.importerName}
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Importer;
