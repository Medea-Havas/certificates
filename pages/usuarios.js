import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import Head from 'next/head';
import styles from '../styles/Users.module.css';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';

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
      {/*<main className={styles.main}>
        <h2>Usuarios</h2>
        <FormControl>
          <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='female'
            name='radio-buttons-group'
          >
            <FormControlLabel
              value='female'
              control={<Radio />}
              label='Female'
            />
            <FormControlLabel value='male' control={<Radio />} label='Male' />
            <FormControlLabel value='other' control={<Radio />} label='Other' />
          </RadioGroup>
        </FormControl>
  </main>*/}
  <main className={styles.main}>
    <div>
      <div className={styles.studentsTop}>
        <text className={styles.typeXLarge}>Estudiantes</text>
        <Button variant='contained'>+ Nuevo Estudiante</Button>
      </div>
      <div className={styles.searcherContainer}>
        <text className={styles.typeLarge}> Buscador</text>
          <div className={styles.allSearchers}>
            <div className={styles.searcherField}>
              <text className={styles.typeXSmall}>Nombre</text>
              <TextField id="outlined-basic" label="" variant="outlined" InputLabelProps={{className: styles.input}} InputProps={{className: styles.label}} />
            </div>
            <div className={styles.searcherField}>
              <text className={styles.typeXSmall}>Apellidos</text>
              <TextField id="outlined-basic" label="" variant="outlined" InputLabelProps={{className: styles.input}} InputProps={{className: styles.label}} />
            </div>
            <div className={styles.searcherField}>
              <text className={styles.typeXSmall}>Email</text>
              <TextField id="outlined-basic" label="" variant="outlined" InputLabelProps={{className: styles.input}} InputProps={{className: styles.label}} />
            </div>
            <div className={styles.searcherField}>
              <text className={styles.typeXSmall}>NIF</text>
              <TextField id="outlined-basic" label="" variant="outlined" InputLabelProps={{className: styles.input}} InputProps={{className: styles.label}} />
            </div>
            <div className={styles.searcherField}>
              <text className={styles.typeXSmall}>Tipo de Uusario</text>
              <TextField id="outlined-basic" label="" variant="outlined" InputLabelProps={{className: styles.input}} InputProps={{className: styles.label}} />
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
      </main>
    </>
  );
}
