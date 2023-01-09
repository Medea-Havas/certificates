import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import next from 'next';
import Head from 'next/head';
import Image from 'next/Image';
import styles from '../styles/Courses.module.css';

export default function Courses() {
  return (
    <>
      <Head>
        <title>Certificados Medea - Cursos</title>
        <meta
          name='description'
          content='Gestor de certificados de los cursos de Medea'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div>
          <div className={styles.coursesTop}>
            <text className={styles.typeXLarge}>Cursos</text>
            <Button variant='contained'>+ Nuevo Curso</Button>
          </div>
          <div className={styles.searcherContainer}>
            <text className={styles.typeLarge}> Buscador</text>
              <div className={styles.allSearchers}>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Nombre de curso</text>
                  <TextField id="outlined-basic" label="" variant="outlined" InputLabelProps={{className: styles.input}} InputProps={{className: styles.label}} />
                </div>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Fecha de inicio</text>
                  <TextField id="outlined-basic" label="" variant="outlined" InputLabelProps={{className: styles.input}} InputProps={{className: styles.label}} />
                </div>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Fecha de finalización</text>
                  <TextField id="outlined-basic" label="" variant="outlined" InputLabelProps={{className: styles.input}} InputProps={{className: styles.label}} />
                </div>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Tutores</text>
                  <TextField id="outlined-basic" label="" variant="outlined" InputLabelProps={{className: styles.input}} InputProps={{className: styles.label}} />
                </div>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Ciudad</text>
                  <TextField id="outlined-basic" label="" variant="outlined" InputLabelProps={{className: styles.input}} InputProps={{className: styles.label}} />
                </div>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Nº créditos</text>
                  <TextField id="outlined-basic" label="" variant="outlined" InputLabelProps={{className: styles.input}} InputProps={{className: styles.label}} />
                </div>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Nº expediente</text>
                  <TextField id="outlined-basic" label="" variant="outlined" InputLabelProps={{className: styles.input}} InputProps={{className: styles.label}} />
                </div>
              </div>
            <div className={styles.fieldsTitle}>
              <text className={styles.typeMedium}> Curso</text>
              <text className={styles.typeMedium}> Inicio</text>
              <text className={styles.typeMedium}> Fin</text>
              <text className={styles.typeMedium}> Tutores</text>
              <text className={styles.typeMedium}> Ciudad</text>
              <text className={styles.typeMedium}> Nº créditos</text>
              <text className={styles.typeMedium}> Nº expediente</text>
              <text className={styles.typeMedium}> Imagen</text>
            </div>
            <div className={styles.course}>
              <text className={styles.typeSmall}> Curso 01</text>
              <text className={styles.typeSmall}> 16-04-22</text>
              <text className={styles.typeSmall}> 31-10-22</text>
              <text className={styles.typeSmall}> Dr. John Doe</text>
              <text className={styles.typeSmall}> Madrid</text>
              <text className={styles.typeSmall}> 13,6</text>
              <text className={styles.typeSmall}> 07-AFOC-03874.3/2020</text>
              <div><Image
                src={'/pexels.jpeg'}
                alt="Picture of the author"
                width={50}
                height={50}
                // blurDataURL="data:..." automatically provided
                // placeholder="blur" // Optional blur-up while loading
              /></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
