import { Button, FormControl, Select, Modal, TextField } from '@mui/material';
import { Box } from '@mui/system';
import styles from './StudentsSectionCourses.module.css';

export default function StudentsCoursesModal({
  handleCourseToEnrollChange,
  handleClose,
  handleSubmit,
  open,
  optionCourses,
  select,
  completedDate,
  updateDate
}) {
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
                onChange={handleCourseToEnrollChange}
                styles={styles.controlLabel}
              >
                {optionCourses}
              </Select>
              <div className={styles.modalTextField}>
                <p>Fecha curso completado</p>
                <TextField
                  variant='outlined'
                  type='date'
                  value={completedDate}
                  onChange={e => updateDate(e)}
                />
              </div>
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
