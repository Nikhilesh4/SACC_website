"use client";
// @client
import React from "react";
import { useState, useEffect } from 'react';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Fade from 'react-awesome-reveal';
// import Fade from './fade.jsx';
// import '@styles/navbar.scss';
import '@styles/navbar.scss';
const NavbarComponent = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    var arrayb = document.cookie;
    arrayb = arrayb.split(';');
    console.log(arrayb);
    for (const item of arrayb) {
      console.log(item);
      if (item.includes("Authorization_YearBook")) {
        setAuthenticated(true);
      }
    }
  }, []);

  const changeBackground = () => {
    let header = document.getElementsByClassName("header-nav")[0];
    if (window.scrollY < 200) {
      header.classList.remove("sticky");
    } else {
      header.classList.add("sticky");
    }
  };

  // Add event listener only if window is defined
  if (typeof window !== 'undefined') {
    window.addEventListener("scroll", changeBackground);
  }

  return (
    <>
      <Navbar
        className="header-nav"
        fixed="top"
        collapseOnSelect
        bg="dark"
        expand="lg"
      >
        <Fade cascade>
          <Navbar.Brand href="." className="justify-content-center">
            <img src="./assets/images/SACC_logo.png" alt="SACC" width={50} height={50} style={{ marginLeft: "5rem" }} />
          </Navbar.Brand>
        </Fade>
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center" style={{ marginRight: "9rem" }}>
          <Nav className="mr-auto">
            <Fade cascade damping={0.5}>
              <Nav.Link className="px-3" href="#about" >
                About Us
              </Nav.Link>
              {/* <Nav.Link className="px-3" href="#education">
              Education
            </Nav.Link> */}
            </Fade>
          </Nav>

          <Fade cascade>
            <Navbar.Brand href="." className="brand-name mx-auto">
              SACC
            </Navbar.Brand>
          </Fade>

          <Nav className="mr-auto">
            <Fade cascade damping={0.5}>
              authenticated ?
              <Nav.Link className="px-3" href="/yearbook">
                Yearbook
              </Nav.Link>
              : <Nav.Link className="px-3" href="/api/login">
                Login
              </Nav.Link>
              {/* <Nav.Link className="px-3" href="#project">
              Projects
            </Nav.Link> */}
            </Fade>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavbarComponent;