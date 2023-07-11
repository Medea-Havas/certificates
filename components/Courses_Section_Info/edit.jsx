import { Button, CircularProgress, TextField } from '@mui/material';
import React from 'react';
import styles from './CoursesSectionInfo.module.css';
import Router from 'next/router';
import moment from 'moment';

export default function CoursesSectionInfoEdit({
  loadingCourses,
  selectedCourse,
  setSelectedCourse,
  setShowEditForm,
  setUpdateCoursesData,
  updateCoursesData
}) {
  const goBack = () => {
    setShowEditForm(false);
  };
  const handleField = type => event => {
    setSelectedCourse({
      ...selectedCourse,
      [`${type}`]: event.target.value
    });
  };
  const handleSubmit = async () => {
    setShowEditForm(false);
    await fetch(`${process.env.API_HOST}/courses/${Router.query.id}`, {
      method: 'PATCH',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedCourse)
    })
      .then(res => {
        sessionStorage.removeItem('courses');
        setUpdateCoursesData(!updateCoursesData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={styles.coursesInfo}>
        {loadingCourses ? (
          <CircularProgress />
        ) : (
          <div className={styles.container}>
            <div className={styles.textFieldModal}>
              <p>Título</p>
              <TextField
                label=''
                onChange={handleField('title')}
                value={selectedCourse.title}
                variant='outlined'
              />
            </div>
            <div className={styles.textFieldModal}>
              <p>Tutor</p>
              <TextField
                label=''
                onChange={handleField('tutors')}
                value={selectedCourse.tutors}
                variant='outlined'
              />
            </div>
            <div className={styles.textFieldModal}>
              <p>Duración (fecha inicio - fecha final)</p>
              <div className={styles.dates}>
                <TextField
                  label=''
                  onChange={handleField('date_init')}
                  type='date'
                  value={selectedCourse.date_init}
                  variant='outlined'
                />
                <TextField
                  label=''
                  onChange={handleField('date_end')}
                  type='date'
                  value={selectedCourse.date_end}
                  variant='outlined'
                />
              </div>
            </div>
            <div className={styles.textFieldModal}>
              <p>Horas</p>
              <TextField
                label=''
                type='number'
                onChange={handleField('hours')}
                value={selectedCourse.hours}
                variant='outlined'
              />
            </div>
            <div className={styles.textFieldModal}>
              <p>Número de créditos</p>
              <TextField
                label=''
                onChange={handleField('credits')}
                type='number'
                value={selectedCourse.credits}
                variant='outlined'
              />
            </div>
            <div className={styles.textFieldModal}>
              <p>Nº de expediente</p>
              <TextField
                label=''
                onChange={handleField('file_number')}
                value={selectedCourse.file_number}
                variant='outlined'
              />
            </div>
            <div className={styles.textFieldModal}>
              <p>Entidad acreditadora</p>
              <TextField
                label=''
                onChange={handleField('accrediting_entity')}
                value={selectedCourse.accrediting_entity}
                variant='outlined'
              />
            </div>
            <div className={styles.textFieldModal}>
              <p>Acreditado por</p>
              <TextField
                label=''
                onChange={handleField('accredited_by')}
                value={selectedCourse.accredited_by}
                variant='outlined'
              />
            </div>
            <div className={styles.textFieldModal}>
              <p>Fecha de creación</p>
              <TextField
                disabled
                label=''
                value={moment(selectedCourse.date_created).format('L LT')}
                variant='outlined'
                type='datetime'
              />
            </div>
            <div className={styles.textFieldModal}>
              <p>Fecha de actualización</p>
              <TextField
                disabled
                label=''
                type='datetime'
                value={moment(selectedCourse.date_modified).format('L LT')}
                variant='outlined'
              />
            </div>
            <div className={styles.textFieldModal}>
              <p>Ciudad</p>
              <TextField
                label=''
                onChange={handleField('city')}
                value={selectedCourse.city}
                variant='outlined'
              />
            </div>
            <div className={styles.textFieldModal}>
              <p>Contenidos</p>
              <TextField
                className={styles.textarea}
                label=''
                multiline
                onChange={handleField('content')}
                rows={4}
                value={selectedCourse.content}
                variant='outlined'
              />
            </div>
            <div className={styles.twocols}>
              <Button className='button' onClick={goBack} variant='outlined'>
                Cancelar
              </Button>
              <Button
                className='button'
                onClick={handleSubmit}
                variant='outlined'
              >
                Actualizar
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
