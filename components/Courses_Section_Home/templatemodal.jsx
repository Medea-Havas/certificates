import { Button, Input, TextField, Modal } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import styles from './CoursesSectionHome.module.css';
import axios from 'axios';
import React from 'react';

export default function TemplateModal({
  handleClose,
  open,
  updateData,
  setUpdateData,
  arrayTemplateFunction,
  setArrayTemplates,
  setTemplates
}) {
  const API_HOST = process.env.API_HOST;
  const [listItems, setListItems] = useState([]);
  const [template, setTemplate] = useState({});

  useEffect(() => {
    if (!sessionStorage.getItem('templates')) {
      fetch(`${API_HOST}/templates`)
        .then(templatesList => templatesList.json())
        .then(adaptedTemplates => {
          setTemplates(adaptedTemplates);
          sessionStorage.setItem('templates', JSON.stringify(adaptedTemplates));
          arrayTemplateFunction();
        });
    } else {
      console.log('Eiquí');
    }

    let tmp = JSON.parse(sessionStorage.getItem('templates'));
    let lis;
    if (tmp) {
      lis = tmp.map(t => (
        <li key={t.id} className={styles.templateItem}>
          <p>
            {t.id} - {t.title}
          </p>
          <div className={styles.buttons}>
            <Button>Editar</Button>
            <Button className={styles.warn}>Borrar</Button>
          </div>
        </li>
      ));
    }
    setListItems(lis);
  }, [updateData]);

  function handleSubmit() {
    axios
      .post(`${API_HOST}/templates`, template)
      .then(response => {
        if (response.status === 201) {
          sessionStorage.removeItem('templates');
          setArrayTemplates([]);
          setTemplate({});
          setUpdateData(!updateData);
          // handleClose();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const updateField = (e, field) => {
    setTemplate(prevState => ({
      ...prevState,
      [field]: e.target.value
    }));
  };

  return (
    <Modal
      id='modal'
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className={styles.modalBox}>
        <p className={styles.title}>Nueva plantilla de curso</p>
        <div className={styles.modalContainer}>
          <div className={styles.modalTextField}>
            <p>
              Título de plantilla<span>*</span>
            </p>
            <TextField
              variant='outlined'
              value={template.title}
              onChange={e => updateField(e, 'title')}
            />
          </div>
          <div></div>
          <div className={styles.modalTextField}>
            <p>
              Coordenadas<span>*</span>
            </p>
            <TextareaAutosize
              className={styles.taBorder}
              minRows='5'
              variant='outlined'
              value={template.coords}
              onChange={e => updateField(e, 'coords')}
            />
          </div>
          <div className={styles.explanation}>
            <p>
              4 cifras separadas por comas que se corresponden con: top, left,
              width y fontSize de cada elemento
            </p>
            <p>
              9 campos separados por asteriscos a situar en el certificado:
              nombre, nº expediente, fecha (inicio + fin), créditos | (en 2ª
              página) Nombre, NIF, nº expediente, créditos, horas
            </p>
          </div>
        </div>
        <div className={styles.modalButtonsCont}>
          <Button
            variant='contained'
            className={`${styles.modalButton} alt`}
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            variant='contained'
            className={styles.modalButton}
            onClick={handleSubmit}
          >
            Aceptar
          </Button>
        </div>
        <p className={styles.title}>Plantillas</p>
        <ul>{listItems}</ul>
      </Box>
    </Modal>
  );
}
