import React, { Component } from 'react';
import Head from 'next/head';
import { DataGrid } from '@mui/x-data-grid';
import Image from 'next/Image';
import { Button, Link } from '@mui/material';
import styles from './Alumnos_Mat_A1.module.css';

export default class AlumnosMatA1 extends Component {
    render() {
      const { children } = this.props;
      return (
        <>
          <Head>
            <title>Certificados Medea - Usuarios</title>
            <meta
              name='description'
              content='Gestor de certificados de los cursos de Medea'
            />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel='icon' href='/favicon.ico' />
          </Head>
              <main className={styles.main}>
              <div>
                  <div className={styles.alumnoRoute}>
                      <Link className={styles.typeXSmall} href="/">Estudiantes</Link>
                      <text className={styles.typeXSmall}>{" > "}</text>
                      <Link className={styles.typeXSmall}>John Doe Márquez</Link>
                      <text className={styles.typeXSmall}>{" > "}</text>
                      <Link className={styles.typeXSmall}>Cursos Matriculado</Link>
                  </div>
                  <div className={styles.alumnoInfoTop}>
                      <text className={styles.typeXLarge}>John Doe Márquez</text>
                      <div>
                          <Button variant='contained' className={styles.buttonTop}>Información</Button>
                          <Button variant='contained' className={styles.buttonTop}>Cursos matriculado</Button>
                      </div>
                  </div>
                  <div className={styles.alumnoInfoContainer}>
                    <text className={styles.typeLarge}> Información</text>
                    <div className={styles.alumnoInfo}>
                        <text className={styles.typeMedium}><span className={styles.typeMediumBold}>Nombre:</span> John</text>
                        <text className={styles.typeMedium}><span className={styles.typeMediumBold}>Apellidos:</span> Doe Márquez</text>
                        <text className={styles.typeMedium}><span className={styles.typeMediumBold}>NIF:</span> 123456789P</text>
                    </div>
                    <div>
                          <Button variant='contained' className={styles.button}>Editar</Button>
                          <Button variant='contained' className={styles.button}>Borrar</Button>
                      </div>
                  </div>
              </div>
              </main>
        </>
      );
    }
  }
