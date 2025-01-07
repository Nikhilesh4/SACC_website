import React, { useMemo } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";

// import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { red } from "@mui/material/colors";
import { InstagramLogoIcon } from "@radix-ui/react-icons";

type MemberBoxProps = {
  name: string;
  imgSrc: string;
  InstaID: string;
  linkedinLink: string;
  githubLink: string;
  position: string;
};

const MemberBox: React.FC<MemberBoxProps> = ({
  name,
  imgSrc,
  InstaID,
  linkedinLink,
  githubLink,
  position,
}) => {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));

  // Use useMemo to only recalculate when compnent is re-rendered
  const borderColor = useMemo(() => {
    const colors = ["#ffadad", "#bdb2ff", "#a8d1d1", "#ffb9eb", "#8bc9ff"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }, []); // Empty dependency array so this only runs once

  return (
 <Box
  sx={{
    flex: isPhone ? "1" : "0 0 calc(80% - 2rem)",
    margin: isPhone ? "2%" : "6%",
    width: isPhone ? "100%" : "80%",
    backgroundColor: "#e2e4e5",
    color: "#3a4052",
    padding: "2vh",
    border: "1px solid white",
    borderRadius: "8px",
    boxSizing: "border-box",
    marginBottom: "4rem",
    boxShadow: `0 0 0px`, // initial shadow (no shadow)
    transition: "background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease", // added transition for box-shadow
    "&:hover": {
      transform: "scale(1.1)",
      backgroundColor: "transparent",
      color: "#e2e4e5",
      border: "1px solid white",
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)", // added shadow on hover
      "& .icon": {
        color: "#e2e4e5",
      },
    },
  }}
>
  <img
    src={imgSrc}
    alt="Box 1 Image"
    style={{
      width: "100%",
      maxHeight: isPhone ? "200px" : "275px",
      height: "90%",
      objectFit: "cover",
      borderRadius: "8px",
      marginBottom: "2vh",
    }}
  />
  <Typography
    variant="h2"
    align="center"
    sx={{
      fontFamily: "anona",
      fontSize: isPhone ? "1.5rem" : "2rem",
      marginBottom: "0.25rem",
    }}
  >
    {name}
  </Typography>
  <Typography
  variant="h3"
  align="center"
  sx={{
    fontFamily: "Roboto",
    fontSize: isPhone ? "1rem" : "1.5rem",
    marginBottom: "0.25rem",
    color: "inherit" , // Corrected logic
  }}
>
  {position}
</Typography>


  <Box
    sx={{
      textAlign: "right",
      "& a": {
        color: "#3a4052",
        marginRight: "5%",
        "&:hover": {
          color: "#e2e4e5",
        },
      },
    }}
  >
    <IconButton href={InstaID} color="inherit" className="icon">
      <InstagramLogoIcon />
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
