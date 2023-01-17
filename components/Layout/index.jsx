import React, { Component } from 'react';
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
          <div className={styles.body}>
            <Aside children={children} />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}
