import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Certificados Medea</title>
        <meta
          name='description'
          content='Gestor de certificados de los cursos de Medea'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <container className={styles.homeContainer}>
          <div className={styles.coursesDiv}>
            <div className={styles.totalDiv}>
              <text className={styles.typeLarge}>Total Cursos</text>
              <text className={styles.typeXLarge}>7</text>
            </div>
            <div>
              <text className={styles.typeMedium}>Últimos Cursos</text>
              <div>
                <text className={styles.typeXXSmall}>
                  Curso 01 Lorem ipsum dolor si amet
                </text>
                <text className={styles.typeXXSmall}>18/07/2021</text>
                <text className={styles.typeXXSmall}>14:03:21</text>
              </div>
              <div>
                <text className={styles.typeXXSmall}>
                  Curso 01 Lorem ipsum dolor si amet
                </text>
                <text className={styles.typeXXSmall}>18/07/2021</text>
                <text className={styles.typeXXSmall}>14:03:21</text>
              </div>
              <div>
                <text className={styles.typeXXSmall}>
                  Curso 01 Lorem ipsum dolor si amet
                </text>
                <text className={styles.typeXXSmall}>18/07/2021</text>
                <text className={styles.typeXXSmall}>14:03:21</text>
              </div>
            </div>
          </div>
          <div className={styles.studentsDiv}>
            <div className={styles.totalDiv}>
              <text className={styles.typeLarge}>Total Estudiantes</text>
              <text className={styles.typeXLarge}>316</text>
            </div>
            <div>
              <text className={styles.typeMedium}>Últimos Estudiantes</text>
              <div>
                <text className={styles.typeXXSmall}>
                  Curso 01 Lorem ipsum dolor si amet
                </text>
                <text className={styles.typeXXSmall}>18/07/2021</text>
                <text className={styles.typeXXSmall}>14:03:21</text>
              </div>
              <div>
                <text className={styles.typeXXSmall}>
                  Curso 01 Lorem ipsum dolor si amet
                </text>
                <text className={styles.typeXXSmall}>18/07/2021</text>
                <text className={styles.typeXXSmall}>14:03:21</text>
              </div>
              <div>
                <text className={styles.typeXXSmall}>
                  Curso 01 Lorem ipsum dolor si amet
                </text>
                <text className={styles.typeXXSmall}>18/07/2021</text>
                <text className={styles.typeXXSmall}>14:03:21</text>
              </div>
            </div>
          </div>
        </container>
      </main>
    </>
  );
}
