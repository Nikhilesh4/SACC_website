import React, { useMemo } from 'react'; 
import { Box, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { red } from '@mui/material/colors';

type MemberBoxProps = {
  name: string;
  imgSrc: string;
  twitterLink: string;
  linkedinLink: string;
  githubLink: string;
  position:string
};

const MemberBox: React.FC<MemberBoxProps> = ({ name, imgSrc, twitterLink, linkedinLink, githubLink ,position}) => {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

  // Use useMemo to only recalculate when compnent is re-rendered
  const borderColor = useMemo(() => {
    const colors = ['#ffadad', '#bdb2ff', '#a8d1d1', '#ffb9eb', '#8bc9ff']; 
    const randomIndex = Math.floor(Math.random() * colors.length); 
    return colors[randomIndex]; 
  }, []); // Empty dependency array so this only runs once

  return (
    <Box
      sx={{
        flex: isPhone ? '1' : '0 0 calc(80% - 2rem)',
        margin: isPhone ? '2%' : '6%',
        width: isPhone ? '100%' : '80%',
        backgroundColor: '#e2e4e5',
        color: '#3a4052',
        padding: '2vh',
        border: '1px solid white', 
        borderRadius: '8px',
        boxSizing: 'border-box',
        marginBottom: '4rem',
        boxShadow: `0 0 0px`, 
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          backgroundColor: '#3a4052',
          color: '#e2e4e5',
          border: '1px solid white', 
          '& .icon': {
            color: '#e2e4e5',
          },
        },
      }}
    >
      <img
        src={imgSrc}
        alt="Box 1 Image"
        style={{
          width: '100%',
          maxHeight: isPhone ? '200px' : '275px', 
          height: '90%',
          objectFit: 'cover',
          borderRadius: '8px',
          marginBottom: '2vh',
        }}
      />
      <Typography variant="h2" align="center" sx={{ fontFamily: 'anona', fontSize: isPhone ? '1.5rem' : '2rem', marginBottom: '0.25rem' }}>
        {name}
        {/* {position} */}
      </Typography>
      <Typography variant="h3" align="center" sx={{ fontFamily: 'Roboto', fontSize: isPhone ? '1rem' : '1.5rem', marginBottom: '0.25rem' }}>
        {position}

      </Typography>

      <Box
        sx={{
          textAlign: 'right',
          '& a': {
            color: '#3a4052',
            marginRight: '5%',
            '&:hover': {
              color: '#e2e4e5',
            },
          },
        }}
      >
        <IconButton href={twitterLink} color="inherit" className="icon">
          <TwitterIcon />
        </IconButton>
        <IconButton href={linkedinLink} color="inherit" className="icon">
          <LinkedInIcon />
        </IconButton>
        <IconButton href={githubLink} color="inherit" className="icon">
          <GitHubIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MemberBox;