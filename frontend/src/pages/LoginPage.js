import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "../forms/LoginForm";
import "../styles/login.scss";

function LoginPage() {
  return (
    <Container fluid className="login-container">
      <Row className="login-row">
        <Col className="login-left-col">
          <div className="login-left-col-inner-container">
            <img src={require("../assets/images/logo.webp")} alt="logo" />
          </div>
        </Col>
        <Col className="login-right-col">
          <div className="login-right-col-inner-container">
            <img src={require("../assets/images/Lock.webp")} alt="lock" />
            <LoginForm />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
