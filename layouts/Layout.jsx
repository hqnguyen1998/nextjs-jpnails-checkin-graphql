import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { Box, Container } from '@material-ui/core';

const Layout = ({ title, children }) => {
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <link
          href='https://fonts.googleapis.com/css2?family=Lato&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Navbar />
      <Box mt={2} p={2}>
        <Container maxWidth='lg'>{children}</Container>
      </Box>
    </React.Fragment>
  );
};

export default Layout;
