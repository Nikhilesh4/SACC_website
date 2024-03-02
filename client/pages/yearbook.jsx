import React from 'react';
import YearbookCaro from '../components/yearbookcaro';
import one from '../public/assets/images/test1.png';
import two from '../public/assets/images/test2.png';
import '@styles/yearbook.scss';
// import '@styles/carousel.scss';
import '@styles/globals.scss'
import '@styles/embla.css'
export default function Yearbook() {
  const yearbookData = Array.from({ length: 159 }, (_, i) => ({
    image: `/assets/yearbookimages/image_YB19_${i + 1}.jpg`,
    // name: `name-${i + 1}`,
  }));

  return (
    <div>
      <h1 style={{alignContent: 'center',textAlign: 'center'}}>Yearbook Page</h1>
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
    </div>
  );
}