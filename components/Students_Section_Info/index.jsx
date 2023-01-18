import React from 'react';
import Head from 'next/head';
import { Button, Link } from '@mui/material';
import styles from './StudentsSectionInfo.module.css';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

export default function StudentsSectionInfo() {
  return (
    <div className={styles.main}>
      <div className={styles.alumnoRoute}>
        <Breadcrumbs aria-label='breadcrumb' color='text.primary'>
          <Link underline='hover' color='text.primary' href='/'>
            Alumnos
          </Link>
          <Link underline='hover' color='text.primary' href='/'>
            John Doe Márquez
          </Link>
          <Typography color='text.primary'>Información</Typography>
        </Breadcrumbs>
      </div>
      <div className={styles.alumnoInfoTop}>
        <h1>John Doe Márquez</h1>
        <div>
          <Button variant='contained' className={styles.buttonTop}>
            Información
          </Button>
          <Button variant='contained' className={styles.buttonTop}>
            Cursos matriculado
          </Button>
        </div>
      </div>
      <div className={styles.alumnoInfoContainer}>
        <h2>Información</h2>
        <div className={styles.alumnoInfo}>
          <p>
            <span>Nombre:</span> John
          </p>
          <p>
            <span>Apellidos:</span> Doe Márquez
          </p>
          <p>
            <span>NIF:</span> 123456789P
          </p>
        </div>
        <div>
          <Button variant='contained' className={styles.button}>
            Editar
          </Button>
          <Button variant='contained' className={styles.button}>
            Borrar
          </Button>
        </div>
      </div>
    </div>
  );
}
