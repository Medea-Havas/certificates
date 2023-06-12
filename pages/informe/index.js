import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

export default function Report() {
  const router = useRouter();
  const cvs = router.query.cvs;

  return (
    <>
      <Head>
        <title>Certificados Medea - Certificado</title>
        <meta
          name='description'
          content='Gestor de certificados de los cursos de Medea'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='main'>
        <div>
          <div className='sectionHeader'>
            <h1>Informe</h1>
          </div>
          {cvs ? <p>CVS: {cvs}</p> : 'No existe información'}
        </div>
      </main>
    </>
  );
}
