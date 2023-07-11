import {
  Button,
  TextField,
  Modal,
  CircularProgress,
  Autocomplete
} from '@mui/material';
import { Box } from '@mui/system';
import styles from './CoursesSectionStudent.module.css';
import React from 'react';

export default function EnrollStudentModal({
  arrayStudentsNotEnrolled,
  handleEnrollStudent,
  hideStudentModal,
  loadingStudentsNotEnrolled,
  openStudentModal,
  studentToEnrollChange
}) {
  return (
    <Modal
      aria-describedby='modal-modal-description'
      aria-labelledby='modal-modal-title'
      id='modal'
      open={openStudentModal}
      onClose={hideStudentModal}
    >
      <Box className={styles.modalBox}>
        <p className={styles.title}>Matricular alumno</p>
        <div className={styles.modalContainer}>
          <div className={styles.modalTextField}>
            {loadingStudentsNotEnrolled ? (
              <CircularProgress />
            ) : (
              <Autocomplete
                autoComplete
                id='enrollStudent'
                includeInputInList
                onChange={(e, val) => studentToEnrollChange(e, val)}
                options={arrayStudentsNotEnrolled}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='Alumnos*'
                    value={params.value || 'novalue'}
                    variant='standard'
                  />
                )}
              />
            )}
          </div>
          <div className={styles.modalButtonsCont}>
            <Button
              className={`${styles.modalButton} alt`}
              onClick={hideStudentModal}
              variant='contained'
            >
              Cancelar
            </Button>
            <Button
              className={styles.modalButton}
              onClick={handleEnrollStudent}
              variant='contained'
            >
              Aceptar
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
