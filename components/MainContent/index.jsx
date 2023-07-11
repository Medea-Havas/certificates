import * as React from 'react';
import { Button, Link, SwipeableDrawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './MainContent.module.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Footer from '../Footer';
import CloseIcon from '@mui/icons-material/Close';

const drawerWidth = 18.75;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}rem)`,
    marginLeft: `${drawerWidth}rem`,
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

export default function MainContent({ children }) {
  const [open, setOpen] = useState(true);

  const router = useRouter();

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  if (router.pathname == '/informe') return <Box>{children}</Box>;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <div className={styles.appDrawerContainer}>
        <AppBar
          open={open}
          position='fixed'
          sx={{ backgroundColor: '#2e2940' }}
        >
          <Toolbar>
            <IconButton
              aria-label='open drawer'
              color='inherit'
              edge='start'
              onClick={handleDrawerOpen}
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
        <div className={styles.drawerContainer}>
          <SwipeableDrawer
            anchor='left'
            className={open ? 'open' : ''}
            onClose={handleDrawerClose}
            onOpen={handleDrawerOpen}
            open={open}
            sx={{
              display: { xs: 'block', sm: 'none' },
              width: `${drawerWidth}rem`,
              flexShrink: 0,
              height: '100%',
              position: 'fixed',
              zIndex: 9,
              '& .MuiDrawer-paper': {
                width: `${drawerWidth}rem`,
                boxSizing: 'border-box',
                backgroundColor: '#7CB1DE'
              }
            }}
            variant='persistent'
          >
            <DrawerHeader>
              <IconButton className='iconButton' onClick={handleDrawerClose}>
                <CloseIcon />
              </IconButton>
            </DrawerHeader>
            <Divider />
            <Link href='/'>
              <Button className={styles.menuButton}>Home</Button>
            </Link>
            <Divider />
            <Link href='/cursos'>
              <Button className={styles.menuButton}>Cursos</Button>
            </Link>
            <Divider />
            <Link href='/alumnos'>
              <Button className={styles.menuButton}>Alumnos</Button>
            </Link>
            <Divider />
          </SwipeableDrawer>
          <Drawer
            anchor='left'
            className={open ? 'open' : ''}
            open={open}
            sx={{
              display: { xs: 'none', sm: 'block' },
              flexShrink: 0,
              width: `${drawerWidth}rem`,
              '& .MuiDrawer-paper': {
                backgroundColor: '#7CB1DE',
                boxSizing: 'border-box',
                width: `${drawerWidth}rem`
              }
            }}
            variant='persistent'
          >
            <DrawerHeader>
              <IconButton className='iconButton' onClick={handleDrawerClose}>
                <CloseIcon />
              </IconButton>
            </DrawerHeader>
            <Divider />
            <Link href='/'>
              <Button className={styles.menuButton}>Home</Button>
            </Link>
            <Divider />
            <Link href='/cursos'>
              <Button className={styles.menuButton}>Cursos</Button>
            </Link>
            <Divider />
            <Link href='/alumnos'>
              <Button className={styles.menuButton}>Alumnos</Button>
            </Link>
            <Divider />
          </Drawer>
          <Box
            className={open ? 'open' : 'closed'}
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
          >
            {children}
          </Box>
        </div>
      </div>
      <Footer />
    </Box>
  );
}
