"use client";
import React, { useState, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import "@styles/navbar.scss";

const NavbarComponent = ({ isSticky = false }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      if (cookie.includes("Authorization_YearBook")) {
        setAuthenticated(true);
      }
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "Authorization_YearBook=; max-age=0; path=/;";
    setAuthenticated(false);
    window.location.href = "/";
  };

  const handleToggle = (expanded) => {
    setIsMenuOpen(expanded);
  };

  return (
    <Navbar
      className={`header-nav ${isSticky ? "sticky" : ""} ${isMenuOpen ? "menu-open" : ""}`}
      fixed="top"
      bg="dark"
      expand="lg"
      onToggle={handleToggle}
    >
      <Navbar.Brand href="/">
        <img
          src="/assets/images/collegeLogo.png"
          alt="Logo"
          className="logo"
          style={{ width: "150px", height: "50px" }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
        <Nav className="mx-auto">
          <Nav.Link className="px-4 text-white" href="/">
            Home
          </Nav.Link>
          <Nav.Link className="px-4 text-white" href="/about">
            About
          </Nav.Link>
          <Nav.Link className="px-4 text-white" href="/event">
            Events
          </Nav.Link>
          <Nav.Link className="px-4 text-white" href="/team">
            Team
          </Nav.Link>
          <Nav.Link
            className="px-4 text-white active"
            href={authenticated ? "/yearbooks" : "/api/login"}
          >
            Yearbooks
          </Nav.Link>
        </Nav>
        <Nav className="justify-content-end">
          {authenticated ? (
            <Nav.Link className="px-4 text-white loginButton" onClick={handleLogout}>
              Logout
            </Nav.Link>
          ) : (
            <Nav.Link className="px-4 text-white loginButton" href="/api/login">
              Login
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;