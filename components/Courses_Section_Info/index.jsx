import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import styles from './CoursesSectionInfo.module.css';
import moment from 'moment';
import CoursesSectionInfoEdit from './edit';

export default function CoursesSectionInfo({
  selectedCourse,
  loadingCourses,
  duration,
  updateCoursesData,
  setUpdateCoursesData,
  setSelectedCourse
}) {
  const [showEditForm, setShowEditForm] = useState(false);

  const editFormView = () => setShowEditForm(true);

  return (
    <div className={styles.main}>
      <div className={styles.coursesInfoContainer}>
        <h2>Información</h2>
        {loadingCourses ? (
          <CircularProgress />
        ) : showEditForm ? (
          <CoursesSectionInfoEdit
            setShowEditForm={setShowEditForm}
            updateCoursesData={updateCoursesData}
            setUpdateCoursesData={setUpdateCoursesData}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
            loadingCourses={loadingCourses}
          />
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
