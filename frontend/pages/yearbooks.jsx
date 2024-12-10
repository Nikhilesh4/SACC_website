import Head from 'next/head';
import ParentBox from '../components/parent_box';
import NavbarComponent from '../components/navbar';
import { Box, CssBaseline, Container } from '@mui/material';
import '@styles/yearbooks.scss'
import '@styles/globals.scss'
import Bottom from '@components/footer';

export default function Home() {
  return (
    <section>
      <NavbarComponent isSticky={true} />

      <Box className="backdrop">
        hi
      </Box>

      <div><Bottom /></div>
    </section>
  );
}
