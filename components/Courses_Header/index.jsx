import { Breadcrumbs, Button, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './CoursesHeader.module.css';

export default function CoursesHeader({ handleIndex, index, paramId }) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (
      sessionStorage.getItem('course') &&
      sessionStorage.getItem('course') != 'undefined'
    ) {
      let course = JSON.parse(sessionStorage.getItem('course'));
      setTitle(course.title);
    } else {
      setTimeout(() => {
        if (sessionStorage.getItem('course')) {
          let course = JSON.parse(sessionStorage.getItem('course'));
          setTitle(course.title);
        }
      }, 300);
    }
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.coursesRoute}>
        <Breadcrumbs aria-label='breadcrumb' color='text.primary'>
          <Link underline='hover' color='text.primary' href='/cursos'>
            Cursos
          </Link>
          <Link
            underline='hover'
            color='text.primary'
            href={'/curso/' + paramId}
          >
            Curso {paramId < 10 ? '0' + paramId : paramId}{' '}
            {title != '' ? '- ' + title : ''}
          </Link>
          <p color='text.primary'>
            {index == 0 ? 'Información' : ''}
            {index == 1 ? 'Diploma' : ''}
            {index == 2 ? 'Alumnos matriculados' : ''}
          </p>
        </Breadcrumbs>
      </div>
      <div className={styles.coursesInfoTop}>
        <h1>
          Curso {paramId < 10 ? '0' + paramId : paramId}{' '}
          {title != '' ? '- ' + title : ''}
        </h1>
      </div>
      <div className='buttons'>
        <Button
          variant='contained'
          className={`${styles.button} ${index == 0 ? 'selected' : ''}`}
          onClick={() => handleIndex(0)}
        >
          Información
        </Button>
        <Button
          variant='contained'
          className={`${styles.button} ${index == 1 ? 'selected' : ''}`}
          onClick={() => handleIndex(1)}
        >
          Diploma
        </Button>
        <Button
          variant='contained'
          className={`${styles.button} ${index == 2 ? 'selected' : ''}`}
          onClick={() => handleIndex(2)}
        >
          Alumnos matriculados
        </Button>
      </div>
    </div>
  );
}
