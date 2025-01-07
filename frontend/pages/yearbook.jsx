import React from 'react';
import { useState, useEffect } from 'react';

import '@styles/yearbook.scss';
import Bottom from '@components/footer';
import Navbartest from '@components/navbar';
import '@styles/globals.scss'
import '@styles/embla.css'

export default function Yearbook() {
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

  const yearbookData = Array.from({ length: 159 }, (_, i) => ({
    image: `/assets/yearbookimages/image_YB19_${i + 1}.jpg`,
  }));

  return (
    authenticated ?
      <section>
        <Navbartest />
        <section id='main'>
          <section className='showcase'>
            <iframe
              src="/index.html"
              width="100%"
              height="940"
              title="Yearbook Showcase"
              style={{ border: "none" }}
            ></iframe>
          </section>
        </section>
        <Bottom />
      </section>
      : <section>curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
        <Navbartest />
        <section>
          <div>
            <h1 style={{ marginTop: "25rem", textAlign: "center" }}> You are not authenticated to view this page.</h1></div>
          <div style={{ textAlign: "center", alignContent: "center", alignItems: "center", marginBottom: "12rem" }}>
            <h2>
              <a href="/api/login" className="btn">
                Login CAS
              </a>
            </h2>
          </div>
        </section>

        <Bottom />
      </section>
  );
}