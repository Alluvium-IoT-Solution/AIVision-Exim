import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import { importerData } from "../assets/data/importerData";
import { ClientContext } from "../Context/ClientContext";
import { useNavigate } from "react-router-dom";
import "../styles/importer.scss";

function Importer() {
  const { setImporter, setImporterName } = React.useContext(ClientContext);
  const navigate = useNavigate();

  const handleClient = (url, name) => {
    setImporter(url);
    setImporterName(name);
    localStorage.setItem("importer", url);
    localStorage.setItem("importerName", name);
    navigate(`/${url}/jobs/pending`);
  };

  return (
    <Container className="importer">
      <Row className="importer-row">
        {importerData.map((val) => {
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
