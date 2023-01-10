import React, { Component } from 'react';
import Head from 'next/head';
import { DataGrid } from '@mui/x-data-grid';
import Image from 'next/Image';
import { Button, Link } from '@mui/material';
import styles from './Alumnos_Mat_B2.module.css';

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


export default class AlumnosMatB2 extends Component {
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
              </div>
              </main>
        </>
      );
    }
  }
