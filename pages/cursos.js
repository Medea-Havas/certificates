import React from 'react';
import Head from 'next/head';
import CoursesSectionHome from '../components/Courses_Section_Home';
import CoursesSectionInfo from '../components/Courses_Section_Info';
import CoursesSectionCertificate from '../components/Courses_Section_Certificate';
import CoursesSectionStudent from '../components/Courses_Section_Student';
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
      <main className={`page ${styles.main}`}>
        <CoursesSectionHome />
        {/* <CoursesSectionInfo /> */}
        {/* <CoursesSectionCertificate /> */}
        {/* <CoursesSectionStudent /> */}
      </main>
    </>
  );
}
