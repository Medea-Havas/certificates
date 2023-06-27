import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import styles from './CoursesSectionInfo.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import CoursesSectionInfoEdit from './edit';

export default function CoursesSectionInfo() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [duration, setDuration] = useState(0);
  const { query, isReady } = useRouter();

  const editFormView = () => setShowEditForm(true);

  useEffect(() => {
    if (isReady) {
      if (!sessionStorage.getItem('courses')) {
        fetch(`${process.env.API_HOST}/courses`)
          .then(coursesList => coursesList.json())
          .then(adaptedCourses => {
            setCourses(adaptedCourses);
            sessionStorage.setItem('courses', JSON.stringify(adaptedCourses));
            selectCourse(adaptedCourses);
            setLoading(false);
          });
      } else {
        let tempCourses = JSON.parse(sessionStorage.getItem('courses'));
        setCourses(tempCourses);
        selectCourse(tempCourses);
        setLoading(false);
      }
    }
  }, [isReady]);

  const selectCourse = tempCourses => {
    let selCourse = tempCourses.filter(course => course.id == query.id)[0];
    setSelectedCourse(selCourse);
    sessionStorage.setItem('course', JSON.stringify(selCourse));
    // Duration in months
    var iDate = moment(selCourse.date_init);
    var eDate = moment(selCourse.date_end);
    var difference = eDate.diff(iDate, 'days');
    setDuration(difference);
  };

  return (
    <div className={styles.main}>
      <div className={styles.coursesInfoContainer}>
        <h2>Información</h2>
        {loading ? (
          <CircularProgress />
        ) : showEditForm ? (
          <CoursesSectionInfoEdit setShowEditForm={setShowEditForm} />
        ) : (
          <>
            <div className={`${showEditForm ? 'active' : ''}`}>
              <div className={styles.coursesInfoCols}>
                <div className={styles.courseInfo}>
                  <p>
                    <span>Título:</span> {selectedCourse.title}
                  </p>
                  <p>
                    <span>Duración: </span>{' '}
                    {moment(selectedCourse.date_init).format('L')} –{' '}
                    {moment(selectedCourse.date_end).format('L')} ({duration}{' '}
                    días)
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
                  <p>
                    <span>Ciudad:</span> {selectedCourse.city}
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
              <div className={styles.coursesInfoFull}>
                <Button variant='outlined' onClick={editFormView}>
                  Editar
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
