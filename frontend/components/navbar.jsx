"use client";
import React, { useState, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import "@styles/navbar.scss";

const NavbarComponent = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      if (cookie.includes("Authorization_YearBook")) {
        setAuthenticated(true);
      }
    }
  }, []);

  const changeBackground = () => {
    const header = document.getElementsByClassName("header-nav")[0];
    if (window.scrollY < 100) {
      header.classList.remove("sticky");
    } else {
      header.classList.add("sticky");
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", changeBackground);
  }

  return (
    <Navbar className="header-nav" fixed="top" bg="dark" expand="lg">
      <Navbar.Brand href="/">
        <img
          src="/assets/images/collegeLogo.png"
          alt="Logo"
          className="logo"
          style={{ width: '169px', height: '50px' }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
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