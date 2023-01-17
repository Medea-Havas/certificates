import React, { Component } from 'react';
import MainContent from '../MainContent/index';
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
          <div className={styles.body}>
            <MainContent children={children} />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}
