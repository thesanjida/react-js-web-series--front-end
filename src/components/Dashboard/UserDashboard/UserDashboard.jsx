import React from "react";
import { Link } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

const UserDashboard = () => {
  return (
    <>
      <Container>
        <Row>
          <div>UserDashboard</div>
          <Link to="/users">User</Link>
        </Row>
      </Container>
    </>
  );
};

export default UserDashboard;
