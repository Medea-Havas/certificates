import { Button, Input, TextField, Modal } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import { Box } from '@mui/system';
import { useState } from 'react';
import styles from './CoursesSectionHome.module.css';
import axios from 'axios';
import React from 'react';

export default function CoursesModal({ handleClose, open }) {
  const [ncCourse, setNCCourse] = useState({});

  function handleSubmit() {
    axios
      .post('http://localhost:8080/courses', ncCourse)
      .then(response => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const updateField = (e, field) => {
    setNCCourse(prevState => ({
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
        <p className={styles.title}>Nuevo curso</p>
        <div className={styles.modalContainer}>
          <div className={styles.modalTextField}>
            <p>Título del curso</p>
            <TextField
              variant='outlined'
              value={ncCourse.title}
              onChange={e => updateField(e, 'title')}
            />
          </div>
          <div className={styles.modalTextField}>
            <p>Tutor(es)</p>
            <TextField
              variant='outlined'
              value={ncCourse.tutors}
              onChange={e => updateField(e, 'tutors')}
            />
          </div>
          <div className={styles.modalTextField}>
            <p>Fecha de inicio</p>
            <TextField
              variant='outlined'
              type='date'
              value={ncCourse.date_init}
              onChange={e => updateField(e, 'date_init')}
            />
          </div>
          <div className={styles.modalTextField}>
            <p>Fecha de fin</p>
            <TextField
              variant='outlined'
              type='date'
              value={ncCourse.date_end}
              onChange={e => updateField(e, 'date_end')}
            />
          </div>
          <div className={styles.modalTextField}>
            <p>Ciudad</p>
            <TextField
              variant='outlined'
              value={ncCourse.city}
              onChange={e => updateField(e, 'city')}
            />
          </div>
          <div className={styles.modalTextField}>
            <p>Horas</p>
            <TextField
              variant='outlined'
              type='number'
              inputProps={{ min: 0 }}
              value={ncCourse.hours}
              onChange={e => updateField(e, 'hours')}
            />
          </div>
          <div className={styles.modalTextField}>
            <p>Nº de créditos</p>
            <TextField
              variant='outlined'
              type='number'
              inputProps={{ min: 0 }}
              value={ncCourse.credits}
              onChange={e => updateField(e, 'credits')}
            />
          </div>
          <div className={styles.modalTextField}>
            <p>Nº de expediente</p>
            <TextField
              variant='outlined'
              value={ncCourse.file_number}
              onChange={e => updateField(e, 'file_number')}
            />
          </div>
          <div className={styles.modalTextField}>
            <p>Acreditado por</p>
            <TextField
              variant='outlined'
              value={ncCourse.accredited_by}
              onChange={e => updateField(e, 'accredited_by')}
            />
          </div>
          <div className={styles.modalTextField}>
            <p>Entidad acreditadora</p>
            <TextField
              variant='outlined'
              value={ncCourse.accrediting_entity}
              onChange={e => updateField(e, 'accrediting_entity')}
            />
          </div>
          <div className={styles.modalTextField}>
            <p>Contenido</p>
            <TextareaAutosize
              className={styles.taBorder}
              minRows='4'
              variant='outlined'
              value={ncCourse.content}
              onChange={e => updateField(e, 'content')}
            />
          </div>
          <div></div>
          <div className={`${styles.modalTextField} ${styles.file}`}>
            <p>Miniatura del certificado</p>
            <Input
              type='file'
              className={styles.imageButton}
              value={ncCourse.certificate_thumbnail}
              onChange={e => updateField(e, 'certificate_thumbnail')}
            >
              Insertar imagen
            </Input>
          </div>
          <div className={`${styles.modalTextField} ${styles.file}`}>
            <p>Imagen del certificado</p>
            <Input
              type='file'
              className={styles.imageButton}
              value={ncCourse.certificate_image}
              onChange={e => updateField(e, 'certificate_image')}
            >
              Insertar imagen
            </Input>
          </div>
          <div className={`${styles.modalTextField} ${styles.file}`}>
            <p>2ª imagen del certificado</p>
            <Input
              type='file'
              className={styles.imageButton}
              value={ncCourse.certificate_image2}
              onChange={e => updateField(e, 'certificate_thumbnail2')}
            >
              Insertar imagen
            </Input>
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
      </Box>
    </Modal>
  );
}
