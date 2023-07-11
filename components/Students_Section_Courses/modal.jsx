import { Button, FormControl, Select, Modal, TextField } from '@mui/material';
import { Box } from '@mui/system';
import styles from './StudentsSectionCourses.module.css';

export default function StudentsCoursesModal({
  completedDate,
  handleClose,
  handleCourseToEnrollChange,
  handleSubmit,
  open,
  optionCourses,
  select,
  updateDate
}) {
  return (
    <Modal
      aria-describedby='modal-modal-description'
      aria-labelledby='modal-modal-title'
      id='modal'
      open={open}
      onClose={handleClose}
    >
      <Box className={styles.modalBox}>
        <p className={styles.title}>Matricular en curso</p>
        <div className={styles.container}>
          <div className={styles.textFieldModal}>
            <p>Seleccione un curso</p>
            <FormControl fullWidth>
              <Select
                label='Course'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                onChange={handleCourseToEnrollChange}
                styles={styles.controlLabel}
                value={select}
              >
                {optionCourses}
              </Select>
              <div className={styles.modalTextField}>
                <p>Fecha curso completado</p>
                <TextField
                  onChange={e => updateDate(e)}
                  type='date'
                  value={completedDate}
                  variant='outlined'
                />
              </div>
            </FormControl>
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
