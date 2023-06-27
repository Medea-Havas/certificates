import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridLinkOperator,
  GridToolbar,
  esES
} from '@mui/x-data-grid';
import styles from './CoursesSectionStudent.module.css';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import Link from 'next/link';
import QuickSearchToolbar from '../Utils/searchbar';

export default function CoursesSectionStudent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [csToRemove, setCSToRemove] = useState(null);
  const [csToUpdate, setCSToUpdate] = useState([]);
  const [resetCS, setResetCS] = useState(false);
  const columns = [
    {
      headerName: 'Nombre',
      field: 'name',
      width: 110,
      headerAlign: 'center',
      align: 'center'
    },
    {
      headerName: 'Apellidos',
      field: 'last_name',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      headerName: 'NIF',
      field: 'nif',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      headerName: 'F. fin examen',
      field: 'date_completed',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      Cell: props => {
        moment(props.value).format('dd/MM/yyyy');
      }
    },
    {
      field: 'buttonActions',
      headerName: '',
      sortable: false,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: params => {
        const onClick = e => {
          console.log(params.row.id);
        };
        const courseId = JSON.parse(sessionStorage.getItem('course')).id;
        console.log(courseId);
        return (
          <>
            <Link href={'/alumno/' + params.row.id}>
              <Button className={styles.buttonStyle} variant='outlined'>
                Ver alumno
              </Button>
            </Link>
            <Link
              href={
                '/certificado?userId=' + params.row.id + '&courseId=' + courseId
              }
            >
              <Button className={styles.buttonStyle} variant='outlined'>
                Certificado
              </Button>
            </Link>
          </>
        );
      }
    }
  ];

  useEffect(() => {
    fetch(`${process.env.API_HOST}/usersfromcourse/${router.query.id}`)
      .then(studentsList => studentsList.json())
      .then(adaptedCourses => {
        setStudents(adaptedCourses);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.alumnosContent}>
        <div className={styles.alumnoTitle}>
          <h2>Alumnos matriculados</h2>
          <div>
            <Button variant='outlined' className={styles.buttonTop}>
              Añadir alumno
            </Button>
            <Button variant='outlined' className={styles.buttonTop}>
              Cargar alumnos
            </Button>
            <Button variant='outlined' className={styles.buttonTop}>
              Descargar alumnos
            </Button>
          </div>
        </div>
        <div className={styles.table}>
          <DataGrid
            getRowId={row => row.id}
            columns={columns}
            rows={students}
            rowHeight={80}
            initialState={{
              filter: {
                filterModel: {
                  items: [],
                  quickFilterLogicOperator: GridLinkOperator.Or
                }
              }
            }}
            slots={{ toolbar: GridToolbar }}
            autoPageSize
            loading={loading}
            components={{ Toolbar: QuickSearchToolbar }}
            sx={{ overflowX: 'scroll' }}
            disableSelectionOnClick
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            onProcessRowUpdateError={error => console.warn(error)}
          />
        </div>
      </div>
    </div>
  );
}
