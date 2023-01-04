import { Button } from '@mui/material';
import Head from 'next/head';
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
        <h2>Cursos</h2>
        <Button variant='contained'>Contained</Button>
      </main>
    </>
  );
}
