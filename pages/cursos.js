import React from 'react';
import Head from 'next/head';
import CoursesSectionHome from '../components/Courses_Section_Home';

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
      <main className='main'>
        <CoursesSectionHome />
      </main>
    </>
  );
}
