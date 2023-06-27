import React, { useState } from 'react';
import { Button, Input, TextField, Modal } from '@mui/material';
import { CircularProgress } from '@mui/material';
import styles from './CoursesSectionInfo.module.css';
import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import moment from 'moment';
import localization from 'moment/locale/es';

export default function CoursesSectionInfoEdit({ setShowEditForm }) {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const { query, isReady } = useRouter();
  const [ncInitDate, setNCInitDate] = useState('');
  const [ncEndDate, setNCEndDate] = useState('');
  const [ncTutors, setNCTutors] = useState('');
  const [ncCity, setNCCity] = useState('');
  const [ncCredits, setNCCredits] = useState('');
  const [ncFileNo, setNCFileNo] = useState('');

  useEffect(() => {
    if (isReady) {
      if (!sessionStorage.getItem('courses')) {
        fetch(`${process.env.API_HOST}/courses`)
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
            sessionStorage.setItem('courses', JSON.stringify(adaptedCourses));
            var selCourse = adaptedCourses.filter(
              course => course.id == query.id
            )[0];
            selectCourse(selCourse);
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
        console.log('Actualizado');
      })
      .catch(err => {
        console.log(selectedCourse);
        console.log(err);
      });
  };

  let selectCourse = tempCourses => {
    let selCourse = tempCourses.filter(course => course.id == query.id)[0];
    console.log(selCourse);
    setSelectedCourse(selCourse);
    sessionStorage.setItem('course', JSON.stringify(selCourse));
  };

  return (
    <div class='editCourseForm'>
      <div className={styles.coursesInfo}>
        {loading ? (
          <CircularProgress />
        ) : (
          <div className={styles.container}>
            <div className={styles.textFieldModal}>
              <p>Título</p>
              <TextField
                label=''
                variant='outlined'
                value={selectedCourse.title}
                onChange={handleField('title')}
              />
            </div>
            <div className={styles.textFieldModal}>
              <p>Tutor</p>
              <TextField
                label=''
                variant='outlined'
                value={selectedCourse.tutors}
                onChange={handleField('tutors')}
              />
            </div>
            <div className={styles.textFieldModal}>
              <p>Duración (fecha inicio - fecha final)</p>
              <div className={styles.dates}>
                <TextField
                  label=''
                  variant='outlined'
                  type='date'
                  value={selectedCourse.date_init}
                  onChange={handleField('date_init')}
                />
                <TextField
                  label=''
                  variant='outlined'
                  type='date'
                  value={selectedCourse.date_end}
                  onChange={handleField('date_end')}
                />
              </div>
            </div>
            <div className={styles.textFieldModal}>
              <p>Horas</p>
              <TextField
                label=''
                variant='outlined'
                type='number'
                value={selectedCourse.hours}
                onChange={handleField('hours')}
              />
            </div>
            <div className={styles.textFieldModal}>
              <p>Número de créditos</p>
              <TextField
                label=''
                variant='outlined'
                type='number'
                value={selectedCourse.credits}
                onChange={handleField('credits')}
              />
            </div>
            <div className={styles.textFieldModal}>
              <p>Nº de expediente</p>
              <TextField
                label=''
                variant='outlined'
                value={selectedCourse.file_number}
                onChange={handleField('file_number')}
              />
            </div>
            <div className={styles.textFieldModal}>
              <p>Entidad acreditadora</p>
              <TextField
                label=''
                variant='outlined'
                value={selectedCourse.accrediting_entity}
                onChange={handleField('accrediting_entity')}
              />
            </div>
            <div className={styles.textFieldModal}>
              <p>Acreditado por</p>
              <TextField
                label=''
                variant='outlined'
                value={selectedCourse.accredited_by}
                onChange={handleField('accredited_by')}
              />
            </div>
            <div className={styles.textFieldModal}>
              <p>Fecha de creación</p>
              <TextField
                disabled
                label=''
                variant='outlined'
                type='datetime'
                value={moment(selectedCourse.date_created).format('L LT')}
              />
            </div>
            <div className={styles.textFieldModal}>
              <p>Fecha de actualización</p>
              <TextField
                disabled
                label=''
                variant='outlined'
                type='datetime'
                value={moment(selectedCourse.date_modified).format('L LT')}
              />
            </div>
            <div className={styles.textFieldModal}>
              <p>Ciudad</p>
              <TextField
                label=''
                variant='outlined'
                value={selectedCourse.city}
                onChange={handleField('city')}
              />
            </div>
            <div className={styles.textFieldModal}>
              <p>Contenidos</p>
              <TextField
                label=''
                variant='outlined'
                value={selectedCourse.content}
                onChange={handleField('content')}
                multiline
                rows={4}
                className={styles.textarea}
              />
            </div>
            <div className={styles.twocols}>
              <Button
                className='button'
                variant='outlined'
                onClick={handleSubmit}
              >
                Actualizar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
