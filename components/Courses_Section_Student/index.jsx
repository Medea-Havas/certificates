import React from 'react';
import {
  DataGrid,
  GridLinkOperator,
  GridToolbar,
  esES
} from '@mui/x-data-grid';
import styles from './CoursesSectionStudent.module.css';
import { Button } from '@mui/material';
import Link from 'next/link';
import QuickSearchToolbar from '../Utils/searchbar';
import moment from 'moment';
import localization from 'moment/locale/es';

export default function CoursesSectionStudent({
  students,
  loadingStudents,
  showStudentModal,
  hideStudentModal,
  removeStudentToEnroll
}) {
  moment.updateLocale('es', localization);

  const columns = [
    {
      headerName: 'Nombre',
      field: 'name',
      flex: 1,
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
        props.value;
      },
      valueFormatter: ({ value }) => {
        return moment(value).format('L LT');
      }
    },
    {
      field: 'buttonActions',
      headerName: '',
      sortable: false,
      flex: 2,
      headerAlign: 'center',
      align: 'center',
      renderCell: params => {
        const courseId = JSON.parse(sessionStorage.getItem('course')).id;
        return (
          <>
            <Link
              href={
                '/certificado?userId=' + params.row.id + '&courseId=' + courseId
              }
            >
              <Button className={styles.buttonStyle} variant='outlined'>
                Certificado
              </Button>
            </Link>
            <Link href={'/alumno/' + params.row.id}>
              <Button className={styles.buttonStyle} variant='outlined'>
                Ver
              </Button>
            </Link>
            <Button
              className={`${styles.buttonStyle} warn`}
              variant='outlined'
              onClick={() => removeStudentToEnroll(params.row)}
            >
              Borrar
            </Button>
          </>
        );
      }
    }
  ];

  return (
    <div className={styles.main}>
      <div className={styles.alumnosContent}>
        <div className={styles.alumnoTitle}>
          <h2>Alumnos matriculados</h2>
          <div>
            <Button
              variant='outlined'
              className={styles.buttonTop}
              onClick={showStudentModal}
            >
              Añadir alumno
            </Button>
            <Button variant='outlined' className={styles.buttonTop}>
              Cargar alumnos
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
            loading={loadingStudents}
            components={{ Toolbar: QuickSearchToolbar }}
            sx={{ overflowX: 'scroll' }}
            disableSelectionOnClick
            localeText={{
              localeText: esES.components.MuiDataGrid.defaultProps.localeText,
              noRowsLabel: 'Todavía no hay alumnos matriculados'
            }}
            onProcessRowUpdateError={error => console.warn(error)}
          />
        </div>
      </div>
    </div>
  );
}
