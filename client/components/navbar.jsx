"use client";
// @client
import React from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import Fade from 'react-awesome-reveal';
// import Fade from './fade.jsx';
// import '@styles/navbar.scss';
import '@styles/navbar.scss';
const NavbarComponent = () => {
  const changeBackground = () => {
    let header = document.getElementsByClassName("header-nav")[0];
    if (window.scrollY < 200) {
      header.classList.remove("sticky");
    } else {
      header.classList.add("sticky");
    }
  };

  window.addEventListener("scroll", changeBackground);
  return (
    <>
      <Navbar
        className="header-nav"
        fixed="top"
        collapseOnSelect
        bg="dark"
        expand="lg"
      >
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
        <Nav className="mr-auto">
          <Fade cascade damping={0.5}>
            <Nav.Link className="px-3" href="#home">
              About Us
            </Nav.Link>
            {/* <Nav.Link className="px-3" href="#education">
              Education
            </Nav.Link> */}
          </Fade>
        </Nav>

        <Fade cascade>
        <Navbar.Brand href="#home" className="brand-name mx-auto">
              SACC
            </Navbar.Brand>
        </Fade>

        <Nav className="mr-auto">
          <Fade cascade damping={0.5}>
            <Nav.Link className="px-3" href="#about">
              Year Book
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
