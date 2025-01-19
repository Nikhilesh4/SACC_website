import '@styles/globals.scss';
import '@styles/events_page/events.scss';
import React, { useState, useEffect } from 'react';
import Bottom from '@components/footer';
import Typewriter from '@lib/events_page/TypeWriter';
import GradualSpacing from '@lib/events_page/gradualSpacing';
import NavbarComponent from '@components/navbar';
import splitStringUsingRegex from '@lib/events_page/splitStringUsingRegex';
import { motion } from 'framer-motion';
import { Box, CssBaseline, Container } from '@mui/material';

// Enable hover effect on the events div for laptops and desktops: If set to false, user has to click to view event details
const enableHoverEffect = false;

const eventsData = [
    { id: 1, name: 'Opportunities Awareness Talk', description: "The Opportunity Awareness Talks (OAT) aims to introduce IIIT students to diverse career paths beyond the institute's core focus on Computer Science and Electronics. Featuring distinguished alumni from various fields, each session delves into niche topics, offering insights on breaking into and excelling in those domains. Through engaging discussions and direct interaction with speakers, OAT helps students explore potential career paths and stay informed about industry trends." },
    { id: 2, name: 'Chai pe Charcha', description: 'Chai Pe Charcha is a candid and engaging platform, bringing the IIIT family together for meaningful discussions over a cup of tea. Alumni from diverse backgrounds share their journeys, expertise and insights, covering topics from career guidance and industry trends to personal anecdotes and mentorship. Featuring interactive sessions, it fosters connections, encourages open dialogue and helps students navigate college challenges while preparing for life beyond.' },
    { id: 3, name: 'Alumni Unfiltered', description: 'Alumni Unfiltered is a casual and dynamic talk session held during induction week, where freshers connect with alumni to seek guidance and hear stories from their college days and life experiences. This engaging platform allows open discussions on topics ranging from academics to college life, humorously addressing common rookie mistakes, emphasizing time management, and providing clarity on misconceptions. The session offers freshers valuable insights and a glimpse into the journey ahead, fostering a meaningful connection with the alumni.' },
    { id: 4, name: 'Yearbook & Farewell', description: "SACC is involved in the farewell ceremony for the graduating batch, where they receive their yearbooks and other mementos. The Yearbook is a cherished keepsake for each graduating batch, capturing their unique journey through testimonials, inside jokes, comments, fun captions, and pictures. From the excitement of orientation to the milestone of graduation, the Yearbook allows students to relive their college days, celebrating unforgettable moments and lifelong bonds formed at IIIT." },
    { id: 5, name: 'Convocation', description: "The Yearbook is a cherished keepsake for each graduating batch, capturing their unique journey through testimonials, inside jokes, comments, fun captions, and pictures. Adding a playful touch, it features polls like 'Most Studious', 'Best Dressed' and 'Weirdest' offering a lighthearted glimpse into the batch's collective personality. From the excitement of orientation to the milestone of graduation, the Yearbook allows students to relive their college days, celebrating unforgettable moments and lifelong bonds formed at IIIT." },
    { id: 6, name: 'College Karawan', description: 'College Karwaan is an online compendium, curated by the SACC, that celebrates the journey of students at IIIT Hyderabad. Narrated by graduating students, these articles capture the highs, lows and defining moments of college life—from the nervous excitement of the first year to the challenges of final-year placements. Serving as a repository of priceless memories, College Karwaan preserves the legacy of those who have walked through the hallowed halls of IIIT Hyderabad.' },
    { id: 7, name: 'Vision Talks (proposal)', description: 'An annual event that coincides with the Foundation Day of the Institute, where prominent alumni from different fields are invited to deliver talks and share their insights and experiences with the students' }
];

// The title and underline 
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

    // Animation Controls

    // Char reveal delay in Typewriter (Title)
    const LETTER_DELAY = 0.037;
    // Char reveal delay in Events Description 
    const staggerDelay = 0.002;
    
    const charRevealVariants = {
        hidden: { opacity: 0 },
        reveal: { opacity: 1 },
    };

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
                                        isMobile ? <Typewriter text={event.name} delay={LETTER_DELAY} className='large-card-title'/> : null
                                    }
                                    {splitStringUsingRegex(event.description).map((char, i) => (
                                        <motion.span
                                            key={i}
                                            transition={{ duration: 0.5 }}
                                            variants={charRevealVariants}
                                            className={`large-card-text ${isMobile ? 'mobile' : 'desktop'}`}

                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </motion.p>
                            )
                                : (
                                    //Large div not active : Event Name
                                    <h2 className="large-card-title">{event.name}</h2>
                                )}
                        </motion.Box>

                        {/* SMALL DIV */}
                        <motion.Box
                            className={`small-card ${hoveredEvent === event.id ? 'active' : 'not-active'
                                } ${isMobile ? 'mobile' : 'desktop'}`
                            }
                        >

                            {hoveredEvent === event.id &&
                                <Typewriter text={event.name} delay={LETTER_DELAY} className='small-card-text' />
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
