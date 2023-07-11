import { Button, Input, TextField, Modal, Select } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import { Box } from '@mui/system';
import { useState } from 'react';
import styles from './CoursesSectionHome.module.css';
import axios from 'axios';
import React from 'react';

export default function CoursesModal({
  handleClose,
  ncCourse,
  open,
  setCourses,
  setNCCourse,
  setUpdateData,
  templates,
  updateData
}) {
  const API_HOST = process.env.API_HOST;
  const [img1, setImg1] = useState({});
  const [img2, setImg2] = useState({});
  const [reqCertImage, setCertImage] = useState(true);
  const [reqCertThumb, setCertThumb] = useState(true);
  const [reqCredits, setReqCredits] = useState(true);
  const [reqFileNumber, setReqFileNumber] = useState(true);
  const [reqTemplate, setReqTemplate] = useState(true);
  const [reqTitle, setReqTitle] = useState(true);
  const [select, setSelect] = useState('');
  const [thumb, setThumb] = useState({});

  const checkRequired = () => {
    setReqTitle(ncCourse.title);
    setReqFileNumber(ncCourse.file_number);
    setReqCredits(ncCourse.credits);
    setReqTemplate(ncCourse.template);
    setCertThumb(ncCourse.certificate_thumbnail);
    setCertImage(ncCourse.certificate_image);
    return (
      reqTitle && reqFileNumber && reqCredits && reqCertThumb && reqCertImage
    );
  };
  const handleSubmit = () => {
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
  };
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
      aria-describedby='modal-modal-description'
      aria-labelledby='modal-modal-title'
      id='modal'
      onClose={handleClose}
      open={open}
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
              onChange={e => updateField(e, 'title')}
              variant='outlined'
              value={ncCourse.title}
            />
          </div>
          <div className={styles.modalTextField}>
            <p>Tutor(es)</p>
            <TextField
              onChange={e => updateField(e, 'tutors')}
              value={ncCourse.tutors}
              variant='outlined'
            />
          </div>
          <div className={styles.modalTextField}>
            <p>Fecha de inicio</p>
            <TextField
              onChange={e => updateField(e, 'date_init')}
              type='date'
              value={ncCourse.date_init}
              variant='outlined'
            />
          </div>
          <div className={styles.modalTextField}>
            <p>Fecha de fin</p>
            <TextField
              onChange={e => updateField(e, 'date_end')}
              type='date'
              value={ncCourse.date_end}
              variant='outlined'
            />
          </div>
          <div className={styles.modalTextField}>
            <p>Ciudad</p>
            <TextField
              onChange={e => updateField(e, 'city')}
              value={ncCourse.city}
              variant='outlined'
            />
          </div>
          <div className={styles.modalTextField}>
            <p>Horas</p>
            <TextField
              inputProps={{ min: 0 }}
              onChange={e => updateField(e, 'hours')}
              value={ncCourse.hours}
              variant='outlined'
              type='number'
            />
          </div>
          <div className={styles.modalTextField}>
            <p>
              Nº de créditos<span>*</span>
            </p>
            <TextField
              error={reqCredits ? false : true}
              inputProps={{ min: 0 }}
              onChange={e => updateField(e, 'credits')}
              type='number'
              value={ncCourse.credits}
              variant='outlined'
            />
          </div>
          <div className={styles.modalTextField}>
            <p>
              Nº de expediente<span>*</span>
            </p>
            <TextField
              error={reqFileNumber ? false : true}
              onChange={e => updateField(e, 'file_number')}
              variant='outlined'
              value={ncCourse.file_number}
            />
          </div>
          <div className={styles.modalTextField}>
            <p>Acreditado por</p>
            <TextField
              onChange={e => updateField(e, 'accredited_by')}
              value={ncCourse.accredited_by}
              variant='outlined'
            />
          </div>
          <div className={styles.modalTextField}>
            <p>Entidad acreditadora</p>
            <TextField
              onChange={e => updateField(e, 'accrediting_entity')}
              value={ncCourse.accrediting_entity}
              variant='outlined'
            />
          </div>
          <div className={`${styles.modalTextField} ${styles.textarea}`}>
            <p>Contenido</p>
            <TextareaAutosize
              className={styles.taBorder}
              minRows='4'
              onChange={e => updateField(e, 'content')}
              value={ncCourse.content}
              variant='outlined'
            />
          </div>
          <div className={styles.modalTextField}>
            <p>
              Plantilla<span>*</span>
            </p>
            <Select
              error={reqTemplate ? false : true}
              onChange={e => setSelect(parseInt(e.target.value))}
              styles={styles.controlLabel}
              value={select.toString()}
            >
              {templates}
            </Select>
          </div>
          <div className={`${styles.modalTextField} ${styles.file}`}>
            <p>
              Miniatura del certificado<span>*</span>
            </p>
            <Input
              className={styles.imageButton}
              error={reqCertThumb ? false : true}
              name='certificate_thumbnail'
              onChange={e => updateImage(e, 'certificate_thumbnail')}
              type='file'
              value={ncCourse.certificate_thumbnail}
            >
              Insertar imagen
            </Input>
          </div>
          <div className={`${styles.modalTextField} ${styles.file}`}>
            <p>
              Imagen del certificado<span>*</span>
            </p>
            <Input
              className={styles.imageButton}
              error={reqCertImage ? false : true}
              name='certificate_image'
              onChange={e => updateImage(e, 'certificate_image')}
              type='file'
              value={ncCourse.certificate_image}
            >
              Insertar imagen
            </Input>
          </div>
          <div className={`${styles.modalTextField} ${styles.file}`}>
            <p>2ª imagen del certificado</p>
            <Input
              className={styles.imageButton}
              name='certificate_image2'
              onChange={e => updateImage(e, 'certificate_image2')}
              type='file'
              value={ncCourse.certificate_image2}
            >
              Insertar imagen
            </Input>
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
          <Button
            className={styles.modalButton}
            onClick={handleSubmit}
            variant='contained'
          >
            Aceptar
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
