import Head from 'next/head';
import NavbarComponent from '../components/navbar';
import Bottom from '@components/footer';
import { Box, Typography, CssBaseline, GlobalStyles } from '@mui/material';
import '@styles/globals.scss';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function AboutSACC() {
  const [windowWidth, setWindowWidth] = useState(0);

  // Track window resize to handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Listen to window resize event
    window.addEventListener('resize', handleResize);

    // Set initial window width
    handleResize();

    return () => {
      // Clean up the event listener when the component is unmounted
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // If window width is less than 600px, hide the regular content and show mobile view
  if (windowWidth < 600) {
    return (
      <>
        <CssBaseline />
        <GlobalStyles
          styles={{
            html: { margin: 0, padding: 0, width: '100%', height: '100%' },
            body: { margin: 0, padding: 0, width: '100%', height: '100%', overflowX: 'hidden', overflowY: 'hidden' },
          }}
        />

        <Head>
          <title>About SACC</title>
        </Head>

        <NavbarComponent isSticky={true} />

        {/* Mobile View */}
        <Box
          sx={{
            backgroundColor: '#1D141A',
            color: 'white',
            minHeight: '100vh',
            marginTop: '68px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 5%',
            position: 'relative',
          }}
        >
          {/* Oval background shape */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: '80%',
              height: '500px',
              backgroundColor: '#29212D',
              borderRadius: '50%',
              zIndex: 0,
              top: '20%',
              left: '10%',
              boxShadow: '0 0 15px rgba(255, 99, 99, 0.5)',
            }}
          ></motion.div>

          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 'bold',
              marginBottom: '8px',
              fontSize: '3rem', // Increased size for mobile
                color: '#FF6363',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}
              >
              <span style={{ color: '#EFDFC2', fontSize: '2.5rem' }}>About</span>
              <br />
              <span style={{ color: '#FF6363', fontSize: '2.5rem' }}>SACC</span>
              </Typography>

              <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              style={{
                textAlign: 'center',
                marginTop: '20px',
                marginBottom: '30px',
                position: 'relative',
                zIndex: 1,
              }}
              >
              <Typography
                variant="h6"
                component="p"
                sx={{
                fontSize: '1rem',
                color: '#EAEAEA',
                lineHeight: 1.8,
                }}
              >
                Student Alumni Connect Cell (SACC) is a student-run organization that aims to foster connections
                between students, alumni, and the Institute. SACC provides mentorship, organizes events, and offers
                resources to help students and alumni engage with their alma mater and fellow alumni.
              </Typography>
              </motion.div>

              {/* Social Media Icons for Mobile */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              marginTop: '15px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.4 }} // Increased hover animation size
              transition={{ staggerChildren: 0.2 }}
            >
              <Image
                src="/assets/images/insta.png"
                alt="Instagram"
                width={45}
                height={45}
              />
            </motion.a>

            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.4 }} // Increased hover animation size
              transition={{ staggerChildren: 0.2 }}
            >
              <Image
                src="/assets/images/fb.png"
                alt="Facebook"
                width={45}
                height={45}
              />
            </motion.a>

            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.4 }} // Increased hover animation size
              transition={{ staggerChildren: 0.2 }}
            >
              <Image
                src="/assets/images/linkedin.png"
                alt="LinkedIn"
                width={45}
                height={45}
              />
            </motion.a>
          </Box>
        </Box>

        <Bottom />
      </>
    );
  }

  // Desktop View (for widths greater than or equal to 600px)
  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: { margin: 0, padding: 0, width: '100%', height: '100%' },
          body: { margin: 0, padding: 0, width: '100%', height: '100%', overflowX: 'hidden', overflowY: 'hidden' },
        }}
      />

      <Head>
        <title>About SACC</title>
      </Head>

      <NavbarComponent isSticky={true} />

      <Box
        sx={{
          backgroundColor: '#1D141A',
          color: 'white',
          minHeight: '100vh',
          marginTop: '68px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 5%',
          position: 'relative',
        }}
      >
        {/* Vertical Line Animation */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 2 }}
          style={{
            position: 'absolute',
            left: '5%',
            top: 0,
            width: '10px',
            backgroundColor: '#FF6363',
            zIndex: 10,
          }}
        />

        {/* SACC Logo Animation */}
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: '-30%', opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          whileHover={{ scale: 1.2 }}
          style={{
            position: 'absolute',
            top: '1.5%',
            right: '15%',
            zIndex: 10,
          }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'mirror',
            }}
          >
            <Image
              src="/assets/images/SACC_logo.png"
              alt="SACC Logo"
              width={250}
              height={250}
              style={{
                borderRadius: '50%',
                boxShadow: '0 0 20px rgba(255, 99, 99, 0.8)',
              }}
            />
          </motion.div>
        </motion.div>

        {/* Background Image Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            backgroundImage: 'url("/assets/images/x.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(5px)',
            opacity: 0.7,
          }}
        ></motion.div>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            top: '20%',
            right: '70%',
            marginBottom: '20px',
            textAlign: 'left',
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontWeight: 'bold',
              marginBottom: '8px',
              fontSize: '5rem',
              lineHeight: 1.2,
            }}
          >
            <span style={{ color: '#EFDFC2' }}>About</span>
            <br />
            <span style={{ color: '#FF6363' }}>SACC</span>
          </Typography>
        </motion.div>

        {/* Description Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-500px',
              left: '-40px',
              width: '1500px',
              height: '800px',
              backgroundColor: '#29212D',
              borderRadius: '50%',
              transform: 'rotate(-45deg)',
              zIndex: 0,
              border: '5px solid #FF6363',
              boxShadow: '0 0 15px rgba(255, 99, 99, 0.5)',
            }}
          ></div>

          <motion.div
            style={{
              borderRadius: '50px',
              padding: '30px 20px',
              maxWidth: '800px',
              top: '30px',
              left: '150px',
              position: 'relative',
              zIndex: 1,
            }}
            initial={{ opacity: 0, y: 20, x: 0 }}
            animate={{ opacity: 1, y: -30, x: 30 }}
            transition={{
              duration: 1,
              ease: 'easeOut',
            }}
          >
            <Typography
              variant="h6"
              component="p"
              sx={{
                fontSize: '1.4rem',
                color: '#EAEAEA',
                lineHeight: 1.8,
              }}
            >
              Student Alumni Connect Cell (SACC) is a student-run organization that aims to foster connections
              between students, alumni, and the Institute. SACC provides mentorship, organizes events, and offers
              resources to help students and alumni engage with their alma mater and fellow alumni.
            </Typography>
          </motion.div>
        </motion.div>

        {/* Social Media Section */}
        <motion.div
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 10 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            marginTop: '30px',
            textAlign: 'center',
            width: '100%',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              marginBottom: '10px',
              fontSize: '2rem',
              color: '#FF6363',
              position: 'relative',
              display: 'inline-block',
            }}
          >
            Follow us on social media
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '30px',
              marginTop: '15px',
            }}
          >
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              transition={{ staggerChildren: 0.2 }}
            >
              <Image
                src="/assets/images/insta.png"
                alt="Instagram"
                width={60}
                height={60}
              />
            </motion.a>

            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              transition={{ staggerChildren: 0.2 }}
            >
              <Image
                src="/assets/images/fb.png"
                alt="Facebook"
                width={60}
                height={60}
              />
            </motion.a>

            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              transition={{ staggerChildren: 0.2 }}
            >
              <Image
                src="/assets/images/linkedin.png"
                alt="LinkedIn"
                width={60}
                height={60}
              />
            </motion.a>
          </Box>
        </motion.div>

        {/* Horizontal Line at the bottom of the page */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5 }}
          style={{
            position: 'absolute',
            bottom: '12%',
            left: 0,
            height: '10px',
            backgroundColor: '#FF6363',
            zIndex: 20,
          }}
        ></motion.div>
      </Box>

      <Bottom />
    </>
  );
}
