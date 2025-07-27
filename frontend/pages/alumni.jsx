import NavbarComponent from "../components/navbar";
import { Box, Grid } from "@mui/material";
import "@styles/yearbooks.scss";
import Bottom from "@components/footer";
import { useMediaQuery, useTheme } from "@mui/material";
import { getAlumniYears } from "../lib/alumni";

// Get all alumni years at build time
export async function getStaticProps() {
    const years = getAlumniYears();

    return {
        props: {
            alumniYears: years
        },
        // Revalidate every hour to pick up new alumni files
        revalidate: 3600
    };
}

export default function Alumni({ alumniYears }) {
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
                    {alumniYears.length > 0 ? (
                        alumniYears.map((year, index) => (
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
                                <a href={`/alumni/${year}`} style={{ textDecoration: 'none', width: '100%' }}>
                                    <div className="alumniCard">
                                        <Box className="alumniCardLabel">
                                            <h4>Batch of</h4>
                                            <h2>{year}</h2>
                                        </Box>
                                    </div>
                                </a>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12} style={{ textAlign: 'center', marginTop: '40px' }}>
                            <h3 style={{ color: '#bba6d6' }}>No alumni batches found</h3>
                        </Grid>
                    )}
                </Grid>
            </Box>
            <Bottom />
        </section>
    );
} 