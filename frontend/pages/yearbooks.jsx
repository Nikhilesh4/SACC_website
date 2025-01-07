import Head from "next/head";
import ParentBox from "../components/parent_box";
import NavbarComponent from "../components/navbar";
import { Box, CssBaseline, Container, Grid } from "@mui/material";
import "@styles/yearbooks.scss";
import "@styles/globals.scss";
import Bottom from "@components/footer";
import { useMediaQuery, useTheme } from "@mui/material";
const yearbookData = [
  {
    year: "2k20",
    pdfLink: "/assets/yearbooks/2020.pdf",
    previewImage: "/assets/images/preview2020.jpg",
  },
  {
    year: "2k19",
    pdfLink: "/assets/yearbooks/2019.pdf",
    previewImage: "assets/yearbookimages/image_YB19_1.jpg",
  },
  {
    year: "2k14",
    pdfLink: "/assets/yearbooks/2018.pdf",
    previewImage: "/assets/images/preview2018.jpg",
  },
  {
    year: "2k15",
    pdfLink: "/assets/yearbooks/2017.pdf",
    previewImage: "/assets/images/preview2017.jpg",
  },
];

export default function Home() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen size is xs
  return (
    <section>
      <NavbarComponent isSticky={true} />
      <Box className="backdrop">
        <div className="yearbook-container">
          <div className="text-content">
            <h1 className="title">Yearbooks</h1>
            <p className="subtitle">Revisit the Memories!</p>
          </div>
          <img className="image" src="/assets/images/fly.webp" alt="Butterfly" />
        </div>

        <Grid
          container
          spacing={9}
          justifyContent="center"
          alignItems="center"
          className="yearbooksGrid"
        >
          {yearbookData.map((yearbook, index) => {
            const isLastInRow =
              (index + 1) % 3 === 0 || index === yearbookData.length - 1; // Adjust for items per row
            // const isXs = false; // Example condition for screen size

            return (
              <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={4.15}
              lg={4.01}
              display="flex"
              justifyContent="center"
              alignItems="center"
              className="yearbookContainer"
              >
              <a
                href={`${yearbook.year}.html`}
                className="yearbookPreview"
                sx={{
                width: {
                  xs: "100%",
                  sm: "50%",
                  md: "33.33%",
                  lg: "25%",
                },
                padding: "0 8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative", // Ensure relative positioning for lines
                textDecoration: "none", // Remove underline from link
                }}
              >
                {index === 0 && !isXs && (
                <div className="dashedLine">
                  <div
                  style={{
                    position: "relative",
                    bottom: "26vh",
                    right: "34%",
                    width: "1vw",
                    height: "auto", // Ensure the height adjusts proportionally
                    maxWidth: "100%", // Set a max width for larger screens
                    maxHeight: "100%", // Ensure the container doesn't grow too large
                  }}
                  >
                  <img src="/assets/images/t.webp" alt="" />
                  </div>
                </div>
                )}
                <Box
                className="yearbookLabel"
                sx={{
                  textAlign: "center",
                }}
                >
                <h4>Batch of</h4>
                <h2>{yearbook.year}</h2>
                </Box>

                {/* Dashed Line for Even-Indexed Items */}
                {index % 2 === 0 && !isXs && (
                <div className="dashedLine">
                  <div
                  style={{
                    position: "absolute",
                    top: "40%",
                    left: "102%",
                    width: "30vw",
                    height: "auto", // Ensure the height adjusts proportionally
                    maxWidth: "100%", // Set a max width for larger screens
                    maxHeight: "100%", // Ensure the container doesn't grow too large
                  }}
                  >
                  <img
                    src="/assets/images/p.webp"
                    alt=""
                    style={{
                    width: "100%", // Make the image adapt to the container's width
                    height: "auto", // Maintain the aspect ratio
                    }}
                  />
                  </div>
                </div>
                )}
                {index == 1 && !isXs && (
                <div className="dashedLine">
                  <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "100%",
                    width: "1vw",
                    height: "auto", // Ensure the height adjusts proportionally
                    maxWidth: "40%", // Set a max width for larger screens
                    maxHeight: "100%", // Ensure the container doesn't grow too large
                  }}
                  >
                  <img src="/assets/images/L.webp" alt="" />
                  </div>
                </div>
                )}
                {/* SVG for Last Box in a Row */}
              </a>
              </Grid>
            );
          })}
          {!isXs && (
            <div style={{ width: "100%", maxWidth: "750px", height: "auto" }}>
              <img src="/assets/images/f.webp" alt="" />
            </div>
          )}
        </Grid>
      </Box>

      <Bottom />
    </section>
  );
}
