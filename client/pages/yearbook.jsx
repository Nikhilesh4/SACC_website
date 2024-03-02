import React from 'react';
import YearbookCaro from '../components/yearbookcaro';
import one from '../public/assets/images/test1.png';
import two from '../public/assets/images/test2.png';
import '@styles/yearbook.scss';
// import '@styles/carousel.scss';
import '@styles/globals.scss'
export default function Yearbook() {
  const yearbookData = [
    { image: "/assets/images/test1.png", name: 'name-1' },
    { image: '/assets/images/test2.png', name: 'name-2' },
    {image: "/assets/images/test3.png", name: 'name-3' },

  ];

  return (
    <div>
      <h1 style={{alignContent: 'center',textAlign: 'center'}}>Yearbook Page</h1>
      <YearbookCaro yearbook={yearbookData} />
      {/* <img src="/assets/images/test1.png" alt="test1" width={500} height={300} /> */}
    </div>
  );
}