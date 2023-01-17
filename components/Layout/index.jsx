import React, { Component } from 'react';
import Header from '../Header/index';
import Footer from '../Footer/index';
import Aside from '../Aside/index';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import styles from './Layout.module.css';
import { theme } from '../../utils/theme';

const themeCreated = createTheme(theme);

export default class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={themeCreated}>
        <div className='layout'>
          <Header />
          <div className={styles.body}>
            <Aside />
            {children}
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}
