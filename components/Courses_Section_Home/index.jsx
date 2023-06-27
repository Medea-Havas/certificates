import { Alert, AlertTitle, Box, Button, Link, MenuItem } from '@mui/material';
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
import TemplateModal from './templatemodal';
import axios from 'axios';

export default function CoursesSectionHome() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [courses, setCourses] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [courseTitleToRemove, setCourseTitleToRemove] = useState('');
  const [courseIdToRemove, setCourseIdToRemove] = useState(0);
  const [coursesToUpdate, setCoursesToUpdate] = useState([]);
  const [resetCourses, setResetCourses] = useState(false);
  const [ncCourse, setNCCourse] = useState({});
  const [arrayTemplates, setArrayTemplates] = useState([]);
  const API_HOST = process.env.API_HOST;
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
      field: 'certificate_thumbnail',
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      minWidth: 100,
      flex: 1,
      renderCell: params => {
        const onClick = e => {};
        return (
          <Image
            src={
              `${process.env.API_HOST}/assets/certificates/${params.value}` ||
              './noimage.png'
            }
            alt='Certificate thumbnail'
            width={100}
            height={100}
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
              data-id={`${params.row.id}`}
              data-title={`${params.row.title}`}
              onClick={removeCourse}
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
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const removeCourse = e => {
    setCourseIdToRemove(e.target.dataset.id);
    setCourseTitleToRemove(e.target.dataset.title);
    setError(true);
  };
  const hideError = () => setError(false);
  const showWarning = e => {
    setCourseToRemove(e.target.dataset.id);
    setWarning(true);
  };
  const hideWarning = () => setWarning(false);
  const hideWarningAndReset = () => {
    sessionStorage.removeItem('courses');
    setWarning(false);
    setCoursesToUpdate([]);
    setUpdateData(!updateData);
  };
  const handleRemoveCourse = () => {
    axios
      .delete(`${API_HOST}/courses/${courseIdToRemove}`)
      .then(response => {
        if (response.status === 200) {
          sessionStorage.setItem('courses', []);
          setNCCourse({});
          setCourseIdToRemove(0);
          setCourseTitleToRemove('');
          setError(false);
          setUpdateData(!updateData);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const updateCourse = newRow => {
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
  const updateChanges = () => {
    coursesToUpdate.forEach((value, index) => {
      axios
        .patch(`${API_HOST}/courses/${value.id}`, value)
        .then(response => {
          if (response.status === 200) {
            console.log('Course with id ' + value.id + ' was updated');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
    hideWarningAndReset();
  };
  const removeAccents = str => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const arrayTemplateFunction = () => {
    if (!arrayTemplates.length) {
      let tempTemplates = JSON.parse(sessionStorage.getItem('templates')) || [];
      let arrayTemplates = [];
      for (let i = 0; i < tempTemplates.length; i++) {
        arrayTemplates.push(
          <MenuItem
            key={tempTemplates[i].id}
            value={tempTemplates[i].id}
            className={styles.menuitem}
          >
            {tempTemplates[i].title} (id: {tempTemplates[i].id})
          </MenuItem>
        );
      }
      setArrayTemplates(arrayTemplates);
    }
  };

  useEffect(() => {
    moment.updateLocale('es', localization);
    if (!sessionStorage.getItem('courses')) {
      fetch(`${API_HOST}/courses`)
        .then(coursesList => coursesList.json())
        .then(adaptedCourses => {
          setCourses(adaptedCourses);
          sessionStorage.setItem('courses', JSON.stringify(adaptedCourses));
          setLoading(false);
        });
    } else {
      let tempCourses = sessionStorage.getItem('courses');
      setCourses(JSON.parse(tempCourses));
      setLoading(false);
    }
    if (!sessionStorage.getItem('templates')) {
      fetch(`${API_HOST}/templates`)
        .then(templatesList => templatesList.json())
        .then(adaptedTemplates => {
          setTemplates(adaptedTemplates);
          sessionStorage.setItem('templates', JSON.stringify(adaptedTemplates));
          arrayTemplateFunction();
          console.log(adaptedTemplates);
        });
    } else {
      let tempTemplates = JSON.parse(sessionStorage.getItem('templates'));
      setTemplates(tempTemplates);
      arrayTemplateFunction();
      console.log(tempTemplates);
    }
  }, [updateData]);

  return (
    <>
      <div>
        <div className='sectionHeader'>
          <h1>Cursos</h1>
          <p>{error}</p>
          <div className={styles.creationButtons}>
            <Button variant='outlined' onClick={handleOpen}>
              + Nuevo curso
            </Button>
            <Button variant='outlined' onClick={handleOpen2}>
              + Gestionar plantillas
            </Button>
          </div>
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
      <CoursesModal
        open={open}
        handleClose={handleClose}
        ncCourse={ncCourse}
        setNCCourse={setNCCourse}
        setCourses={setCourses}
        resetCourses={resetCourses}
        templates={arrayTemplates}
        setUpdateData={setUpdateData}
        updateData={updateData}
      />
      <TemplateModal
        open={open2}
        handleClose={handleClose2}
        updateData={updateData}
        setUpdateData={setUpdateData}
        setArrayTemplates={setArrayTemplates}
        arrayTemplateFunction={arrayTemplateFunction}
        setTemplates={setTemplates}
      />
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
        <Button variant='outlined' onClick={updateChanges}>
          Actualizar cambios
        </Button>
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
        <small className={styles.small}>
          {courseTitleToRemove} (id:{courseIdToRemove})
        </small>
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
