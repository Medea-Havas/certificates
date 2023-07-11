import { Button, TextField, Modal, CircularProgress } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import { Box } from '@mui/system';
import styles from './CoursesSectionHome.module.css';
import axios from 'axios';
import React from 'react';

export default function TemplateModal({
  handleClose,
  listItems,
  open,
  setArrayTemplates,
  setUpdateData,
  setTemplate,
  setUpdateId,
  template,
  templatesLoaded,
  updateData,
  updateId
}) {
  const API_HOST = process.env.API_HOST;

  const handleSubmit = () => {
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
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleUpdateSubmit = () => {
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
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const updateField = (e, field) => {
    setTemplate(prevState => ({
      ...prevState,
      [field]: e.target.value
    }));
  };

  return (
    <Modal
      aria-describedby='modal-modal-description'
      aria-labelledby='modal-modal-title'
      id='modal'
      onClose={handleClose}
      open={open}
    >
      <Box className={styles.modalBox}>
        <p className={styles.title}>Nueva plantilla de curso</p>
        <div className={styles.modalContainer}>
          <div className={styles.modalTextField}>
            <p>
              Título de plantilla<span>*</span>
            </p>
            <TextField
              onChange={e => updateField(e, 'title')}
              value={template.title}
              variant='outlined'
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
              onChange={e => updateField(e, 'coords')}
              value={template.coords}
              variant='outlined'
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
            className={`${styles.modalButton} alt`}
            onClick={handleClose}
            variant='contained'
          >
            Cancelar
          </Button>
          {updateId != -1 ? (
            <Button
              className={`${styles.modalButton} ${styles.variant}`}
              onClick={handleUpdateSubmit}
              variant='contained'
            >
              Editar ({updateId})
            </Button>
          ) : (
            ''
          )}
          <Button
            className={styles.modalButton}
            onClick={handleSubmit}
            variant='contained'
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
