import React from 'react';
import Head from 'next/head';
import StudentsSectionHome from '../components/Students_Section_Home';

export default function Students() {
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
      <main className='main'>
        <StudentsSectionHome />
      </main>
    </>
  );
}
