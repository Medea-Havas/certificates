import { Button, Input, TextField, Modal, Select } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import { Box } from '@mui/system';
import { useState } from 'react';
import styles from './CoursesSectionHome.module.css';
import axios from 'axios';
import React from 'react';

export default function CoursesModal({
  handleClose,
  open,
  ncCourse,
  setNCCourse,
  setCourses,
  templates,
  setUpdateData,
  updateData
}) {
  const API_HOST = process.env.API_HOST;
  const [select, setSelect] = useState('');
  const [thumb, setThumb] = useState({});
  const [img1, setImg1] = useState({});
  const [img2, setImg2] = useState({});
  const [reqTitle, setReqTitle] = useState(true);
  const [reqFileNumber, setReqFileNumber] = useState(true);
  const [reqCredits, setReqCredits] = useState(true);
  const [reqTemplate, setReqTemplate] = useState(true);
  const [reqCertThumb, setCertThumb] = useState(true);
  const [reqCertImage, setCertImage] = useState(true);

  function handleSubmit() {
    if (checkRequired()) {
      let tempData = new FormData();
      tempData.append('title', ncCourse.title);
      tempData.append('accredited_by', ncCourse.accredited_by);
      tempData.append('accrediting_entity', ncCourse.accrediting_entity);
      tempData.append('file_number', ncCourse.file_number);
      tempData.append('city', ncCourse.city);
      tempData.append('credits', ncCourse.credits);
      tempData.append('hours', ncCourse.hours);
      tempData.append('tutors', ncCourse.tutors);
      tempData.append('content', ncCourse.content);
      tempData.append('template', ncCourse.template);
      tempData.append('certificate_thumbnail', thumb);
      tempData.append('certificate_image', img1);
      tempData.append('certificate_image2', img2);
      tempData.append('date_init', ncCourse.date_init);
      tempData.append('date_end', ncCourse.date_end);
      tempData.append('template_id', select);

      axios
        .post(`${API_HOST}/courses`, tempData)
        .then(response => {
          if (response.status === 201) {
            setCourses(prevState => ({
              ...prevState,
              ncCourse
            }));
            sessionStorage.setItem('courses', []);
            setNCCourse({});
            setUpdateData(!updateData);
            handleClose();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  function checkRequired() {
    setReqTitle(ncCourse.title);
    setReqFileNumber(ncCourse.file_number);
    setReqCredits(ncCourse.credits);
    setReqTemplate(ncCourse.template);
    setCertThumb(ncCourse.certificate_thumbnail);
    setCertImage(ncCourse.certificate_image);
    return (
      reqTitle && reqFileNumber && reqCredits && reqCertThumb && reqCertImage
    );
  }

  const updateField = (e, field) => {
    setNCCourse(prevState => ({
      ...prevState,
      [field]: e.target.value
    }));
  };
  const updateImage = (e, field) => {
    console.log(e.target.files[0]);
    console.log(typeof e.target.files[0]);
    switch (field) {
      case 'certificate_thumbnail':
        setThumb(e.target.files[0]);
        break;
      case 'certificate_image':
        setImg1(e.target.files[0]);
        break;
      case 'certificate_image2':
        setImg2(e.target.files[0]);
        break;
    }
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
            <p>
              Título del curso<span>*</span>
            </p>
            <TextField
              error={reqTitle ? false : true}
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
            <p>
              Nº de créditos<span>*</span>
            </p>
            <TextField
              error={reqCredits ? false : true}
              variant='outlined'
              type='number'
              inputProps={{ min: 0 }}
              value={ncCourse.credits}
              onChange={e => updateField(e, 'credits')}
            />
          </div>
          <div className={styles.modalTextField}>
            <p>
              Nº de expediente<span>*</span>
            </p>
            <TextField
              error={reqFileNumber ? false : true}
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
          <div className={`${styles.modalTextField} ${styles.textarea}`}>
            <p>Contenido</p>
            <TextareaAutosize
              className={styles.taBorder}
              minRows='4'
              variant='outlined'
              value={ncCourse.content}
              onChange={e => updateField(e, 'content')}
            />
          </div>
          <div className={styles.modalTextField}>
            <p>
              Plantilla<span>*</span>
            </p>
            <Select
              error={reqTemplate ? false : true}
              value={select.toString()}
              onChange={e => setSelect(parseInt(e.target.value))}
              styles={styles.controlLabel}
            >
              {templates}
            </Select>
          </div>
          <div className={`${styles.modalTextField} ${styles.file}`}>
            <p>
              Miniatura del certificado<span>*</span>
            </p>
            <Input
              error={reqCertThumb ? false : true}
              type='file'
              name='certificate_thumbnail'
              className={styles.imageButton}
              value={ncCourse.certificate_thumbnail}
              onChange={e => updateImage(e, 'certificate_thumbnail')}
            >
              Insertar imagen
            </Input>
          </div>
          <div className={`${styles.modalTextField} ${styles.file}`}>
            <p>
              Imagen del certificado<span>*</span>
            </p>
            <Input
              error={reqCertImage ? false : true}
              type='file'
              name='certificate_image'
              className={styles.imageButton}
              value={ncCourse.certificate_image}
              onChange={e => updateImage(e, 'certificate_image')}
            >
              Insertar imagen
            </Input>
          </div>
          <div className={`${styles.modalTextField} ${styles.file}`}>
            <p>2ª imagen del certificado</p>
            <Input
              type='file'
              name='certificate_image2'
              className={styles.imageButton}
              value={ncCourse.certificate_image2}
              onChange={e => updateImage(e, 'certificate_image2')}
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
