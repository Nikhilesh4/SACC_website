import '@styles/globals.scss';
import Bottom from '@components/footer';
import NavbarComponent from '@components/navbar';
import '@styles/events_page/events.scss';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import splitStringUsingRegex from '@lib/events_page/splitStringUsingRegex';
import Typewriter from '@lib/events_page/TypeWriter';
import GradualSpacing from '@lib/events_page/gradualSpacing';
import { Box, CssBaseline, Card, CardActionArea, CardContent, Container } from '@mui/material';

// Enable hover effect on the events div for laptops and desktops: If set to false, user has to click to view event details
const enableHoverEffect = false;

const eventsData = [
    { id: 1, name: 'College Karawan', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur pariatur excepturi quia, quibusdam tenetur, enim porro voluptas veritatis laborum ducimus placeat sit rem aut illum facilis neque. Aut, nobis iusto!' },
    { id: 2, name: 'Chai pe Charcha', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem repudiandae obcaecati at asperiores, tenetur optio dignissimos. Libero ullam dolores, repellendus aut numquam rem nostrum inventore eaque ratione, consectetur dicta id.' },
    { id: 3, name: 'Convocation', description: 'Graduation ceremony for final-year students.' },
    { id: 4, name: 'Alumni Unfiltered', description: 'Networking event with college alumni.' },
    { id: 5, name: 'Opportunities Awareness Talk', description: 'Insights into career opportunities and growth.' }
];

// The title events and underline 
const EventsTitle = ({ isMobile, onComplete }) => {
    const [underlineComplete, setUnderlineComplete] = useState(false);

    useEffect(() => {
        if (underlineComplete) {
            onComplete();
        }
    }, [underlineComplete, onComplete]);

    return (
        <div className="events-title">
            {/* Title with Wavy Text */}
            <div className="title-and-full-stop">
                <GradualSpacing text="Events" containerClassName='title-container' className='title-letters' onCompletion={() => setUnderlineVisible(true)} />
            </div>
            {/* Underline Animation */}
            <motion.div
                className="underline"
                initial={{ width: 0 }}
                animate={{ width: "10%" }}
                transition={{
                    duration: 0.69,
                    ease: "easeInOut",
                }}
                onAnimationComplete={() => setUnderlineComplete(true)}
            />

        </div>
    );
};

const EventsGrid = ({ isMobile, titleAnimationComplete }) => {
    const [hoveredEvent, setHoveredEvent] = useState(null);

    const handleMouseEnter = (id) => {
        setHoveredEvent(id);
    };

    const handleMouseLeave = () => {
        setHoveredEvent(null);
    };

    const handleClick = (id) => {
        if (hoveredEvent === id) {
            // If already active, simulate second click (mouseleave)
            handleMouseLeave();
        } else {
            // First click: simulate hover
            handleMouseEnter(id);
        }
    };

    const LETTER_DELAY = 0.05;
    const charRevealVariants = {
        hidden: { opacity: 0 },
        reveal: { opacity: 1 },
    };

    const staggerDelay = isMobile ? 0.008 : 0.008;
    return (
        <Container maxWidth={false} className="event-grid">
            {titleAnimationComplete && eventsData.map((event) => (
                <motion.div
                    key={event.id}
                    className={`event-row ${isMobile ? 'mobile' : 'desktop'} ${event.id % 2 === 0 ? 'normal' : 'reversed'
                        } e${event.id} ${hoveredEvent === event.id ? 'active' : 'not-active'
                        }`}

                    // Hover effect for laptops and desktops: If enabled
                    {...(!isMobile && enableHoverEffect && {
                        onMouseEnter: () => handleMouseEnter(event.id),
                        onMouseLeave: handleMouseLeave,
                    })}

                    // For touch devices: which do not have a pointing device
                    onClick={() => handleClick(event.id)}

                    initial={{ scaleX: 0, transformOrigin: event.id % 2 === 0 ? 'right' : 'left' }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    viewport={{ once: true }}

                >
                    <>
                        {/* LARGE DIV */}
                        <motion.Box
                            className={`large-card ${hoveredEvent === event.id ? 'active' : 'not-active'
                                } ${isMobile ? 'mobile' : 'desktop'}`}

                        >


                            {hoveredEvent === event.id ? (
                                <motion.p className="event-description"
                                    initial="hidden"
                                    whileInView="reveal"
                                    transition={{ staggerChildren: staggerDelay }}

                                >
                                    {
                                        isMobile ? <Typewriter text={event.name} /> : null
                                    }
                                    {splitStringUsingRegex(event.description).map((char, i) => (
                                        <motion.span
                                            key={i}
                                            transition={{ duration: 0.5 }}
                                            variants={charRevealVariants}
                                            className={`large-card-letter ${isMobile ? 'mobile' : 'desktop'}`}

                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </motion.p>
                            )
                                : (
                                    <h2>{event.name}</h2>
                                )}
                        </motion.Box>

                        {/* SMALL DIV */}
                        <motion.Box
                            className={`small-card ${hoveredEvent === event.id ? 'active' : 'not-active'
                                } ${isMobile ? 'mobile' : 'desktop'}`
                            }
                        >

                            {hoveredEvent === event.id &&
                                <Typewriter text={event.name} delay={LETTER_DELAY} className='small-card-letter' />
                            }

                        </motion.Box>

                    </>

                </motion.div>
            ))}
        </Container>
    );
}



export default function Events() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);
    return (
        <section>
            {/* Navbar */}
            <NavbarComponent isSticky={true} />

            <Box
                /* Push content below navbar */
                sx={{
                    backgroundColor: '#1D141A',
                    paddingTop: '10vh'
                }}
            >
                {/* Page Content */}
                <CssBaseline />
                {/* Title */}
                <EventsTitle isMobile={isMobile} onComplete={() => setTitleAnimationComplete(true)} />
                <EventsGrid isMobile={isMobile} titleAnimationComplete={titleAnimationComplete} />
            </Box>

            {/* Footer */}
            <Bottom />
        </section>
    );
}
