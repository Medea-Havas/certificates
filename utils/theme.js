// Theme builder: https://bareynol.github.io/mui-theme-creator/
export const theme = {
  palette: {
    type: 'light',
    primary: {
      main: '#597891',
      light: '#7dbed3',
      dark: '#2e2940'
    },
    secondary: {
      main: '#ea5c99',
      light: '#dca4ca',
      dark: '#c34186'
    },
    background: {
      // default: '#2E2940'
      default: '#fff'
    },
    text: {
      // primary: '#fff'
      primary: '#2e2940'
    }
  },
  typography: {
    fontFamily: '"Inter", sans-serif'
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          @font-face {
            font-display: swap;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
          }
        `
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          border: '1px solid #2e2940', // use your color
          borderRadius: '4px',
          color: '#2e2940',
          fontSize: 'small',
          height: '5px',
          width: '100%'
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
          color: '#2e2940'
        }
      }
    }
  }
};
