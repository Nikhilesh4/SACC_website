'use client';

import Bottom from '@components/footer';
import React, { useState, useEffect } from 'react';
import NavbarComponent from '@components/navbar';

const Home = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

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

  useEffect(() => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      if (cookie.includes("Authorization_YearBook")) {
        setAuthenticated(true);
      }
    }
  }, []);

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
            <p style={{ fontSize: '2.25rem' }}>SACC presents</p>
            <p style={{ fontSize: '1.5rem' }}> the release of</p>
            <p style={{ fontSize: '3rem' }}>Yearbook for the Class of 2020</p>
            <a 
              href={authenticated ? "/yearbooks" : "/api/login"} 
              className="btn"
            >
              Access Here
            </a>
          </div>
        </section>
        <Bottom />
      </section>
    </section>
  );
};

export default Home;