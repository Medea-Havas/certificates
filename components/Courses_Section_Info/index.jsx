import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import styles from './CoursesSectionInfo.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';

export default function CoursesSectionInfo() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const { query, isReady } = useRouter();

  useEffect(() => {
    if (isReady) {
      if (!localStorage.getItem('courses')) {
        fetch('http://localhost:8080/courses')
          .then(coursesList => coursesList.json())
          .then(courses =>
            courses.map(course => {
              return {
                ...course,
                name: course.title,
                initDate: course.date_init,
                endDate: course.date_end,
                fileNumber: course.file_number
              };
            })
          )
          .then(adaptedCourses => {
            setCourses(adaptedCourses);
            localStorage.setItem('courses', JSON.stringify(adaptedCourses));
            var selCourse = adaptedCourses.filter(
              course => course.id == query.id
            )[0];
            selectCourse(selCourse);
            setLoading(false);
          });
      } else {
        let tempCourses = JSON.parse(localStorage.getItem('courses'));
        setCourses(tempCourses);
        selectCourse(tempCourses);
        setLoading(false);
      }
    }
  }, [isReady]);

  let selectCourse = tempCourses => {
    let selCourse = tempCourses.filter(course => course.id == query.id)[0];
    setSelectedCourse(selCourse);
    localStorage.setItem('course', JSON.stringify(selCourse));
  };

  return (
    <div className={styles.main}>
      <div className={styles.coursesInfoContainer}>
        <h2>Información</h2>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <div className={styles.coursesInfoCols}>
              <div className={styles.courseInfo}>
                <p>
                  <span>Título:</span> {selectedCourse.name}
                </p>
                <p>
                  <span>Duración:</span> {selectedCourse.initDate.split(' ')[0]}{' '}
                  - {selectedCourse.endDate.split(' ')[0]}
                </p>
                <p>
                  <span>Nº créditos:</span> {selectedCourse.credits}
                </p>
                <p>
                  <span>Ent. acreditora:</span>{' '}
                  {selectedCourse.accrediting_entity}
                </p>
                <p>
                  <span>Fecha de creación:</span>{' '}
                  {moment(selectedCourse.date_created).format('L LT')}
                </p>
              </div>
              <div className={styles.courseInfo}>
                <p>
                  <span>Tutor:</span> {selectedCourse.tutors}
                </p>
                <p>
                  <span>Horas:</span> {selectedCourse.hours}
                </p>
                <p>
                  <span>Nº de expediente:</span> {selectedCourse.file_number}
                </p>
                <p>
                  <span>Acreditado por:</span> {selectedCourse.accredited_by}
                </p>
                <p>
                  <span>Fecha de actualización:</span>{' '}
                  {moment(selectedCourse.date_modified).format('L LT')}
                </p>
              </div>
            </div>
            <div className={styles.coursesInfoFull}>
              <p>
                <span>Contenidos:</span>
              </p>
              <p className={styles.newLine}>{selectedCourse.content}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
