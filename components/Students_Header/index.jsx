import { Breadcrumbs, Button, Link } from '@mui/material';
import styles from './StudentsHeader.module.css';

export default function StudentsHeader({ handleIndex, index, paramId }) {
  return (
    <div className={styles.main}>
      <div className={styles.coursesRoute}>
        <Breadcrumbs aria-label='breadcrumb' color='text.primary'>
          <Link color='text.primary' href='/alumnos' underline='hover'>
            Alumnos
          </Link>
          <Link
            color='text.primary'
            href={'/alumno/' + paramId}
            underline='hover'
          >
            Alumno {paramId < 10 ? '0' + paramId : paramId}
          </Link>
          <p color='text.primary'>
            {index == 0 ? 'Información' : ''}
            {index == 1 ? 'Cursos matriculado' : ''}
          </p>
        </Breadcrumbs>
      </div>
      <div className={styles.coursesInfoTop}>
        <h1>Alumno {paramId < 10 ? '0' + paramId : paramId}</h1>
      </div>
      <div className='buttons'>
        <Button
          className={`${styles.button} ${index == 0 ? 'selected' : ''}`}
          onClick={() => handleIndex(0)}
          variant='contained'
        >
          Información
        </Button>
        <Button
          className={`${styles.button} ${index == 1 ? 'selected' : ''}`}
          onClick={() => handleIndex(1)}
          variant='contained'
        >
          Cursos matriculado
        </Button>
      </div>
    </div>
  );
}
