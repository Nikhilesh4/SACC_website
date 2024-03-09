import React from 'react';
import YearbookCaro from '../components/yearbookcaro';
import '@styles/yearbook.scss';
import Bottom from '../components/bottom';
import Navbartest from '../components/navbar';
// import '@styles/carousel.scss';
import '@styles/globals.scss'
import '@styles/embla.css'
export default function Yearbook() {
  const yearbookData = Array.from({ length: 159 }, (_, i) => ({
    image: `/assets/yearbookimages/image_YB19_${i + 1}.jpg`,
    // name: `name-${i + 1}`,
  }));

  return (
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
    
    
  );
}

