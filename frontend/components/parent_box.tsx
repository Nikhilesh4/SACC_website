import React, { useState, useEffect, useRef } from 'react';
import MemberBox from './member_box';
import { Box, Typography, Grid } from '@mui/material';

type MemberBoxProps = {
  name: string;
  imgSrc: string;
  InstaID: string;
  linkedinLink: string;
  githubLink: string;
  position: string;
};

type ParentBoxProps = {
  title: string;
  members: MemberBoxProps[];
};

const ParentBox: React.FC<ParentBoxProps> = ({ title, members }) => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]); // Track visible items

  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Title observer to trigger animation when title is visible
  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        titleObserver.unobserve(titleRef.current);
      }
    };
  }, []);

  // Grid observer to trigger animation when grid is visible
  useEffect(() => {
    const gridObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGridVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      gridObserver.observe(gridRef.current);
    }

    return () => {
      if (gridRef.current) {
        gridObserver.unobserve(gridRef.current);
      }
    };
  }, []);

  // Item observer to trigger visibility for each grid item
  useEffect(() => {
    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !visibleItems.includes(Number(entry.target.id))) {
          setVisibleItems((prev) => [...prev, Number(entry.target.id)]);
        }
      });
    }, { threshold: 0.1 });

    const items = gridRef.current?.querySelectorAll('.grid-item');
    items?.forEach((item) => itemObserver.observe(item));

    return () => {
      items?.forEach((item) => itemObserver.unobserve(item));
    };
  }, [visibleItems]);

  return (
    <Box
      sx={{
        m: 0,
        p: 0,
        marginLeft: { xs: 5, sm: 8, md: 10, lg: 15 },
        marginRight: { xs: 5, sm: 8, md: 10, lg: 15 },
        paddingTop: 1,
        paddingBottom: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Title Section */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          pt: 2,
          pb: 2,
        }}
      >
        <Typography
          ref={titleRef}
          variant="h1"
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            color: 'rgba(248, 114, 114, 1)',
            fontWeight: 'bold',
            fontFamily: '"Noto Sans", serif',
            textAlign: 'center',
            position: 'relative',
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'all 0.6s ease-out',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: 0,
              width: titleVisible ? '100%' : '0%',
              height: '3px',
              backgroundColor: 'white',
              transition: 'width 0.6s ease-out',
              transformOrigin: 'left',
            },
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Grid Section */}
      <div ref={gridRef} style={{ width: '100%' }}>
        <Grid
          container
          justifyContent="center"
          spacing={2}
          sx={{
            opacity: gridVisible ? 1 : 0,
            transform: gridVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          {members.slice(0, 100).map((member, index) => (
            <Grid
              item
              xs={8}
              sm={6}
              md={4}
              lg={3}
              key={index}
              className="grid-item"
              id={String(index)} // Assign a unique id to each grid item
              sx={{
                opacity: visibleItems.includes(index) ? 1 : 0,
                transform: visibleItems.includes(index) ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s ease-out',
              }}
            >
              <MemberBox
                name={member.name}
                imgSrc={member.imgSrc}
                InstaID={member.InstaID}
                linkedinLink={member.linkedinLink}
                githubLink={member.githubLink}
                position={member.position}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
};

export default ParentBox;
