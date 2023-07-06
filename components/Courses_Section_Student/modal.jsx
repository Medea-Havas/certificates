import {
  Button,
  Input,
  TextField,
  Modal,
  Select,
  CircularProgress,
  Autocomplete
} from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import { Box } from '@mui/system';
import styles from './CoursesSectionStudent.module.css';
import React from 'react';

export default function EnrollStudentModal({
  handleEnrollStudent,
  hideStudentModal,
  openStudentModal,
  studentToEnroll,
  setStudentToEnroll,
  studentsNotEnrolled,
  arrayStudentsNotEnrolled,
  loadingStudentsNotEnrolled,
  studentToEnrollChange
}) {
  return (
    <Modal
      id='modal'
      open={openStudentModal}
      onClose={hideStudentModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className={styles.modalBox}>
        <p className={styles.title}>Matricular alumno</p>
        <div className={styles.modalContainer}>
          <div className={styles.modalTextField}>
            {loadingStudentsNotEnrolled ? (
              <CircularProgress />
            ) : (
              <Autocomplete
                id='enrollStudent'
                options={arrayStudentsNotEnrolled}
                autoComplete
                includeInputInList
                renderInput={params => (
                  <TextField
                    {...params}
                    label='Alumnos*'
                    variant='standard'
                    value={params.value || 'novalue'}
                  />
                )}
                onChange={(e, val) => studentToEnrollChange(e, val)}
              />
              // <Select
              //   value={studentToEnroll}
              //   onChange={e => setStudentToEnroll(parseInt(e.target.value))}
              //   styles={styles.controlLabel}
              // >
              //   {arrayStudentsNotEnrolled}
              // </Select>
            )}
          </div>
          <div className={styles.modalButtonsCont}>
            <Button
              variant='contained'
              className={`${styles.modalButton} alt`}
              onClick={hideStudentModal}
            >
              Cancelar
            </Button>
            <Button
              variant='contained'
              className={styles.modalButton}
              onClick={handleEnrollStudent}
            >
              Aceptar
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
