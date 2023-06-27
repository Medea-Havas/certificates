import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, MenuItem, Select } from '@mui/material';
import styles from './CoursesSectionCertificate.module.css';
import { useRouter } from 'next/router';
import moment from 'moment';
import localization from 'moment/locale/es';

export default function CoursesSectionCertificate() {
  const { query, isReady } = useRouter();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [selectedCourse, setSelectedCourse] = useState({});
  const [templates, setTemplates] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [update, setUpdate] = useState(false);
  const [initialIndex, setInitialIndex] = useState(null);
  const [arrayTemplates, setArrayTemplates] = useState([]);
  const API_HOST = process.env.API_HOST;

  const changeSelectedTemplate = e => {
    var selTemplate = templates.filter(
      template => template.id == parseInt(e.target.value)
    )[0];
    setSelectedTemplate(selTemplate);
    setUpdate(true);
  };

  const updateTemplate = (e, id) => {
    console.log(id);
    console.log(e);
  };

  const arrayTemplateFunction = () => {
    if (!arrayTemplates.length) {
      let tempTemplates = JSON.parse(sessionStorage.getItem('templates')) || [];
      let arrayTemplates = [];
      let initialIndex = null;
      for (let i = 0; i < tempTemplates.length; i++) {
        if (arrayTemplates[i] == selectedTemplate.id) {
          initialIndex = selectedTemplate.id;
        }
        arrayTemplates.push(
          <MenuItem
            key={tempTemplates[i].id}
            value={tempTemplates[i].id}
            className={styles.menuitem}
          >
            {tempTemplates[i].title} (id: {tempTemplates[i].id})
          </MenuItem>
        );
      }
      setArrayTemplates(arrayTemplates);
      setInitialIndex(initialIndex);
    }
  };

  const selectCourse = tempCourses => {
    let selCourse = tempCourses.filter(course => course.id == query.id)[0];
    setSelectedCourse(selCourse);
    sessionStorage.setItem('course', JSON.stringify(selCourse));
  };

  useEffect(() => {
    if (isReady) {
      let tempCourses = JSON.parse(sessionStorage.getItem('courses'));
      setCourses(tempCourses);
      selectCourse(tempCourses);

      if (!sessionStorage.getItem('templates')) {
        fetch(`${API_HOST}/templates`)
          .then(templatesList => templatesList.json())
          .then(adaptedTemplates => {
            setTemplates(adaptedTemplates);
            sessionStorage.setItem(
              'templates',
              JSON.stringify(adaptedTemplates)
            );
            var selCourse = JSON.parse(sessionStorage.getItem('course'));
            var selTemplate = adaptedTemplates.filter(
              template => template.id == selCourse.template_id
            )[0];
            setSelectedTemplate(selTemplate);
            arrayTemplateFunction();
            setLoading(false);
          });
      } else {
        let tempTemplates = JSON.parse(sessionStorage.getItem('templates'));
        setTemplates(tempTemplates);
        var selCourse = selectedCourse.length
          ? selectedCourse
          : JSON.parse(sessionStorage.getItem('course'));
        var selTemplate = tempTemplates.filter(
          template => template.id == selCourse.template_id
        )[0];
        setSelectedTemplate(selTemplate);
        arrayTemplateFunction();
        setLoading(false);
      }
      moment.updateLocale('es', localization);
    }
  }, [updateData]);

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
                  src={`${process.env.API_HOST}/assets/certificates/${selectedCourse.certificate_thumbnail}`}
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
                  className={styles.mwidth}
                  src={`${process.env.API_HOST}/assets/certificates/${selectedCourse.certificate_image}`}
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
                  className={styles.mwidth}
                  src={`${process.env.API_HOST}/assets/certificates/${selectedCourse.certificate_image2}`}
                  alt='Certificate image 02'
                />
              ) : (
                <img
                  className={styles.mwidth}
                  src='/noimage.png'
                  alt='No image'
                />
              )}
              <Button variant='outlined' className={styles.buttonImage}>
                {selectedCourse.certificate_image2
                  ? 'Sustituir'
                  : 'Seleccionar'}
              </Button>
            </div>
            <div className={styles.template}>
              <h3>Plantilla:</h3>
              <Select
                value={selectedTemplate.id}
                onChange={changeSelectedTemplate}
                styles={styles.controlLabel}
              >
                {arrayTemplates}
              </Select>
              {update ? (
                <Button
                  className={styles.updateButton}
                  onClick={e => updateTemplate(e, selectedTemplate.id)}
                >
                  Actualizar
                </Button>
              ) : (
                ''
              )}
              <div className={styles.chosenTemplate}>
                <p>Posiciones:</p>
                <p>{selectedTemplate.coords}</p>
                <p className={styles.upper}>- Primera página -</p>
                <p className={styles.templateSection}>[Nombre]</p>
                <p className={styles.templateData}>
                  Top: {selectedTemplate.coords.split('*')[0].split(',')[0]} |
                  Left: {selectedTemplate.coords.split('*')[0].split(',')[1]} |
                  Width: {selectedTemplate.coords.split('*')[0].split(',')[2]} |
                  Font Size:{' '}
                  {selectedTemplate.coords.split('*')[0].split(',')[3]}
                </p>
                <p className={styles.templateSection}>[Nº de expediente]</p>
                <p className={styles.templateData}>
                  Top: {selectedTemplate.coords.split('*')[1].split(',')[0]} |
                  Left: {selectedTemplate.coords.split('*')[1].split(',')[1]} |
                  Width: {selectedTemplate.coords.split('*')[1].split(',')[2]} |
                  Font Size:{' '}
                  {selectedTemplate.coords.split('*')[1].split(',')[3]}
                </p>
                <p className={styles.templateSection}>[Fecha]</p>
                <p className={styles.templateData}>
                  Top: {selectedTemplate.coords.split('*')[2].split(',')[0]} |
                  Left: {selectedTemplate.coords.split('*')[2].split(',')[1]} |
                  Width: {selectedTemplate.coords.split('*')[2].split(',')[2]} |
                  Font Size:{' '}
                  {selectedTemplate.coords.split('*')[2].split(',')[3]}
                </p>
                <p className={styles.templateSection}>[Créditos]</p>
                <p className={styles.templateData}>
                  Top: {selectedTemplate.coords.split('*')[3].split(',')[0]} |
                  Left: {selectedTemplate.coords.split('*')[3].split(',')[1]} |
                  Width: {selectedTemplate.coords.split('*')[3].split(',')[2]} |
                  Font Size:{' '}
                  {selectedTemplate.coords.split('*')[3].split(',')[3]}
                </p>
                <p className={styles.upper}>- Segunda página -</p>
                <p className={styles.templateSection}>[Nombre]</p>
                <p className={styles.templateData}>
                  Top: {selectedTemplate.coords.split('*')[4].split(',')[0]} |
                  Left: {selectedTemplate.coords.split('*')[4].split(',')[1]} |
                  Width: {selectedTemplate.coords.split('*')[4].split(',')[2]} |
                  Font Size:{' '}
                  {selectedTemplate.coords.split('*')[4].split(',')[3]}
                </p>
                <p className={styles.templateSection}>[NIF]</p>
                <p className={styles.templateData}>
                  Top: {selectedTemplate.coords.split('*')[5].split(',')[0]} |
                  Left: {selectedTemplate.coords.split('*')[5].split(',')[1]} |
                  Width: {selectedTemplate.coords.split('*')[5].split(',')[2]} |
                  Font Size:{' '}
                  {selectedTemplate.coords.split('*')[5].split(',')[3]}
                </p>
                <p className={styles.templateSection}>[Nº expediente]</p>
                <p className={styles.templateData}>
                  Top: {selectedTemplate.coords.split('*')[6].split(',')[0]} |
                  Left: {selectedTemplate.coords.split('*')[6].split(',')[1]} |
                  Width: {selectedTemplate.coords.split('*')[6].split(',')[2]} |
                  Font Size:{' '}
                  {selectedTemplate.coords.split('*')[6].split(',')[3]}
                </p>
                <p className={styles.templateSection}>[Créditos]</p>
                <p className={styles.templateData}>
                  Top: {selectedTemplate.coords.split('*')[7].split(',')[0]} |
                  Left: {selectedTemplate.coords.split('*')[7].split(',')[1]} |
                  Width: {selectedTemplate.coords.split('*')[7].split(',')[2]} |
                  Font Size:{' '}
                  {selectedTemplate.coords.split('*')[7].split(',')[3]}
                </p>
                <p className={styles.templateSection}>[Horas]</p>
                <p className={styles.templateData}>
                  Top: {selectedTemplate.coords.split('*')[8].split(',')[0]} |
                  Left: {selectedTemplate.coords.split('*')[8].split(',')[1]} |
                  Width: {selectedTemplate.coords.split('*')[8].split(',')[2]} |
                  Font Size:{' '}
                  {selectedTemplate.coords.split('*')[8].split(',')[3]}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
