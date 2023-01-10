import React, { Component } from 'react';
import Head from 'next/head';
import Image from 'next/Image';
import { Button, Link } from '@mui/material';
import styles from './CoursesFicha.module.css';

export default class CursosFichaDiploma extends Component {
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
                    <Link className={styles.typeXSmall}>Cursos</Link>
                    <text className={styles.typeXSmall}>{" > "}</text>
                    <Link className={styles.typeXSmall}>Curso 01</Link>
                    <text className={styles.typeXSmall}>{" > "}</text>
                    <Link className={styles.typeXSmall}>Diploma</Link>
                </div>
                <div className={styles.coursesInfoTop}>
                    <text className={styles.typeXLarge}>Curso 01</text>
                    <div>
                        <Button variant='contained' className={styles.buttonTop}>Cargar alumnos</Button>
                        <Button variant='contained' className={styles.buttonTop}>Descargar alumnos</Button>
                    </div>
                </div>
                <div>
                    <Button variant='contained' className={styles.button}>Información</Button>
                    <Button variant='contained' className={styles.button}>Diploma</Button>
                    <Button variant='contained' className={styles.button}>Alumnos matriculados</Button>
                </div>

                <div className={styles.diplomaContent}>
                    <div className={styles.diplomaTitle}><text className={styles.typeMedium}>Diploma</text></div>
                    <div className={styles.diplomaDiv}>
                        <div className={styles.imageDiploma}><text className={styles.typleXsmall}>Imagen diploma miniatura:</text></div>
                        <Image
                            src={'/pexels.jpeg'}
                            alt="Picture of the author"
                            width={300}
                            height={200}
                            // blurDataURL="data:..." automatically provided
                            // placeholder="blur" // Optional blur-up while loading
                        />
                    </div>
                    <div className={styles.diplomaDiv}>
                        <div className={styles.imageDiploma}><text className={styles.typleXsmall}>Imagen diploma 1:</text></div>
                        <Image
                            src={'/pexels.jpeg'}
                            alt="Picture of the author"
                            width={550}
                            height={400}
                            // blurDataURL="data:..." automatically provided
                            // placeholder="blur" // Optional blur-up while loading
                        />
                        <Button variant='contained' className={styles.buttonImage}>Sustituir</Button>
                    </div>
                    <div className={styles.diplomaDiv}>
                        <div className={styles.imageDiploma}><text className={styles.typleXsmall}>Imagen diploma 2:</text></div>
                        <Image
                            src={'/pexels.jpeg'}
                            alt="Picture of the author"
                            width={550}
                            height={550}
                            // blurDataURL="data:..." automatically provided
                            // placeholder="blur" // Optional blur-up while loading
                        />
                        <Button variant='contained' className={styles.buttonImage}>Sustituir</Button>
                    </div>
                    <div className={styles.diplomaDiv}>
                        <div className={styles.imageDiploma}><text className={styles.typleXsmall}>Imagen diploma 2:</text></div>
                        <Button variant='contained' className={styles.buttonImage}>Seleccionar</Button>
                    </div>
                </div>
            </div>
            </main>
      </>
    );
  }
}