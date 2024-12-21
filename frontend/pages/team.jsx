import Head from 'next/head';
import ParentBox from '../components/parent_box';
import NavbarComponent from '../components/navbar';
import { Box, CssBaseline, Container } from '@mui/material';
import '@styles/globals.scss'
import Bottom from '@components/footer';

// const ameyimg = "/assets/images/amey.png";

export default function Home() {
  const members = [
    {
      name: "Amey Karan",
      imgSrc: "/assets/images/amey.png",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
    },
    {
      name: "Ashna Dua",
      imgSrc: "/assets/images/Ashna.jpeg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
    },
    {
      name: "Shubham Goel",
      imgSrc: "/assets/images/Shubham.jpeg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
    },
    {
      name: "Kriti Gupta",
      imgSrc: "/assets/images/Kriti.jpg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
    },
    {
      name: "Bhav Beri",
      imgSrc: "/assets/images/Bhav.jpg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
    },
    {
      name: "Rohan Gupta",
      imgSrc: "/assets/images/Rohan.jpeg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
    },
    // Add more members as needed
  ];
  const other_contributers = [
    {
      name: "Deekshitha",
      imgSrc: "/assets/images/Deekshitha.jpg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
    },
    {
      name: "Gnaneswar",
      imgSrc: "/assets/images/Gnaneswar.jpeg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
    },
    {
      name: "Pratyush",
      imgSrc: "/assets/images/Pratyush.jpg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
    },
    {
      name: "Kunal Angadi",
      imgSrc: "/assets/images/Kunal.jpg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
    },
    {
      name: "Bipasha Garg",
      imgSrc: "/assets/images/Bipasha.jpg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
    },
  ];
  const special_mentions = [
    {
      name: "Clubs Council",
      imgSrc: "/assets/images/Clubs_Council.jpeg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
    },
    {
      name: "Aditya Jain Pansari",
      imgSrc: "/assets/images/Aditya.jpeg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
    },
  ];

  return (
    <section>
      <NavbarComponent isSticky={true} />

      <Box sx={{ backgroundColor: '#1D141A', color: 'white', minHeight: '100vh', marginTop: '68px' }}>
        <CssBaseline />
          <ParentBox title="Meet the team" members={members} />
          <ParentBox title="Other Contributers" members={other_contributers} />
          <ParentBox title="Special Mentions" members={special_mentions} />
      </Box>
      
      <div><Bottom /></div>
    </section>
  );
}
