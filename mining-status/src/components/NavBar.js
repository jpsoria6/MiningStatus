import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    const styles = {
      color: "#FFFFFF",
    };
    return (
      <Nav className="justify-content-center mb-5 bg-primary">
        <Nav.Item className="m-2">
          <Link to="/mineros"  style={styles}>
            Mineros
          </Link>
        </Nav.Item>
        <Nav.Item className="m-2">
          <Link to="/pagos" style={styles}>
            Pagos
          </Link>
        </Nav.Item>
      </Nav>
    );
  }
}

export default NavBar;
