import {
  Button,
  Input,
  TextField,
  Modal,
  CircularProgress
} from '@mui/material';
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
  setArrayTemplates,
  templates,
  setTemplates,
  listItems,
  setListItems,
  template,
  setTemplate,
  templatesLoaded,
  editable,
  setEditable,
  updateId,
  setUpdateId
}) {
  const API_HOST = process.env.API_HOST;

  function handleSubmit() {
    axios
      .post(`${API_HOST}/templates`, {
        title: template.title,
        coords: template.coords
      })
      .then(response => {
        if (response.status === 201) {
          sessionStorage.removeItem('templates');
          setArrayTemplates([]);
          setTemplate({ id: -1, title: '', coords: '' });
          setUpdateData(!updateData);
          // handleClose();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleUpdateSubmit() {
    axios
      .patch(`${API_HOST}/templates/${template.id}`, {
        title: template.title,
        coords: template.coords
      })
      .then(response => {
        if (response.status === 200) {
          sessionStorage.removeItem('templates');
          setArrayTemplates([]);
          setTemplate({ id: -1, title: '', coords: '' });
          setUpdateData(!updateData);
          setUpdateId(-1);
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
          {updateId != -1 ? (
            <Button
              variant='contained'
              className={`${styles.modalButton} ${styles.variant}`}
              onClick={handleUpdateSubmit}
            >
              Editar ({updateId})
            </Button>
          ) : (
            ''
          )}
          <Button
            variant='contained'
            className={styles.modalButton}
            onClick={handleSubmit}
          >
            Aceptar
          </Button>
        </div>
        <p className={styles.title}>Plantillas</p>
        {templatesLoaded ? (
          <ul className={styles.listOverflow}>{listItems}</ul>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Modal>
  );
}
