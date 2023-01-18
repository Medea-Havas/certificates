import styles from './MainContent.module.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Footer from '../Footer';
import { Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

export default function MainContent({ children, theme }) {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open} sx={{ backgroundColor: '#2e2940' }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Link
            color='#fff'
            href='/'
            sx={{
              fontSize: 19
            }}
            underline='none'
          >
            Certificados Medea
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#7CB1DE'
          }
        }}
        variant='persistent'
        anchor='left'
        open={open}
        className={open ? 'open' : ''}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} className='iconButton'>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Button href='/' className={styles.button}>
          Home
        </Button>
        <Divider />
        <Button href='/cursos' className={styles.button}>
          Cursos
        </Button>
        <Divider />
        <Button href='/alumnos' className={styles.button}>
          Alumnos
        </Button>
        <Divider />
      </Drawer>
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        className={open ? 'open' : 'closed'}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
