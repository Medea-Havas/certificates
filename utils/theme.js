// Theme builder: https://bareynol.github.io/mui-theme-creator/
export const theme = {
  palette: {
    type: 'light',
    /*primary: {
      main: '#3e65ac',
      light: '#7cb1de',
      dark: '#463777'
    },*/
    primary: {
      main: '#7CB1DE',
      light: '#7cb1de',
      dark: '#463777'
    },
    secondary: {
      main: '#ea5c99',
      light: '#dca4ca',
      dark: '#c34186'
    },
    background: {
      default: '#2E2940'
    },
    text: {
      primary: '#fff'
    }
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
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
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
          }
        `
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          color: 'white',
          border: '1px solid white', // use your color
          width: '100%',
          height: '5px',
          borderRadius: '4px',
          fontSize: 'small'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#7CB1DE',
          color: '#2E2940',
          textTransform: 'capitalize'
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: '#7CB1DE',
          color: '#2E2940'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: 'white'
        }
      }
    }
  }
};
