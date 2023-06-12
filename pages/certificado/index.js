import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function Certificate() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userId = router.query.userId;
  const courseId = router.query.courseId;

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
            <h1>Certificado</h1>
          </div>
          {loading ? (
            userId & courseId ? (
              <p>
                User id: {userId}, Course id: {courseId}
              </p>
            ) : (
              'No existe certificado'
            )
          ) : (
            ''
          )}
        </div>
      </main>
    </>
  );
}
