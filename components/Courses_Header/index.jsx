import { Breadcrumbs, Button, Link, Typography } from '@mui/material'
import styles from './CoursesHeader.module.css'

function selectCertificate(e) {
  console.log('Certificate')
}
function selectInfo(e) {
  console.log('Info')
}
function selectStudents(e) {
  console.log('Students')
}

export default function CoursesHeader({ selected }) {
  return (
    <div className={styles.main}>
      <div className={styles.coursesRoute}>
        <Breadcrumbs aria-label='breadcrumb' color='text.primary'>
          <Link underline='hover' color='text.primary' href='/'>
            Cursos
          </Link>
          <Link underline='hover' color='text.primary' href='/'>
            Curso 01
          </Link>
          <Typography color='text.primary'>Información</Typography>
        </Breadcrumbs>
      </div>
      <div className={styles.coursesInfoTop}>
        <h1>Curso 01</h1>
        <div>
          <Button variant='contained' className={styles.buttonTop}>
            Cargar alumnos
          </Button>
          <Button variant='contained' className={styles.buttonTop}>
            Descargar alumnos
          </Button>
        </div>
      </div>
      <div className='buttons'>
        <Button
          variant='contained'
          className={`${styles.button} ${selected == 'info' ? 'selected' : ''}`}
          onClick={selectInfo}
        >
          Información
        </Button>
        <Button
          variant='contained'
          className={styles.button}
          onClick={selectCertificate}
        >
          Diploma
        </Button>
        <Button
          variant='contained'
          className={styles.button}
          onClick={selectStudents}
        >
          Alumnos matriculados
        </Button>
      </div>
    </div>
  )
}
