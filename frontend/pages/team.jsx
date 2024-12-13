import Head from 'next/head';
import ParentBox from '../components/parent_box';
import NavbarComponent from '../components/navbar';
import { Box, CssBaseline, Container } from '@mui/material';
import '@styles/globals.scss'
import Bottom from '@components/footer';

// const ameyimg = "/assets/images/amey.png";

export default function Home() {
  const coordinators=[
    {
      name: "Rohan Gupta",
      imgSrc: "/assets/images/Rohan.jpeg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
      position :"Head",
    },
  ]
  const members = [

    
    // Add more members as needed
  ];
  const Events=[
    {
      name: "Bipasha Garg",
      imgSrc: "/assets/images/Bipasha.jpg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
      position:"Head",
    },
    {
      name: "Ashna Dua",
      imgSrc: "/assets/images/Ashna.jpeg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
    },
  ]
  const Outreach = [
    {
      name: "Deekshitha",
      imgSrc: "/assets/images/Deekshitha.jpg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
      position:"Head",
    },
    {
      name: "Gnaneswar",
      imgSrc: "/assets/images/Gnaneswar.jpeg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
    },
  ];
  const Tech=[
    {
      name: "Kriti Gupta",
      imgSrc: "/assets/images/Kriti.jpg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
      position:"Head",
    },
    {
      name: "Bhav Beri",
      imgSrc: "/assets/images/Bhav.jpg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
    },
  ]
  const Content=[
    {
      name: "Pratyush",
      imgSrc: "/assets/images/Pratyush.jpg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
      position:"Head",
    },
    {
      name: "Kunal Angadi",
      imgSrc: "/assets/images/Kunal.jpg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
    },
  ]
  const Social=[
    {
      name: "Amey Karan",
      imgSrc: "/assets/images/amey.png",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
      position:"Head",
    },
    
    {
      name: "Shubham Goel",
      imgSrc: "/assets/images/Shubham.jpeg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
    },
  ]
  const video = [
    {
      name: "Clubs Council",
      imgSrc: "/assets/images/Clubs_Council.jpeg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
    },
   
  ];
  const Design=[
    {
      name: "Aditya Jain Pansari",
      imgSrc: "/assets/images/Aditya.jpeg",
      twitterLink: "#",
      linkedinLink: "#",
      githubLink: "#",
      position:"Head",
    },
  ];

  return (
    <section>
      <NavbarComponent isSticky={true} />

      <Box sx={{ backgroundColor: '#1D141A', color: 'white', minHeight: '100vh', marginTop: '55px' }}>
        <CssBaseline />
          <ParentBox title="Co-ordinators" members={coordinators} />
          <ParentBox title="Events" members={Events} />
          <ParentBox title="Outreach" members={Outreach} />
          <ParentBox title="Tech" members={Tech} />
          <ParentBox title="Design" members={Design} />
          <ParentBox title="Content-writing" members={Content} />
          <ParentBox title="Social media" members={Social} />
          <ParentBox title="Videography" members={video} />
      </Box>
      
      <div><Bottom /></div>
    </section>
  );
}
