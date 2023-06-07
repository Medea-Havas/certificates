import { TextField, Modal, Box, Button } from '@mui/material';
import { useState } from 'react';
import styles from './StudentsSectionHome.module.css';

export default function StudentsModal({ handleClose, open }) {
  const [ncStudent, setNCStudent] = useState('');

  const handleSubmit = event => {
    console.log(ncStudent);
  };

  const updateField = (e, field) => {
    setNCStudent(prevState => ({
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
        <p className={styles.title}>Nuevo alumno</p>
        <div className={styles.container}>
          <div className={styles.textFieldModal}>
            <p>Nombre</p>
            <TextField
              label=''
              variant='outlined'
              value={ncStudent.name}
              onChange={e => updateField(e, 'name')}
            />
          </div>
          <div className={styles.textFieldModal}>
            <p>Apellidos</p>
            <TextField
              label=''
              variant='outlined'
              value={ncStudent.last_name}
              onChange={e => updateField(e, 'last_name')}
            />
          </div>
          <div className={styles.textFieldModal}>
            <p>Email</p>
            <TextField
              label=''
              variant='outlined'
              type='email'
              value={ncStudent.email}
              onChange={e => updateField(e, 'email')}
            />
          </div>
          <div className={styles.textFieldModal}>
            <p>NIF/NIE</p>
            <TextField
              label=''
              variant='outlined'
              type='nif'
              value={ncStudent.nif}
              onChange={e => updateField(e, 'nif')}
            />
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
