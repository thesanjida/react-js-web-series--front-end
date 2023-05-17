import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import getToken from "../../services/getToken";
import { toast } from "react-hot-toast";
import service from "../../Hooks/service";

const Header = () => {
  let navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    const { data: response } = await service.put(`logout`, {
      headers: { Authorization: getToken() },
    });
    setTimeout(navigate("/login"), 1000);
    console.log("logout:", response);
    toast(response);
    if (response === "User logout successfully") {
      setTimeout(navigate("/login"), 1500);
    }
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="w-100"
      >
        <Container>
          <Link className="brand text-white" to="/dashboard">
            Web Series
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-between"
            id="responsive-navbar-nav"
          >
            <Nav>
              <div>
                <Link className="nav_bar text-white" to="/dashboard">
                  Dashboard
                </Link>
                <Link className="nav_bar text-white" to="/contact">
                  Contact
                </Link>
                <Link className="nav_bar text-white" to="/about">
                  About
                </Link>
              </div>
            </Nav>
            <Nav>
              <div className="">
                {getToken() ? (
                  <Button className="nav_bar text-white" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <Link className="nav_bar text-white " to="/login">
                    Login
                  </Link>
                )}
              </div>
              {/* <button
                onClick={() => {
                  localStorage.removeItem("token");
                  history.replace("/signin");
                }}
              >
                Logout
              </button> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
