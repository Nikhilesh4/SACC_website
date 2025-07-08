import NavbarComponent from "../components/navbar";
import { Box, Grid } from "@mui/material";
import "@styles/yearbooks.scss";
import Bottom from "@components/footer";
import { useMediaQuery, useTheme } from "@mui/material";

const alumniData = [
    { year: "2021" },
];

export default function Alumni() {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <section>
            <NavbarComponent isSticky={true} />
            <Box className="backdrop">
                <div className="yearbook-container">
                    <div className="text-content">
                        <h1 className="title">Alumni</h1>
                        <p className="subtitle">Meet Our Alumni Batches!</p>
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
                    {alumniData.map((alumni, index) => (
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
                        >
                            {alumni.year === "2021" ? (
                                <a href="/alumni/2021" style={{ textDecoration: 'none', width: '100%' }}>
                                    <div className="alumniCard">
                                        <Box className="alumniCardLabel">
                                            <h4>Batch of</h4>
                                            <h2>{alumni.year}</h2>
                                        </Box>
                                    </div>
                                </a>
                            ) : (
                                <div className="alumniCard">
                                    <Box className="alumniCardLabel">
                                        <h4>Batch of</h4>
                                        <h2>{alumni.year}</h2>
                                    </Box>
                                </div>
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Bottom />
        </section>
    );
} 