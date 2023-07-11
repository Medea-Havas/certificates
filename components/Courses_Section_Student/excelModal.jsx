import { Button, Input, Modal } from '@mui/material';
import { Box } from '@mui/system';
import styles from './CoursesSectionStudent.module.css';
import React from 'react';

export default function ExcelModal({
  handleExcel,
  hideExcelModal,
  processExcel,
  openExcelModal
}) {
  return (
    <Modal
      aria-describedby='excel-modal-description'
      aria-labelledby='excel-modal-title'
      id='excel-modal'
      onClose={hideExcelModal}
      open={openExcelModal}
    >
      <Box className={styles.modalBox}>
        <p className={styles.title}>Cargar alumnos</p>
        <div className={styles.modalContainer}>
          <div className={styles.modalTextField}>
            <Input
              className={styles.buttonImage}
              name='excel-file'
              onChange={e => processExcel(e)}
              type='file'
            >
              Archivo .xlsx
            </Input>
          </div>
          <div className={styles.modalButtonsCont}>
            <Button
              className={`${styles.modalButton} alt`}
              onClick={hideExcelModal}
              variant='contained'
            >
              Cancelar
            </Button>
            <Button
              className={styles.modalButton}
              onClick={handleExcel}
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
