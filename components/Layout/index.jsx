import React, { Component } from 'react';
import Header from '../Header/index';
import Footer from '../Footer/index';
import Aside from '../Aside/index';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Theme builder: https://bareynol.github.io/mui-theme-creator/
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3e65ac',
      light: '#7cb1de',
      dark: '#463777'
    },
    secondary: {
      main: '#ea5c99',
      light: '#dca4ca',
      dark: '#c34186'
    }
  },
  typography: {
    h1: {
      fontSize: '4.5rem',
      fontFamily: 'Inter'
    },
    fontSize: '1rem',
    h2: {
      fontFamily: 'Inter',
      fontSize: '1rem'
    },
    h3: {
      fontFamily: 'Inter',
      fontSize: '1rem'
    },
    h4: {
      fontFamily: 'Inter',
      fontSize: '1rem'
    },
    h5: {
      fontFamily: 'Inter',
      fontSize: '1rem'
    },
    h6: {
      fontFamily: 'Inter',
      fontSize: '1rem'
    }
  }
});

export default class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <div className='layout'>
          <Header />
          <Aside />
          {children}
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}
