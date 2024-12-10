import Head from 'next/head';
import ParentBox from '../components/parent_box';
import NavbarComponent from '../components/navbar';
import { Box, CssBaseline, Container, Grid } from '@mui/material';
import '@styles/yearbooks.scss';
import '@styles/globals.scss';
import Bottom from '@components/footer';

const yearbookData = [
  {
    year: '2k20',
    pdfLink: '/assets/yearbooks/2020.pdf',
    previewImage: '/assets/images/preview2020.jpg'
  },
  {
    year: '2k19',
    pdfLink: '/assets/yearbooks/2019.pdf',
    previewImage: '/assets/images/preview2019.jpg'
  },
  {
    year: '2k18',
    pdfLink: '/assets/yearbooks/2018.pdf',
    previewImage: '/assets/images/preview2018.jpg'
  },
  {
    year: '2k17',
    pdfLink: '/assets/yearbooks/2017.pdf',
    previewImage: '/assets/images/preview2017.jpg'
  }
];

export default function Home() {
  return (
    <section>
      <NavbarComponent isSticky={true} />

      <Box className="backdrop">
        <h1 className="title">Yearbooks</h1>
        <p className="subtitle">Revisit the Memories!</p>

        <Grid container spacing={11} justifyContent="center" className="yearbooksGrid">
          {yearbookData.map((yearbook, index) => (
            <Grid item key={index}>
              <div
                className="yearbookPreview"
                sx={{
                  width: {
                    xs: '100%',
                    sm: '50%',
                    md: '33.33%',
                    lg: '25%'
                  },
                  padding: '0 8px'
                }}
              >
                <Box className="yearbookLabel">
                  <h4>Batch of</h4>
                  <h2>{yearbook.year}</h2>
                </Box>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Bottom />
    </section>
  );
}