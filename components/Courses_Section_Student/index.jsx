import React, { useEffect, useState } from 'react';
import { DataGrid, esES } from '@mui/x-data-grid';
import { rows, columns } from './data';

import styles from './CoursesSectionStudent.module.css';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

export default function CoursesSectionStudent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/usersfromcourse/' + router.query.id)
      .then(studentsList => studentsList.json())
      .then(students =>
        students.map(student => {
          return {
            ...student,
            lastName: student.last_name,
            endDate: student.date_completed
          };
        })
      )
      .then(adaptedCourses => {
        setStudents(adaptedCourses);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.alumnosContent}>
        <div className={styles.alumnoTitle}>
          <h2>Alumnos matriculados</h2>
          <div>
            <Button variant='outlined' className={styles.buttonTop}>
              Añadir alumno
            </Button>
            <Button variant='outlined' className={styles.buttonTop}>
              Cargar alumnos
            </Button>
            <Button variant='outlined' className={styles.buttonTop}>
              Descargar alumnos
            </Button>
          </div>
        </div>
        <div className={styles.table}>
          <DataGrid
            rows={students}
            columns={columns}
            loading={loading}
            pageSize={13}
            rowsPerPageOptions={[13]}
            rowHeight={53}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          />
        </div>
      </div>
    </div>
  );
}
