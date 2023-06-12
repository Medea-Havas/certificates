import { Alert, AlertTitle, Box, Button, Link } from '@mui/material';
import {
  DataGrid,
  GridLinkOperator,
  esES,
  GridToolbar
} from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './CoursesSectionHome.module.css';
import CoursesModal from './modal';
import moment from 'moment';
import localization from 'moment/locale/es';
import QuickSearchToolbar from '../Utils/searchbar';
import Image from 'next/image';

export default function CoursesSectionHome() {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [courseToRemove, setCourseToRemove] = useState(null);
  const [coursesToUpdate, setCoursesToUpdate] = useState([]);
  const [resetCourses, setResetCourses] = useState(false);
  const columns = [
    {
      headerName: 'Curso',
      field: 'title',
      editable: true,
      minWidth: 110,
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      headerName: 'F. inicio',
      field: 'date_init',
      editable: true,
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
      editable: true,
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
      headerName: 'Num. expediente',
      field: 'file_number',
      editable: true,
      headerAlign: 'center',
      align: 'center',
      minWidth: 100,
      flex: 1
    },
    {
      headerName: 'Num. créditos',
      field: 'credits',
      editable: true,
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      minWidth: 100,
      flex: 1
    },
    {
      headerName: 'Imagen',
      editable: false,
      field: 'image',
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
      editable: false,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      minWidth: 100,
      width: 240,
      renderCell: params => {
        return (
          <div className={styles.buttonActions}>
            <Link href={`curso/${params.row.id}`}>
              <Button variant='outlined'>Ver</Button>
            </Link>
            <Button
              data-id={`${params.row.title}`}
              onClick={showError}
              variant='outlined'
              className='warn'
            >
              Borrar
            </Button>
          </div>
        );
      }
    }
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const showError = e => {
    // setCourseToRemove(e.target.dataset.id);
    setError(true);
  };
  const hideError = () => setError(false);
  const showWarning = e => {
    setCourseToRemove(e.target.dataset.id);
    setWarning(true);
  };
  const hideWarning = () => setWarning(false);
  const hideWarningAndReset = () => {
    setWarning(false);
    setResetCourses(!resetCourses);
    setCoursesToUpdate([]);
  };
  const handleRemoveCourse = () => {
    //TODO Remove course
    console.log('Remove course');
  };
  const updateCourse = newRow => {
    //TODO Update course
    console.log(newRow);
    const updatedRow = { ...newRow, isNew: false };
    var index = -1;
    for (var i = 0; i < coursesToUpdate.length; i++) {
      if (coursesToUpdate[i].id == newRow.id) {
        index = i;
      }
    }
    if (index == -1) {
      setCoursesToUpdate([...coursesToUpdate, newRow]);
    } else {
      const newArray = [...coursesToUpdate];
      newArray.splice(index, 1, newRow);
      setCoursesToUpdate(newArray);
    }
    setWarning(true);
    return updatedRow;
  };
  const removeAccents = str => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  useEffect(() => {
    moment.updateLocale('es', localization);
    if (!localStorage.getItem('courses')) {
      fetch('https://certificates-api.hhytest.com/public/index.php/courses')
        .then(coursesList => coursesList.json())
        .then(adaptedCourses => {
          setCourses(adaptedCourses);
          localStorage.setItem('courses', JSON.stringify(adaptedCourses));
          setLoading(false);
        });
    } else {
      let tempCourses = localStorage.getItem('courses');
      setCourses(JSON.parse(tempCourses));
      setLoading(false);
    }
  }, [resetCourses]);

  return (
    <>
      <div>
        <div className='sectionHeader'>
          <h1>Cursos</h1>
          <Button variant='outlined' onClick={handleOpen}>
            + Nuevo Curso
          </Button>
        </div>
        <div className={styles.table}>
          <DataGrid
            getRowId={row => row.id}
            columns={columns}
            rows={courses}
            rowHeight={80}
            editMode='row'
            processRowUpdate={updateCourse}
            experimentalFeatures={{ newEditingApi: true }}
            initialState={{
              filter: {
                filterModel: {
                  items: [],
                  quickFilterLogicOperator: GridLinkOperator.Or
                }
              }
            }}
            slots={{ toolbar: GridToolbar }}
            loading={loading}
            components={{ Toolbar: QuickSearchToolbar }}
            sx={{ overflowX: 'scroll' }}
            disableSelectionOnClick
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            onProcessRowUpdateError={error => console.warn(error)}
          />
        </div>
      </div>
      <CoursesModal open={open} handleClose={handleClose} />
      <Alert
        onClose={hideWarning}
        severity='warning'
        className={`${warning ? 'active' : ''}`}
      >
        <AlertTitle>Cambios detectados</AlertTitle>
        <ul className={styles.changesList}>
          {coursesToUpdate.map(course => (
            <li key={Math.random()}>
              <p>
                {course.id} - {course.title}
              </p>
              <p>
                {course.credits} créditos ({course.hours}h)
              </p>
            </li>
          ))}
        </ul>
        <Button variant='outlined'>Actualizar cambios</Button>
        <Button variant='outlined' onClick={hideWarningAndReset}>
          Deshechar cambios
        </Button>
        <Button variant='outlined' onClick={hideWarning}>
          Cancelar
        </Button>
      </Alert>
      <Alert
        onClose={hideError}
        severity='error'
        className={`${error ? 'active' : ''}`}
      >
        <AlertTitle>¿Desea eliminar este curso?</AlertTitle>
        <small className={styles.small}>{courseToRemove}</small>
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
    </>
  );
}
