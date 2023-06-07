import { Breadcrumbs, Button, Link, Typography } from '@mui/material';
import styles from './StudentsHeader.module.css';

export default function StudentsHeader({ handleIndex, index, paramId }) {
  return (
    <div className={styles.main}>
      <div className={styles.coursesRoute}>
        <Breadcrumbs aria-label='breadcrumb' color='text.primary'>
          <Link underline='hover' color='text.primary' href='/alumnos'>
            Alumnos
          </Link>
          <Link
            underline='hover'
            color='text.primary'
            href={'/alumno/' + paramId}
          >
            Alumno {paramId < 10 ? '0' + paramId : paramId}
          </Link>
          <Typography color='text.primary'>
            {index == 0 ? 'Información' : ''}
            {index == 1 ? 'Cursos matriculado' : ''}
          </Typography>
        </Breadcrumbs>
      </div>
      <div className={styles.coursesInfoTop}>
        <h1>Alumno {paramId < 10 ? '0' + paramId : paramId}</h1>
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
          Cursos matriculado
        </Button>
      </div>
    </div>
  );
}
