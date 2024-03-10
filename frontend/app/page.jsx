
import Bottom from '@components/bottom';
import Navbar from '@components/navbar';
import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import ReactDOM from 'react-dom';
// import Yearbook from '.@app/yearbook';
const Home = () => {
  return (
    // <Navbar/>
    <section>
      <Navbar />
      <section id="main">
        {/* <Navbar/> */}
        {/* <Nav/> */}
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

