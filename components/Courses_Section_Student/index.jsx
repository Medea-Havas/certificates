import {
  DataGrid,
  GridLinkOperator,
  GridToolbar,
  esES
} from '@mui/x-data-grid';
import { Button } from '@mui/material';
import React from 'react';
import styles from './CoursesSectionStudent.module.css';
import Link from 'next/link';
import QuickSearchToolbar from '../Utils/searchbar';
import moment from 'moment';
import localization from 'moment/locale/es';

export default function CoursesSectionStudent({
  loadingStudents,
  removeStudentToEnroll,
  showStudentModal,
  showExcelModal,
  students
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
              onClick={() => removeStudentToEnroll(params.row)}
              variant='outlined'
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
              className={styles.buttonTop}
              onClick={showStudentModal}
              variant='outlined'
            >
              Añadir alumno
            </Button>
            <Button
              className={styles.buttonTop}
              onClick={showExcelModal}
              variant='outlined'
            >
              Cargar alumnos
            </Button>
          </div>
        </div>
        <div className={styles.table}>
          <DataGrid
            autoPageSize
            columns={columns}
            components={{ Toolbar: QuickSearchToolbar }}
            disableSelectionOnClick
            getRowId={row => row.id}
            initialState={{
              filter: {
                filterModel: {
                  items: [],
                  quickFilterLogicOperator: GridLinkOperator.Or
                }
              }
            }}
            localeText={{
              localeText: esES.components.MuiDataGrid.defaultProps.localeText,
              noRowsLabel: 'Todavía no hay alumnos matriculados'
            }}
            loading={loadingStudents}
            onProcessRowUpdateError={error => console.warn(error)}
            rows={students}
            rowHeight={80}
            slots={{ toolbar: GridToolbar }}
            sx={{ overflowX: 'scroll' }}
          />
        </div>
      </div>
    </div>
  );
}
