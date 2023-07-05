import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { importerData } from "../assets/data/importerData";
import { ClientContext } from "../Context/ClientContext";
import { useNavigate } from "react-router-dom";
import "../styles/importer.scss";

function Importer() {
  const [filterImporter, setFilterImporter] = useState("");
  const { setImporter, setImporterName } = React.useContext(ClientContext);
  const navigate = useNavigate();

  const filteredData = importerData.filter((importer) => {
    if (filterImporter === "") {
      return true;
    } else if (
      importer.name.toLowerCase().includes(filterImporter.toLowerCase())
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
        {filteredData.map((val) => {
          return (
            <Col key={val.id} xs={12} lg={3} className="importer-col">
              <div
                className="importer-inner-container"
                onClick={() => handleClient(val.url, val.name)}
              >
                {val.name}
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Importer;
