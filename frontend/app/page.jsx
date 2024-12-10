'use client';

import Bottom from '@components/footer';
import Navbar from '@components/navbar';
import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import NavbarComponent from '@components/navbar';

const Home = () => {
  const [isSticky, setIsSticky] = useState(false);

  const changeBackground = () => {
    if (window.scrollY < 100) {
      setIsSticky(false);
    } else {
      setIsSticky(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  useEffect(() => {
    console.log("isSticky:", isSticky);
  }, [isSticky]);

  return (
    <section>
      <NavbarComponent isSticky={isSticky} />
      <section id="main">
        <section className="showcase">
          <div className="video-container">
            <video
              src="./assets/Yearbook_portal_full.mp4"
              autoPlay
              muted
              loop
              playsInline
            ></video>
          </div>
          <div className="content">
            <h1>SACC</h1>
            <h2 style={{ paddingBottom: '8px' }}>Presents</h2>
            <h2>YEARBOOK</h2>
            <h3>Class of 2k19 Released</h3>
            <a href="/api/login" className="btn">
              Yearbook 2019
            </a>
          </div>
        </section>
        <Bottom />
      </section>
    </section>
  );
};

export default Home;