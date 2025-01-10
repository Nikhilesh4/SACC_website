import React from 'react';
import { useState, useEffect } from 'react';

import '@styles/yearbook.scss';
import Bottom from '@components/footer';
import NavBarComponent from '@components/navbar';
import '@styles/globals.scss'
import '@styles/embla.css'

// Update Yearbook component to accept year prop
export default function Yearbook({ year = "2k19" }) { // TODO: Update default to the latest year
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    var arrayb = document.cookie;
    arrayb = arrayb.split(';');
    for (const item of arrayb) {
      if (item.includes("Authorization_YearBook")) {
        setAuthenticated(true);
      }
    }
  }, []);

  return (
    <section>
      <NavBarComponent isSticky={true} />
      <section>
        {authenticated ? (
          <section style={{ height: "100vh" }}>
            <iframe
              src={`/${year}.html`}
              width="100%"
              height="100%"
              title="Yearbook Showcase"
              style={{ border: "none" }}
            />
          </section>
        ) : (
          <section style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <h1>You are not authenticated to view this page.</h1>
            </div>
            <div style={{ textAlign: "center", alignContent: "center", alignItems: "center"}}>
              <h2>
                <a href="/api/login" className="btn">Login CAS</a>
              </h2>
            </div>
          </section>
        )}
      </section>
      <Bottom />
    </section>
  );
}