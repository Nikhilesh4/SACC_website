import React from 'react';
import MemberBox from './member_box';
import { Box, Typography, Grid, useTheme } from '@mui/material';

type MemberBoxProps = {
  name: string;
  imgSrc: string;
  twitterLink: string;
  linkedinLink: string;
  githubLink: string;
  position:string;
};

type ParentBoxProps = {
  title: string;
  members: MemberBoxProps[];
};

const ParentBox: React.FC<ParentBoxProps> = ({ title, members }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      m: 0, p: 0,
      marginLeft: { xs: 5, sm: 8, md: 10, lg: 15 },
      marginRight: { xs: 5, sm: 8, md: 10, lg: 15 },
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      alignContent: "center",
    }}>
      <Typography variant="h1" align="center" sx={{ pt: 2, fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, marginBottom: '0.25vh' }}>{title}</Typography>
      <Grid container justifyContent="center">
      {members.slice(0, 100).map((member, index) => (
        <Grid item xs={8} sm={6} md={4} lg={3} key={index}>
          <MemberBox 
            name={member.name} 
            imgSrc={member.imgSrc} 
            twitterLink={member.twitterLink} 
            linkedinLink={member.linkedinLink} 
            githubLink={member.githubLink} 
            position={member.position}
          />
        </Grid>
      ))}
      </Grid>
    </Box>
  );
};
export default ParentBox;