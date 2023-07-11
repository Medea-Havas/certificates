import React, { Component } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { theme } from '../../utils/theme';
import MainContent from '../MainContent/index';
import styles from './Layout.module.css';

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
