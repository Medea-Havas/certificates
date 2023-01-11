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
import Breadcrumbs from '@mui/material/Breadcrumbs';

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

      const [course, setCourse] = React.useState('');
      const handleChange = (event) => {
        setCourse(event.target.value);
      };

      const [ciudad, setCiudad] = React.useState(' ');
      const handleChangeCiudad = (event) => {
        setCiudad(event.target.value);
      }

      const [fFin, setFFin] = React.useState(' ');
      const handleChangeFFin = (event) => {
        setFFin(event.target.value);
      }

      const [fCel, setFCel] = React.useState(' ');
      const handleChangeFCel = (event) => {
        setFCel(event.target.value);
      }

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
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                      Estudiantes
                    </Link>
                    <Link underline="hover" color="inherit" href="/">
                      John Doe Márquez
                    </Link>
                    <Typography color="text.primary">Cursos matriculado</Typography>
                  </Breadcrumbs>
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
                              value={course}
                              label="Course"
                              onChange={handleChange}
                              styles = {styles.controlLabel}
                            >
                              <MenuItem value={10}>Course 01</MenuItem>
                              <MenuItem value={20}>Course 02</MenuItem>
                              <MenuItem value={30}>Course 03</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className={styles.textFieldModal}>
                          <text>Ciudad</text>
                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="outlined"
                            value={ciudad}
                            onChange={handleChangeCiudad}
                          />
                        </div>
                      </div>
                      <div>
                        <div className={styles.textFieldModal}>
                          <text>Fecha fin de examen</text>
                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="outlined"
                            type="date"
                            value={fFin}
                            onChange={handleChangeFFin}
                          />
                        </div>
                        <div className={styles.textFieldModal}>
                          <text>Fecha de celebración</text>
                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="outlined"
                            type="date"
                            value={fCel}
                            onChange={handleChangeFCel}
                          />
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
