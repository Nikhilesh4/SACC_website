
import Bottom from '@components/bottom';
import Navbar from '@components/navbar';
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
            <h1>YEARBOOK</h1>
            <h2 style={{ paddingBottom: '8px' }}>Class of 2k19 Released</h2>
            <a href="./yearbook" className="btn">
              Yearbook 2k19

            </a>
          </div>
        </section>
        <Bottom />
      </section>
    </section>
  );
};

export default Home;

