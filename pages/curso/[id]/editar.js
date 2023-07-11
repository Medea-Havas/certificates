import { Breadcrumbs, Link } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import styles from '../../../styles/Course.module.css';
import CoursesSectionInfoEdit from '../../../components/Courses_Section_Info/edit';

export default function Course() {
  const router = useRouter();
  const paramId = router.query.id;

  return (
    <main className='page main'>
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
            Curso {paramId < 10 ? '0' + paramId : paramId}
          </Link>
          <Link color='text.primary'>
            Editar curso {paramId < 10 ? '0' + paramId : paramId}
          </Link>
        </Breadcrumbs>
      </div>
      <CoursesSectionInfoEdit />
    </main>
  );
}
