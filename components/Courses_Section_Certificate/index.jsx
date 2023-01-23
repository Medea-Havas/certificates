import React from 'react'
import Head from 'next/head'
import Image from 'next/Image'
import { Button, Link } from '@mui/material'
import styles from './CoursesSectionCertificate.module.css'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'

export default function CoursesSectionCertificate() {
  return (
    <div className={styles.main}>
      <div className={styles.coursesRoute}>
        <Breadcrumbs aria-label='breadcrumb' color='text.primary'>
          <Link underline='hover' color='text.primary' href='/'>
            Cursos
          </Link>
          <Link underline='hover' color='text.primary' href='/'>
            Curso 01
          </Link>
          <Typography color='text.primary'>Diploma</Typography>
        </Breadcrumbs>
      </div>
      <div className={styles.coursesInfoTop}>
        <h1>Curso 01</h1>
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

      <div className={styles.diplomaContent}>
        <div className={styles.diplomaTitle}>
          <h2>Diploma</h2>
        </div>
        <div className={styles.diplomaDiv}>
          <div className={styles.imageDiploma}>
            <p className={styles.xsmall}>Imagen diploma miniatura:</p>
          </div>
          <Image
            src={'/pexels.jpeg'}
            alt='Picture of the author'
            width={300}
            height={200}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        </div>
        <div className={styles.diplomaDiv}>
          <div className={styles.imageDiploma}>
            <text className={styles.xsmall}>Imagen diploma 1:</text>
          </div>
          <Image
            src={'/pexels.jpeg'}
            alt='Picture of the author'
            width={550}
            height={400}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
          <Button variant='contained' className={styles.buttonImage}>
            Sustituir
          </Button>
        </div>
        <div className={styles.diplomaDiv}>
          <div className={styles.imageDiploma}>
            <text className={styles.xsmall}>Imagen diploma 2:</text>
          </div>
          <Image
            src={'/pexels.jpeg'}
            alt='Picture of the author'
            width={550}
            height={550}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
          <Button variant='contained' className={styles.buttonImage}>
            Sustituir
          </Button>
        </div>
        <div className={styles.diplomaDiv}>
          <div className={styles.imageDiploma}>
            <text className={styles.xsmall}>Imagen diploma 2:</text>
          </div>
          <Button variant='contained' className={styles.buttonImage}>
            Seleccionar
          </Button>
        </div>
      </div>
    </div>
  )
}
