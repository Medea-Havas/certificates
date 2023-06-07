import Head from 'next/head';
import HomeSectionStats from '../components/Home_Section_Stats';

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
      <main className='main'>
        <HomeSectionStats />
      </main>
    </>
  );
}
