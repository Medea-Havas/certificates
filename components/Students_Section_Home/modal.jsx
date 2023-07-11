import { TextField, Modal, Box, Button } from '@mui/material';
import styles from './StudentsSectionHome.module.css';

export default function StudentsModal({
  handleAddStudent,
  handleClose,
  ncStudent,
  open,
  updateStudentField
}) {
  return (
    <Modal
      aria-describedby='modal-modal-description'
      aria-labelledby='modal-modal-title'
      id='modal'
      onClose={handleClose}
      open={open}
    >
      <Box className={styles.modalBox}>
        <p className={styles.title}>Nuevo alumno</p>
        <div className={styles.container}>
          <div className={styles.textFieldModal}>
            <p>Nombre</p>
            <TextField
              label=''
              onChange={e => updateStudentField(e, 'name')}
              variant='outlined'
              value={ncStudent.name}
            />
          </div>
          <div className={styles.textFieldModal}>
            <p>Apellidos</p>
            <TextField
              label=''
              onChange={e => updateStudentField(e, 'last_name')}
              variant='outlined'
              value={ncStudent.last_name}
            />
          </div>
          <div className={styles.textFieldModal}>
            <p>Email</p>
            <TextField
              label=''
              onChange={e => updateStudentField(e, 'email')}
              type='email'
              variant='outlined'
              value={ncStudent.email}
            />
          </div>
          <div className={styles.textFieldModal}>
            <p>NIF/NIE</p>
            <TextField
              label=''
              onChange={e => updateStudentField(e, 'nif')}
              type='nif'
              value={ncStudent.nif}
              variant='outlined'
            />
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
            onClick={handleAddStudent}
            variant='contained'
          >
            Aceptar
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
