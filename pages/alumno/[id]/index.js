import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import StudentsSectionCourses from '../../../components/Students_Section_Courses';
import StudentsSectionInfo from '../../../components/Students_Section_Info';
import React from 'react';
import StudentsHeader from '../../../components/Students_Header';
import axios from 'axios';

export default function Student() {
  const [index, setIndex] = useState(0);
  const handleIndex = index => setIndex(index);
  const router = useRouter();
  const paramId = router.query.id;
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
      <main className='page'>
        <div>
          <StudentsHeader
            index={index}
            handleIndex={handleIndex}
            paramId={paramId}
          />
          {index === 0 && <StudentsSectionInfo />}
          {index === 1 && <StudentsSectionCourses />}
        </div>
      </main>
    </>
  ) : (
    <main className='main'>
      <p className='centered'>No está autorizado para ver el contenido</p>
    </main>
  );
}
