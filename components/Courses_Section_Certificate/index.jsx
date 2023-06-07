import React, { useEffect, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import styles from './CoursesSectionCertificate.module.css';
import { useRouter } from 'next/router';
import moment from 'moment';
import localization from 'moment/locale/es';

export default function CoursesSectionCertificate() {
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
            var selCourse = tempCourses.filter(
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
      moment.updateLocale('es', localization);
    }
  }, []);

  let selectCourse = tempCourses => {
    let selCourse = tempCourses.filter(course => course.id == query.id)[0];
    setSelectedCourse(selCourse);
    localStorage.setItem('course', JSON.stringify(selCourse));
  };

  return (
    <div className={styles.main}>
      <div className={styles.diplomaContainer}>
        <h2>Diploma</h2>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <div className={styles.diplomaDiv}>
              <div className={styles.imageDiploma}>
                <p className={styles.xsmall}>Miniatura:</p>
              </div>
              {selectedCourse.certificate_thumbnail ? (
                <img
                  src={selectedCourse.certificate_thumbnail}
                  className={styles.thumb}
                  alt='Thumbnail'
                />
              ) : (
                <img src='/noimage.png' alt='No image' />
              )}
              <Button variant='outlined' className={styles.buttonImage}>
                {selectedCourse.certificate_thumbnail
                  ? 'Sustituir'
                  : 'Seleccionar'}
              </Button>
            </div>
            <div className={styles.diplomaDiv}>
              <div className={styles.imageDiploma}>
                <p className={styles.xsmall}>Imagen 1:</p>
              </div>
              {selectedCourse.certificate_image ? (
                <img
                  src={selectedCourse.certificate_image}
                  alt='Certificate image 01'
                />
              ) : (
                <img src='/noimage.png' alt='No image' />
              )}
              <Button variant='outlined' className={styles.buttonImage}>
                {selectedCourse.certificate_image ? 'Sustituir' : 'Seleccionar'}
              </Button>
            </div>
            <div className={styles.diplomaDiv}>
              <div className={styles.imageDiploma}>
                <p className={styles.xsmall}>Imagen 2:</p>
              </div>
              {selectedCourse.certificate_image2 ? (
                <img
                  src={selectedCourse.certificate_image2}
                  alt='Certificate image 02'
                />
              ) : (
                <img src='/noimage.png' alt='No image' />
              )}
              <Button variant='outlined' className={styles.buttonImage}>
                {selectedCourse.certificate_image2
                  ? 'Sustituir'
                  : 'Seleccionar'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
