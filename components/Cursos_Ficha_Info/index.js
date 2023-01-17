import React, { Component } from 'react';
import Head from 'next/head';
import { Button, Link } from '@mui/material';
import styles from './CoursesInfo.module.css';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

export default class CursosFichaInfo extends Component {
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
            <div className={styles.coursesRoute}>
              <Breadcrumbs aria-label='breadcrumb' color='text.primary'>
                <Link underline='hover' color='text.primary' href='/'>
                  Cursos
                </Link>
                <Link underline='hover' color='text.primary' href='/'>
                  Curso 01
                </Link>
                <Typography color='text.primary'>Información</Typography>
              </Breadcrumbs>
            </div>
            <div className={styles.coursesInfoTop}>
              <text className={typeXLarge}>Curso 01</text>
              <div>
                <Button variant='contained' className={styles.buttonTop}>
                  Cargar alumnos
                </Button>
                <Button variant='contained' className={styles.buttonTop}>
                  Descargar alumnos
                </Button>
              </div>
            </div>
            <div>
              <Button variant='contained' className={styles.button}>
                Información
              </Button>
              <Button variant='contained' className={styles.button}>
                Diploma
              </Button>
              <Button variant='contained' className={styles.button}>
                Alumnos matriculados
              </Button>
            </div>
            <div className={styles.coursesInfo}>
              <div className={styles.coursesInfoTitle}>
                <text className={typeMedium}>Información del curso</text>
              </div>
              <div className={styles.divInfoColCont}>
                <div className={styles.divInfoCol}>
                  <text className={typeMedium}>
                    <span className={styles.typeBold}>Nombre:</span> Curso 01
                  </text>
                  <text className={typeMedium}>
                    <span className={styles.typeBold}>Duración:</span>{' '}
                    21/11/2020 - 24/11/2021
                  </text>
                  <text className={typeMedium}>
                    <span className={styles.typeBold}>Nº créditos:</span> 8,4
                  </text>
                  <text className={typeMedium}>
                    <span className={styles.typeBold}>Ent. acreditora:</span>{' '}
                    Medea, Medical Education Agency S.L.
                  </text>
                </div>
                <div className={styles.divInfoCol}>
                  <text className={typeMedium}>
                    <span className={styles.typeBold}>Tutor:</span> John Doe
                  </text>
                  <text className={typeMedium}>
                    <span className={styles.typeBold}>Horas:</span> 39
                  </text>
                  <text className={typeMedium}>
                    <span className={styles.typeBold}>Nº de expediente:</span>{' '}
                    07-AFOC-03874.3/2020
                  </text>
                  <text className={typeMedium}>
                    <span className={styles.typeBold}>Acreditador por:</span>{' '}
                    Comisión Formación Continuada Profesiones Sanitarias.
                    Comunidad de Madrid
                  </text>
                </div>
              </div>
              <div className={styles.divInfoCont}>
                <div>
                  <text className={typeMediumBold}>Contenidos:</text>
                </div>
                <text className={typeMedium}>
                  Lorem ipsum dolor sit amet. Sed dolore maiores At debitis
                  aliquid et aliquam cumque aut eaque voluptatem qui iure
                  voluptatem? Eos quia eligendi sed quidem harum nam excepturi
                  numquam sed accusamus voluptas. Et nisi iste hic veniam odio
                  in autem cupiditate. In pariatur error aut ipsam dolorum non
                  quibusdam facere qui suscipit similique quo voluptates vero ea
                  sunt possimus. Sed consectetur soluta eos consequatur quia quo
                  harum voluptates ut placeat aspernatur eos accusantium atque.
                  Eum labore expedita sed corrupti excepturi et sint quidem est
                  vitae quasi. Aut delectus minima sed nobis numquam non magni
                  Quis. Sed Quis voluptatem ad nesciunt eius ut reprehenderit
                  sunt quo galisum quasi et quos aliquid rem quibusdam deserunt?
                  Et excepturi quia ut nihil atque ex nihil consequatur in
                  provident autem vel voluptatibus esse est quia sint. Ut
                  voluptatem unde et omnis maxime aut omnis mollitia in nobis
                  iure vel suscipit corrupti quo repudiandae neque.
                </text>
              </div>
              <div className={styles.divInfoColCont}>
                <div className={styles.divInfoCont}>
                  <text className={typeMedium}>
                    <span className={styles.typeBold}>Fecha de creación:</span>{' '}
                    15/11/2020
                  </text>
                </div>
                <div className={styles.divInfoCont}>
                  <text className={typeMedium}>
                    <span className={styles.typeBold}>
                      Fecha de actualización:
                    </span>{' '}
                    17/07/2022
                  </text>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}
