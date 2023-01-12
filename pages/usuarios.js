import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import Head from 'next/head';
import styles from '../styles/Users.module.css';

import React, {useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

import Alumnos_Mat_A1 from '../components/Alumnos_Mat_A1/index';
import Alumnos_Mat_B2 from '../components/Alumnos_Mat_B2/index';

const columns = [
  { field: 'nombre', headerName: 'Nombre', width: 110, headerAlign: 'center', align: 'center' },
  {field: 'apellidos', headerName: 'Apellidos', flex: 1, headerAlign: 'center', align: 'center',},
  { field: 'email', headerName: 'Email',flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'id', headerName: 'NIF',flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'tipo_usuario', headerName: 'Tipo de Usuario', width: 250, headerAlign: 'center', align: 'center' },
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
      return <div><Button onClick={onClick} className={styles.buttonStyle}>Ver</Button><Button onClick={onClick} className={styles.buttonStyle}>Editar</Button><Button onClick={onClick} className={styles.buttonStyle}>Borrar</Button></div>;
    }
  }
];

const rows = [
  {nombre: "Juan", apellidos: "Galileo Doe", email: "juanga@gmail.com", id: "27856438J", tipo_usuario:"Estudiante"},
  {nombre: "Francisco", apellidos: "Martinez Martin", email: "franmarma@gmail.com", id: "27856439A", tipo_usuario:"Estudiante"},
  {nombre: "Pablo", apellidos: "Perez Gil", email: "pablopegi@gmail.com", id: "27856438P", tipo_usuario:"Estudiante"},
  {nombre: "Bruno", apellidos: "Ortega Smith", email: "brunosmi@gmail.com", id: "27856438B", tipo_usuario:"Estudiante"},
  {nombre: "Alejandro", apellidos: "Galileo Doe", email: "alegado@gmail.com", id: "37856438J", tipo_usuario:"Estudiante"},
  {nombre: "Juan", apellidos: "Galileo Doe", email: "juanga@gmail.com", id: "27856438C", tipo_usuario:"Estudiante"},
  {nombre: "Juan", apellidos: "Galileo Doe", email: "juanga@gmail.com", id: "27856438D", tipo_usuario:"Estudiante"},
  {nombre: "Juan", apellidos: "Galileo Doe", email: "juanga@gmail.com", id: "27856438G", tipo_usuario:"Estudiante"},
  {nombre: "Juan", apellidos: "Galileo Doe", email: "juanga@gmail.com", id: "27856438E", tipo_usuario:"Estudiante"},
  {nombre: "Juan", apellidos: "Galileo Doe", email: "juanga@gmail.com", id: "27856437J", tipo_usuario:"Estudiante"},
  {nombre: "Juan", apellidos: "Galileo Doe", email: "juanga@gmail.com", id: "27856433A", tipo_usuario:"Estudiante"},
];



export default function Users() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [course, setCourse] = React.useState('');
  const handleChangeCourse = (event) => {
    setCourse(event.target.value);
  };

  const [tutor, setTutor] = React.useState('');
  const handleChangeTutor = (event) => {
    setTutor(event.target.value);
  };

  const [ciudad, setCiudad] = React.useState(' ');
  const handleChangeCiudad = (event) => {
    setCiudad(event.target.value);
  }

  const [fFin, setFFin] = React.useState(' ');
  const handleChangeFFin = (event) => {
    setFFin(event.target.value);
  }


  const [fInicio, setFInicio] = React.useState(' ');
  const handleChangeFInicio = (event) => {
    setFInicio(event.target.value);
  }

  const [nCreditos, setNCred] = React.useState(' ');
  const handleChangeNCred = (event) => {
    setNCred(event.target.value);
  }

  const [nExpediente, setNExp] = React.useState(' ');
  const handleChangeNExp = (event) => {
    setNExp(event.target.value);
  }
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
            <div className={styles.studentsTop}>
              <text className={styles.typeXLarge}>Estudiantes</text>
              <Button variant='contained' onClick={handleOpen}>+ Nuevo Estudiante</Button>
            </div>
            <div className={styles.searcherContainer}>
              <text className={styles.typeLarge}> Buscador</text>
                <div className={styles.allSearchers}>
                  <div className={styles.searcherField}>
                    <text className={styles.typeXSmall}>Nombre</text>
                    <TextField id="outlined-basic" label="" variant="outlined"/>
                  </div>
                  <div className={styles.searcherField}>
                    <text className={styles.typeXSmall}>Apellidos</text>
                    <TextField id="outlined-basic" label="" variant="outlined"/>
                  </div>
                  <div className={styles.searcherField}>
                    <text className={styles.typeXSmall}>Email</text>
                    <TextField id="outlined-basic" label="" variant="outlined"/>
                  </div>
                  <div className={styles.searcherField}>
                    <text className={styles.typeXSmall}>NIF</text>
                    <TextField id="outlined-basic" label="" variant="outlined"/>
                  </div>
                  <div className={styles.searcherField}>
                    <text className={styles.typeXSmall}>Tipo de Uusario</text>
                    <TextField id="outlined-basic" label="" variant="outlined"/>
                  </div>
                </div>
                <div className={styles.table}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={11}
                    rowsPerPageOptions={[11]}
                    rowHeight={71}
                  />
                </div>
                </div>
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
                        onChange={handleChangeCourse}
                      >
                        <MenuItem value={10}>Course 01</MenuItem>
                        <MenuItem value={20}>Course 02</MenuItem>
                        <MenuItem value={30}>Course 03</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className={styles.textFieldModal}>
                    <text>Tutor</text>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={tutor}
                        label="Tutor"
                        onChange={handleChangeTutor}
                      >
                        <MenuItem value={10}>Tutor 01</MenuItem>
                        <MenuItem value={20}>Tutor 02</MenuItem>
                        <MenuItem value={30}>Tutor 03</MenuItem>
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
                  <div className={styles.textFieldModal}>
                    <Button variant='contained'> Insertar imagen</Button>
                  </div>
                </div>
                <div>
                  <div className={styles.textFieldModal}>
                    <text>Fecha de inicio</text>
                    <TextField
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                      type="date"
                      value={fInicio}
                      onChange={handleChangeFInicio}
                    />
                  </div>
                  <div className={styles.textFieldModal}>
                    <text>Fecha de fin</text>
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
                    <text>Nº de créditos</text>
                    <TextField
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                      type="number"
                      value={nCreditos}
                      onChange={handleChangeNCred}
                    />
                  </div>
                  <div className={styles.textFieldModal}>
                    <text>Nº de expediente</text>
                    <TextField
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                      value={nExpediente}
                      onChange={handleChangeNExp}
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
            {/*<Alumnos_Mat_A1 />*/}
            </main>
          </>
  );
}
