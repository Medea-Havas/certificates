import { Button, FormControl, MenuItem, Select, Modal } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import styles from './StudentsSectionCourses.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function StudentsCoursesModal({
  handleClose,
  open,
  userId,
  ready
}) {
  const [select, setSelect] = useState('');
  const [tempCourse, setTempCourse] = useState({});
  const [optionCourses, setOptionCourses] = useState([]);
  const handleChange = event => {
    setTempCourse(event.target.value);
  };

  useEffect(() => {
    if (ready) {
      axios
        .get(`${process.env.API_HOST}/coursesnotfromuser/${userId}`)
        .then(response => {
          let tags = [];
          response.data.forEach(element => {
            tags.push(
              <MenuItem key={element.id} value={element.id}>
                {element.id} - {element.title}
              </MenuItem>
            );
          });
          setOptionCourses(tags);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [ready]);

  function handleSubmit() {
    axios
      .post(`${process.env.API_HOST}/courses`, tempCourse)
      .then(response => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Modal
      id='modal'
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className={styles.modalBox}>
        <p className={styles.title}>Matricular en curso</p>
        <div className={styles.container}>
          <div className={styles.textFieldModal}>
            <p>Seleccione un curso</p>
            <FormControl fullWidth>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={select}
                label='Course'
                onChange={handleChange}
                styles={styles.controlLabel}
              >
                {optionCourses}
              </Select>
            </FormControl>
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
