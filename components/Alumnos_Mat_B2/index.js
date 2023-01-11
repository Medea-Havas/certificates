//import * as React from 'react';
import React, {Component, useState} from 'react';
import Head from 'next/head';
import { DataGrid } from '@mui/x-data-grid';
import Image from 'next/Image';
import { Button, Link, TextField } from '@mui/material';
import styles from './Alumnos_Mat_B2.module.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const columns = [
  { field: 'nombreCurso', headerName: 'Nombre de curso', width: 110, headerAlign: 'center', align: 'center' },
  {field: 'id', headerName: 'Nº de certificado', flex: 1, headerAlign: 'center', align: 'center',},
  {
    field: 'f_fin',
    headerName: 'F. fin de examen',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
      Cell: props => {moment(props.value).format('dd/MM/yyyy')}
  },
  { field: 'ciudad', headerName: 'Ciudad',flex: 1, headerAlign: 'center', align: 'center' },
  {
    field: 'f_cel',
    headerName: 'F. de celebración',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
      Cell: props => {moment(props.value).format('dd/MM/yyyy')}
  },
  {
    field: "buttonAtions",
    headerName: "",
    sortable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      const onClick = (e) => {
      };
      return <div><Button onClick={onClick} className={styles.buttonStyle}>Editar</Button><Button onClick={onClick} className={styles.buttonStyle}>Borrar</Button></div>;
    }
  }
];

const rows = [
  {nombreCurso: "Juan", id: "27856438J", f_fin: "31/10/22",  ciudad:"A Coruña", f_celebracion: "31/10/22"},
  {nombreCurso: "Francisco", id: "27856439A", f_fin: "24/10/22",  ciudad:"A Coruña", f_celebracion: "31/10/22"},
  {nombreCurso: "Pablo", id: "27856438P", f_fin: "14/10/22",  ciudad:"A Coruña", f_celebracion: "31/10/22"},
  {nombreCurso: "Bruno", id: "27856438B", f_fin: "18/10/22",  ciudad:"A Coruña", f_celebracion: "31/10/22"},
  {nombreCurso: "Alejandro", id: "37856438J", f_fin: "01/10/22",  ciudad:"A Coruña", f_celebracion: "31/10/22"},
  {nombreCurso: "Juan", id: "27856438C", f_fin: "31/10/22",  ciudad:"A Coruña", f_celebracion: "31/10/22"},
  {nombreCurso: "Juan", id: "27856438D", f_fin: "31/10/22",  ciudad:"A Coruña", f_celebracion: "31/10/22"},
  {nombreCurso: "Juan", id: "27856438G", f_fin: "31/10/22",  ciudad:"A Coruña", f_celebracion: "31/10/22"},
  {nombreCurso: "Juan", id: "27856438E", f_fin: "31/10/22",  ciudad:"A Coruña", f_celebracion: "31/10/22"},
  {nombreCurso: "Juan", id: "27856437J", f_fin: "31/10/22",  ciudad:"A Coruña", f_celebracion: "31/10/22"},
  {nombreCurso: "Juan", id: "27856433A", f_fin: "31/10/22",  ciudad:"A Coruña", f_celebracion: "31/10/22"},
];

/*function HandleOpen() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
}*/


export default function AlumnosMatB2 () {
      const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

      const [age, setAge] = React.useState('');
      const handleChange = (event) => {
        setAge(event.target.value);
      };

      //const { children } = this.props
      return (
        <>
          <Head>
            <title>Certificados Medea - Usuarios</title>
            <meta
              name='description'
              content='Gestor de certificados de los cursos de Medea'
            />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel='icon' href='/favicon.ico' />
          </Head>
              <main className={styles.main}>
              <div>
                  <div className={styles.alumnoRoute}>
                      <Link className={styles.typeXSmall} href="/">Estudiantes</Link>
                      <text className={styles.typeXSmall}>{" > "}</text>
                      <Link className={styles.typeXSmall}>John Doe Márquez</Link>
                      <text className={styles.typeXSmall}>{" > "}</text>
                      <Link className={styles.typeXSmall}>Cursos Matriculado</Link>
                  </div>
                  <div className={styles.alumnoInfoTop}>
                      <text className={styles.typeXLarge}>John Doe Márquez</text>
                      <div>
                          <Button variant='contained' className={styles.buttonTop}>Información</Button>
                          <Button variant='contained' className={styles.buttonTop}>Cursos matriculado</Button>
                      </div>
                  </div>
                  <div className={styles.alumnoInfoContainer}>
                    <text className={styles.typeLarge}> Cursos Matriculado</text>
                    <Button variant='contained' onClick={handleOpen}>Cursos matriculado</Button>
                  </div>
                  <div className={styles.table}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      rowHeight={52}
                    />
                  </div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                  <Box className={styles.modalBox}>
                    <Typography id="modal-modal-title" variant="subtitle2" component="h2" fontSize={26}>
                      Matricular en curso
                    </Typography>
                    <div className={styles.allTextFields}>
                      <div>
                        <div className={styles.textFieldModal}>
                          <text>Seleccione un curso</text>
                          <FormControl fullWidth>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={age}
                              label="Age"
                              onChange={handleChange}
                              styles = {styles.controlLabel}
                            >
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className={styles.textFieldModal}>
                          <text>Ciudad</text>
                          <TextField id="outlined-basic" label="" variant="outlined"/>
                        </div>
                      </div>
                      <div>
                        <div className={styles.textFieldModal}>
                          <text>Fecha fin de examen</text>
                          <TextField id="outlined-basic" label="" variant="outlined"/>
                        </div>
                        <div className={styles.textFieldModal}>
                          <text>Fecha de celebración</text>
                          <TextField id="outlined-basic" label="" variant="outlined"/>
                        </div>
                      </div>
                    </div>
                    <div className={styles.modalButtonsCont}>
                      <Button variant='contained' className={styles.modalButton}>Cancelar</Button>
                      <Button variant='contained' className={styles.modalButton}>Aceptar</Button>
                    </div>
                  </Box>
                </Modal>
              </div>
              </main>
        </>
      );
    }
