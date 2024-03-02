import Bottom from '@components/bottom';
import Link from 'next/link';
const Home = () => {
  return (
    <section id="main">
      <section className="showcase">
        <div className="video-container">
          <video
            src="/Yearbook_portal_full.mp4"
            autoPlay
            muted
            loop
            playsInline
          ></video>
        </div>
        <div className="content">
          <h1>SACC</h1>
          <h2>Presents</h2>
          <h2>YEARBOOK</h2>
          <h3>For 2k24 Graduates Only</h3>
          <a href="localhost:5000/login" className="btn">
            Login with CAS
           
          </a>
        </div>
      </section>
      <Bottom />
    </section>
  );
};

export default Home;
