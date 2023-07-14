import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import CoursesSectionHome from '../components/Courses_Section_Home';
import Router from 'next/router';
import axios from 'axios';

export default function Courses() {
  const [loadedToken, setLoadedToken] = useState(false);

  useEffect(() => {
    if (
      !sessionStorage.getItem('token') ||
      sessionStorage.getItem('token') == ''
    ) {
      Router.push('/login');
    } else {
      axios.interceptors.request.use(
        function (config) {
          const token = sessionStorage.getItem('token');
          config.headers.Authorization = 'Bearer ' + token;
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
      );
      setLoadedToken(true);
    }
  });

  return loadedToken ? (
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
  ) : (
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
        <p className='centered'>No está autorizado para ver el contenido</p>
      </main>
    </>
  );
}
