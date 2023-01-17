import React, { Component } from 'react';
import Head from 'next/head';
import { DataGrid } from '@mui/x-data-grid';
import Image from 'next/Image';
import { Button, Link } from '@mui/material';
import styles from './CoursesAlumno.module.css';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

const columns = [
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 110,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'apellidos',
    headerName: 'Apellidos',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'id',
    headerName: 'NIF',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'f_fin',
    headerName: 'F. fin examen',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    Cell: props => {
      moment(props.value).format('dd/MM/yyyy');
    }
  },
  {
    field: 'buttonAtions',
    headerName: '',
    sortable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    renderCell: params => {
      const onClick = e => {};
      return (
        <Button onClick={onClick} className={styles.buttonStyle}>
          Ver alumno
        </Button>
      );
    }
  }
];

const rows = [
  {
    nombre: 'Juan',
    apellidos: 'Galileo Doe',
    id: '27856438J',
    f_fin: '25/03/2021'
  },
  {
    nombre: 'Francisco',
    apellidos: 'Martinez Martin',
    id: '27856439A',
    f_fin: '30/03/2021'
  },
  {
    nombre: 'Pablo',
    apellidos: 'Perez Gil',
    id: '27856438P',
    f_fin: '26/03/2021'
  },
  {
    nombre: 'Bruno',
    apellidos: 'Ortega Smith',
    id: '27856438B',
    f_fin: '30/03/2021'
  },
  {
    nombre: 'Alejandro',
    apellidos: 'Galileo Doe',
    id: '37856438J',
    f_fin: '30/03/2021'
  },
  {
    nombre: 'Juan',
    apellidos: 'Galileo Doe',
    id: '27856438C',
    f_fin: '14/03/2021'
  },
  {
    nombre: 'Juan',
    apellidos: 'Galileo Doe',
    id: '27856438D',
    f_fin: '30/03/2021'
  },
  {
    nombre: 'Juan',
    apellidos: 'Galileo Doe',
    id: '27856438G',
    f_fin: '04/03/2021'
  },
  {
    nombre: 'Juan',
    apellidos: 'Galileo Doe',
    id: '27856438E',
    f_fin: '30/03/2021'
  },
  {
    nombre: 'Juan',
    apellidos: 'Galileo Doe',
    id: '27856437J',
    f_fin: '30/03/2021'
  },
  {
    nombre: 'Juan',
    apellidos: 'Galileo Doe',
    id: '27856433A',
    f_fin: '30/03/2021'
  },
  {
    nombre: 'Juan',
    apellidos: 'Galileo Doe',
    id: '27856538G',
    f_fin: '04/03/2021'
  },
  {
    nombre: 'Juan',
    apellidos: 'Galileo Doe',
    id: '27853438E',
    f_fin: '30/03/2021'
  },
  {
    nombre: 'Juan',
    apellidos: 'Galileo Doe',
    id: '27857437J',
    f_fin: '30/03/2021'
  },
  {
    nombre: 'Juan',
    apellidos: 'Galileo Doe',
    id: '27858433A',
    f_fin: '30/03/2021'
  },
  {
    nombre: 'Bruno',
    apellidos: 'Ortega Smith',
    id: '57856438B',
    f_fin: '30/03/2021'
  },
  {
    nombre: 'Alejandro',
    apellidos: 'Galileo Doe',
    id: '37656438J',
    f_fin: '30/03/2021'
  },
  {
    nombre: 'Juan',
    apellidos: 'Galileo Doe',
    id: '27876438A',
    f_fin: '14/03/2021'
  }
];

export default class CursosFichaAlumno extends Component {
  render() {
    const { children } = this.props;
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
            <div className={styles.coursesRoute}>
              <Breadcrumbs aria-label='breadcrumb' color='text.primary'>
                <Link underline='hover' color='text.primary' href='/'>
                  Cursos
                </Link>
                <Link underline='hover' color='text.primary' href='/'>
                  Curso 01
                </Link>
                <Typography color='text.primary'>
                  Alumnos matriculados
                </Typography>
              </Breadcrumbs>
            </div>
            <div className={styles.coursesInfoTop}>
              <text className={typeXLarge}>Curso 01</text>
              <div>
                <Button variant='contained' className={styles.buttonTop}>
                  Cargar alumnos
                </Button>
                <Button variant='contained' className={styles.buttonTop}>
                  Descargar alumnos
                </Button>
              </div>
            </div>
            <div>
              <Button variant='contained' className={styles.button}>
                Información
              </Button>
              <Button variant='contained' className={styles.button}>
                Diploma
              </Button>
              <Button variant='contained' className={styles.button}>
                Alumnos matriculados
              </Button>
            </div>
            <div className={styles.alumnosContent}>
              <div className={styles.alumnoTitle}>
                <text className={typeMedium}>Alumnos matriculados</text>
              </div>
              <div className={styles.table}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={13}
                  rowsPerPageOptions={[13]}
                  rowHeight={53}
                />
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}
