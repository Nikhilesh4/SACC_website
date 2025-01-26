import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
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

  const borderColor = useMemo(() => {
    const colors = ["#ffadad", "#bdb2ff", "#a8d1d1", "#ffb9eb", "#8bc9ff"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }, []);

  const nameRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(isPhone ? 24 : 32);

  useEffect(() => {
    const resizeFont = () => {
      if (nameRef.current) {
        const parentWidth = nameRef.current.offsetWidth;
        const childWidth = nameRef.current.scrollWidth;

        if (childWidth > parentWidth) {
          setFontSize((prev) => prev - 1);
        }
      }
    };

    resizeFont();
  }, [name]);

  return (
    <Box
      sx={{
        flex: "1 1 auto",
        margin: "2%",
        backgroundColor: "#ccc",
        color: "#3a4052",
        padding: "2vh",
        border: "1px solid white",
        borderRadius: "8px",
        boxSizing: "border-box",
        boxShadow: "0 0 0px",
        transition: "background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.1)",
          backgroundColor: "transparent",
          color: "#e2e4e5",
          border: "1px solid white",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      {/* Image Container */}
      <Box
        sx={{
          width: "100%",
          paddingTop: "100%", // Ensures a 1:1 aspect ratio
          position: "relative",
          overflow: "hidden",
          borderRadius: "8px",
          marginBottom: "2vh",
        }}
      >
        <img
          src={imgSrc}
          alt={name}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Member Details */}
      <Typography
        variant="h2"
        align="center"
        ref={nameRef}
        sx={{
          fontFamily: "anona",
          fontSize: `${fontSize}px`,
          lineHeight: 1.2,
          marginBottom: "0.25rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%",
          "&:hover": {
            overflow: "visible",
          },
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
        }}
      >
        {position}
      </Typography>
      <Box
        sx={{
          textAlign: "center",
          "& a": {
            color: "#3a4052",
            justifyContent: "center",
            "&:hover": {
              color: "#e2e4e5",
            },
          },
        }}
      >
        <IconButton href={InstaID} color="inherit">
          <InstagramLogoIcon />
        </IconButton>
        <IconButton href={linkedinLink} color="inherit">
          <LinkedInIcon />
        </IconButton>
        <IconButton href={githubLink} color="inherit">
          <GitHubIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MemberBox;
