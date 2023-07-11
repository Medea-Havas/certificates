import React, { useEffect, useState } from 'react';
import { DataGrid, GridLinkOperator, esES } from '@mui/x-data-grid';
import { Alert, AlertTitle, Button, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import Modal from './modal';
import styles from './StudentsSectionCourses.module.css';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import QuickSearchToolbar from '../Utils/searchbar';
import localization from 'moment/locale/es';
import axios from 'axios';

export default function StudentsSectionCourses() {
  const [completedDate, setCompletedDate] = useState(
    moment().format('YYYY-MM-DD')
  );
  const [courses, setCourses] = useState([]);
  const [courseToRemove, setCourseToRemove] = useState({});
  const [error, setError] = useState(false);
  const [loadingUserCourses, setLoadingUserCourses] = useState(true);
  const [open, setOpen] = useState(false);
  const [optionCourses, setOptionCourses] = useState([]);
  const [select, setSelect] = useState('');
  const [updateData, setUpdateData] = useState(false);

  const { query, isReady } = useRouter();

  const API_HOST = process.env.API_HOST;
  moment.updateLocale('es', localization);

  const columns = [
    {
      headerName: 'Curso',
      field: 'title',
      minWidth: 110,
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      headerName: 'F. inicio',
      field: 'date_init',
      headerAlign: 'center',
      align: 'center',
      minWidth: 100,
      flex: 1,
      Cell: props => {
        props.value;
      },
      valueFormatter: ({ value }) => {
        return moment(value).format('L');
      }
    },
    {
      headerName: 'F. finalización',
      field: 'date_end',
      headerAlign: 'center',
      align: 'center',
      minWidth: 100,
      flex: 1,
      Cell: props => {
        props.value;
      },
      valueFormatter: ({ value }) => {
        return moment(value).format('L');
      }
    },
    {
      headerName: 'Nº Expediente',
      field: 'file_number',
      headerAlign: 'center',
      align: 'center',
      minWidth: 100,
      flex: 1
    },
    {
      headerName: 'Nº créditos',
      field: 'credits',
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      minWidth: 100,
      flex: 1
    },
    {
      headerName: 'Imagen',
      field: 'certificate_thumbnail',
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      minWidth: 100,
      flex: 1,
      renderCell: params => {
        return (
          <Image
            alt='Picture of the author'
            height={100}
            src={
              `${process.env.API_HOST}/assets/certificates/${params.value}` ||
              './noimage.png'
            }
            width={100}
          />
        );
      }
    },
    {
      headerName: '',
      field: 'buttonActions',
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      width: 240,
      renderCell: params => (
        <>
          <div className={styles.buttonActions}>
            <Link
              href={{
                pathname: '../curso/[id]',
                query: {
                  id: params.row.id
                }
              }}
            >
              <Button variant='outlined'>Ver</Button>
            </Link>
          </div>
          <Button
            data-id={params.row.id}
            data-name={`${params.row.name} ${params.row.last_name}`}
            onClick={showError}
            variant='outlined'
            className='warn'
          >
            Borrar
          </Button>
        </>
      )
    }
  ];

  const handleClose = () => {
    setOpen(false);
    setSelect('');
  };
  const handleCourseToEnrollChange = event => {
    setSelect(event.target.value);
  };
  const handleOpen = () => setOpen(true);
  const handleRemoveCourse = () => {
    axios
      .delete(`${API_HOST}/userscourses/${query.id}/${courseToRemove.id}`)
      .then(response => {
        if (response.status === 200) {
          resetData();
          hideError();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleSubmit = () => {
    let data = {
      user_id: query.id,
      course_id: select,
      date_completed: completedDate
    };
    axios
      .post(`${API_HOST}/userscourses`, data)
      .then(response => {
        resetData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const hideError = () => {
    setError(false);
  };
  const showError = e => {
    setCourseToRemove({
      id: e.target.dataset.id,
      name: e.target.dataset.name
    });
    setError(true);
  };
  const resetData = () => {
    setCourses([]);
    setOptionCourses([]);
    setCompletedDate(moment().format('YYYY-MM-DD'));
    handleClose();
    setUpdateData(!updateData);
  };
  const updateDate = e => {
    setCompletedDate(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${API_HOST}/coursesfromuser/${query.id}`)
      .then(coursesList => {
        if (coursesList.data.length) {
          setCourses(coursesList.data);
        }
        setLoadingUserCourses(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(`${API_HOST}/coursesnotfromuser/${query.id}`)
      .then(response => {
        let tags = [];
        response.data.forEach(element => {
          tags.push(
            <MenuItem key={element.id} value={element.id}>
              {element.id} - {element.title}
            </MenuItem>
          );
        });
        setOptionCourses(tags);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [updateData]);

  return (
    <div>
      <div className={styles.alumnoInfoContainer}>
        <h2>Cursos Matriculado</h2>
        <Button variant='outlined' onClick={handleOpen}>
          Matricular en curso
        </Button>
      </div>
      <div className={styles.table}>
        <DataGrid
          autoPageSize
          columns={columns}
          components={{ Toolbar: QuickSearchToolbar }}
          disableSelectionOnClick
          initialState={{
            filter: {
              filterModel: {
                items: [],
                quickFilterLogicOperator: GridLinkOperator.Or
              }
            }
          }}
          loading={loadingUserCourses}
          localeText={{
            localeText: esES.components.MuiDataGrid.defaultProps.localeText,
            noRowsLabel: 'Todavía no está matriculado en ningún curso'
          }}
          rowHeight={80}
          rows={courses}
          sx={{ overflowX: 'scroll' }}
        />
      </div>
      <Modal
        completedDate={completedDate}
        handleClose={handleClose}
        handleCourseToEnrollChange={handleCourseToEnrollChange}
        handleSubmit={handleSubmit}
        open={open}
        optionCourses={optionCourses}
        select={select}
        updateDate={updateDate}
      />
      <Alert
        className={`${error ? 'active' : ''}`}
        onClose={hideError}
        severity='error'
      >
        <AlertTitle>¿Desea eliminar la matrícula para este curso?</AlertTitle>
        <small className={styles.small}>{courseToRemove.title}</small>
        <Button
          className={styles.updateButton}
          onClick={handleRemoveCourse}
          variant='outlined'
        >
          Sí, eliminar
        </Button>
        <Button
          className={styles.cancelButton}
          onClick={hideError}
          variant='outlined'
        >
          No, cancelar
        </Button>
      </Alert>
    </div>
  );
}
