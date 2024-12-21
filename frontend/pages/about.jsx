import Head from 'next/head';
import NavbarComponent from '../components/navbar';
import Bottom from '@components/footer';
import { Box, Typography, CssBaseline, GlobalStyles } from '@mui/material';
import '@styles/globals.scss';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';

export default function AboutSACC() {
    useEffect(() => {
      const cursor = document.createElement('div');
      cursor.id = 'custom-cursor';
      cursor.style.position = 'absolute';
      cursor.style.width = '15px';
      cursor.style.height = '15px';
      cursor.style.border = '2px solid #FF6363';
      cursor.style.borderRadius = '50%';
      cursor.style.pointerEvents = 'none';
      cursor.style.zIndex = '9999';
      cursor.style.transition = 'transform 0.1s ease-out';
      document.body.appendChild(cursor);
    
      const trailDuration = 300; // milliseconds for how long the trails last
    
      // Function to create the trail effect
      const createTrail = (x, y) => {
        const trail = document.createElement('div');
        trail.style.position = 'absolute';
        trail.style.width = '10px';
        trail.style.height = '10px';
        trail.style.borderRadius = '50%';
        trail.style.backgroundColor = '#FF6363';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9998';
        trail.style.left = `${x - 5}px`;
        trail.style.top = `${y - 5}px`;
        trail.style.transition = `opacity ${trailDuration / 1000}s ease-out, transform ${trailDuration / 1000}s ease-out`;
    
        document.body.appendChild(trail);
    
        setTimeout(() => {
          trail.style.opacity = '0';
          trail.style.transform = 'scale(0)';
        }, 10);
    
        setTimeout(() => {
          document.body.removeChild(trail);
        }, trailDuration);
      };
    
      const moveCursor = (e) => {
        cursor.style.transform = `translate(${e.clientX - 7}px, ${e.clientY - 7}px)`;
        createTrail(e.clientX, e.clientY); // Create a trail effect
      };
    
      document.addEventListener('mousemove', moveCursor);
      return () => {
        document.body.removeChild(cursor);
        document.removeEventListener('mousemove', moveCursor);
      };
    }, []);    

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
        <CssBaseline />

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
            backgroundColor: '#FF6363',   // Vline color
            zIndex: 10,
          }}
        />

        {/* SACC Logo Animation */}
        <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: '-30%', opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        whileHover={{ scale: 1.2}} // Slight scaling and rotation on hover
        style={{
            position: 'absolute',
            top: '1.5%', // Adjust vertical alignment
            right: '15%', // Adjust horizontal alignment
            zIndex: 10,
        }}
        >
        {/* Continuous Hover Animation */}
        <motion.div
            animate={{ y: [0, -10, 0] }} // Up and down movement
            transition={{
            duration: 2, // Duration of the hover animation
            repeat: Infinity, // Loop the animation infinitely
            repeatType: 'mirror', // Reverse direction after each cycle
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

          {/* Underline animation for Title */}
          <motion.span
            style={{
              position: 'absolute',
              bottom: 0,
              left: '0%',
              width: '100%',
              height: '2px',
              backgroundColor: '#FF6363',
              transformOrigin: 'center',
              transform: 'translateX(-50%)',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: 1.2,
              duration: 1,
              type: 'spring',
              stiffness: 50,
            }}
          />
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
        initial={{ opacity: 0, y: 20, x: 0 }} // Start slightly down and to the left
        animate={{ opacity: 1, y: -30, x: 30 }} // Move up and to the right
        transition={{
            duration: 1, // Duration of the animation
            ease: 'easeOut', // Smooth easing
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
            {/* Underline animation for Social Media */}
            <motion.span
              style={{
                position: 'absolute',
                bottom: 0,
                left: '0%',
                width: '100%',
                height: '2px',
                backgroundColor: '#FF6363',
                transformOrigin: 'center',
                transform: 'translateX(-50%)',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 1.2,
                duration: 1,
                type: 'spring',
                stiffness: 50,
              }}
            />
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
            backgroundColor: '#FF6363',   // hline color
            zIndex: 20,
          }}
        ></motion.div>

<motion.div
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: '-4%', opacity: 1 }}
  transition={{ duration: 1.5, ease: 'easeOut' }}
  whileHover={{
    scale: 1.2, // Slight scaling on hover
    boxShadow: '0 0 20px rgba(0, 0, 255, 0.8)', // Blue box-shadow on hover
  }}
  style={{
    position: 'absolute',
    bottom: '10%',
    left: '1.5%',
    zIndex: 100,
    borderRadius: '50%',
    overflow: 'hidden',
  }}
>
<motion.div
  style={{
    width: 150, 
    height: 150, 
    borderRadius: '50%', 
    border: '25px solid #002b95', // Outline color
    backgroundColor: '#00ed95', // Background color
    boxShadow: '0 0 20px rgba(0, 0, 255, 0.5)', // Blue box-shadow
  }}
/>
</motion.div>
      </Box>
      <Bottom />
    </>
  );
}
