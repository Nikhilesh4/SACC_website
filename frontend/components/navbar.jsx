"use client";
import React, { useState, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import "@styles/navbar.scss";

const NavbarComponent = ({ isSticky = false }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      if (cookie.includes("Authorization_YearBook")) {
        setAuthenticated(true);
      }
    }
  }, []);

  return (
    <Navbar 
      className={`header-nav ${isSticky ? 'sticky' : ''}`} 
      fixed="top" 
      bg="dark" 
      expand="lg"
    >
      <Navbar.Brand href="/">
        <img
          src="/assets/images/collegeLogo.png"
          alt="Logo"
          className="logo"
          style={{ width: '169px', height: '50px' }}
        />
      </Navbar.Brand>
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
      {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
        <Nav className="mx-auto">
          <Nav.Link className="px-3 text-white" href="/">Home</Nav.Link>
          <Nav.Link className="px-3 text-white" href="/team">Team</Nav.Link>
          <Nav.Link className="px-3 text-white active" href={authenticated ? "/yearbooks" : "/api/login"}>Yearbooks</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link className="px-3 text-white loginButton" href="/api/login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;