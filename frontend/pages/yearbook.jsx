import React from 'react';
import { useState, useEffect } from 'react';

import YearbookCaro from '@components/yearbookcaro';
import '@styles/yearbook.scss';
import Bottom from '@components/bottom';
import Navbartest from '@components/navbar';
// import '@styles/carousel.scss';
import '@styles/globals.scss'
import '@styles/embla.css'

export default function Yearbook() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    var arrayb = document.cookie;
    arrayb = arrayb.split(';');
    // console.log(arrayb);
    for (const item of arrayb) {
      // console.log(item);
      if (item.includes("Authorization_YearBook")) {
        setAuthenticated(true);
      }
    }


    // // Check if the user is authenticated
    // const token = localStorage.getItem('Authorization_YearBook');
    // console.log(token);
    // if (token) {
    //   setAuthenticated(true);
    // } else {
    //   setAuthenticated(false);
    // }
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
            {/* <h1 style={{alignContent: 'center',textAlign: 'center',color: 'black'}}>Yearbook :)</h1> */}
            <YearbookCaro yearbook={yearbookData} />
            {/* <img src="/assets/images/test3.png" alt="test1" width={500} height={300} /> */}
            {/* <div className="embla__pagination">
          {yearbookData.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi.scrollTo(index)}
            >
              {index + 1}
            </button>
          ))}
        </div> */}
            {/* idea for putting a button here to jump to a page */}
          </section>
        </section>
        <Bottom />
      </section>
      : <section>
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

