import React, { useEffect, useState } from 'react';
import { DataGrid, GridLinkOperator, esES } from '@mui/x-data-grid';
import { Alert, AlertTitle, Button, MenuItem } from '@mui/material';
import Modal from './modal';
import styles from './StudentsSectionCourses.module.css';
import { useRouter } from 'next/router';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import QuickSearchToolbar from '../Utils/searchbar';
import localization from 'moment/locale/es';
import axios from 'axios';

export default function StudentsSectionCourses() {
  moment.updateLocale('es', localization);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loadingUserCourses, setLoadingUserCourses] = useState(true);
  const [updateData, setUpdateData] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseToRemove, setCourseToRemove] = useState({});
  const [optionCourses, setOptionCourses] = useState([]);
  const [select, setSelect] = useState('');
  const [completedDate, setCompletedDate] = useState(
    moment().format('YYYY-MM-DD')
  );
  const { query, isReady } = useRouter();
  const API_HOST = process.env.API_HOST;

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
      field: 'imagen',
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      minWidth: 100,
      flex: 1,
      renderCell: params => {
        const onClick = e => {};
        return (
          <Image
            src={'/pexels.jpeg'}
            alt='Picture of the author'
            width={100}
            height={100}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelect('');
  };
  const updateDate = e => {
    setCompletedDate(e.target.value);
  };
  const handleCourseToEnrollChange = event => {
    setSelect(event.target.value);
  };
  const showError = e => {
    setCourseToRemove({
      id: e.target.dataset.id,
      name: e.target.dataset.name
    });
    setError(true);
  };
  const hideError = () => {
    setError(false);
  };
  const resetData = () => {
    setCourses([]);
    setOptionCourses([]);
    setCompletedDate(moment().format('YYYY-MM-DD'));
    handleClose();
    setUpdateData(!updateData);
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
          columns={columns}
          rows={courses}
          rowHeight={120}
          initialState={{
            filter: {
              filterModel: {
                items: [],
                quickFilterLogicOperator: GridLinkOperator.Or
              }
            }
          }}
          loading={loadingUserCourses}
          components={{ Toolbar: QuickSearchToolbar }}
          sx={{ overflowX: 'scroll' }}
          disableSelectionOnClick
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
      <Modal
        handleClose={handleClose}
        open={open}
        handleCourseToEnrollChange={handleCourseToEnrollChange}
        handleSubmit={handleSubmit}
        optionCourses={optionCourses}
        select={select}
        completedDate={completedDate}
        updateDate={updateDate}
      />
      <Alert
        onClose={hideError}
        severity='error'
        className={`${error ? 'active' : ''}`}
      >
        <AlertTitle>¿Desea eliminar la matrícula para este curso?</AlertTitle>
        <small className={styles.small}>{courseToRemove.title}</small>
        <Button
          variant='outlined'
          className={styles.updateButton}
          onClick={handleRemoveCourse}
        >
          Sí, eliminar
        </Button>
        <Button
          variant='outlined'
          className={styles.cancelButton}
          onClick={hideError}
        >
          No, cancelar
        </Button>
      </Alert>
    </div>
  );
}
