import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Link,
  MenuItem
} from '@mui/material';
import {
  DataGrid,
  GridLinkOperator,
  esES,
  GridToolbar
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import styles from './CoursesSectionHome.module.css';
import CoursesModal from './modal';
import moment from 'moment';
import localization from 'moment/locale/es';
import QuickSearchToolbar from '../Utils/searchbar';
import Image from 'next/image';
import TemplateModal from './templatemodal';
import axios from 'axios';

export default function CoursesSectionHome() {
  const [arrayTemplates, setArrayTemplates] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseIdToRemove, setCourseIdToRemove] = useState(0);
  const [courseTitleToRemove, setCourseTitleToRemove] = useState('');
  const [coursesToUpdate, setCoursesToUpdate] = useState([]);
  const [error, setError] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ncCourse, setNCCourse] = useState({});
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [resetCourses, setResetCourses] = useState(false);
  const [template, setTemplate] = useState({});
  const [templates, setTemplates] = useState([]);
  const [templatesLoaded, setTemplatesLoaded] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [updateId, setUpdateId] = useState(-1);
  const [warning, setWarning] = useState(false);
  const API_HOST = process.env.API_HOST;
  moment.updateLocale('es', localization);

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
        return (
          <Image
            alt='Certificate thumbnail'
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
              className='warn'
              data-id={`${params.row.id}`}
              data-title={`${params.row.title}`}
              onClick={removeCourse}
              variant='outlined'
            >
              Borrar
            </Button>
          </div>
        );
      }
    }
  ];

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
  const displayListItems = () => {
    let tmp = JSON.parse(sessionStorage.getItem('templates'));
    if (!templates) {
      setTemplates(tmp);
    }
    let lis;
    if (tmp) {
      lis = tmp.map(t => (
        <li key={t.id} className={styles.templateItem}>
          <p>
            {t.id} - {t.title}
          </p>
          <div className={styles.buttons}>
            <Button
              onClick={() => {
                updateTemplate(t.id, t.title, t.coords);
              }}
            >
              Editar
            </Button>
            <Button
              onClick={() => {
                removeTemplate(t.id);
              }}
              className={styles.warn}
            >
              Borrar
            </Button>
          </div>
        </li>
      ));
    }
    setListItems(lis);
    arrayTemplateFunction();
    setTemplatesLoaded(true);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
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
  const hideError = () => setError(false);
  const hideWarning = () => setWarning(false);
  const hideWarningAndReset = () => {
    sessionStorage.removeItem('courses');
    setWarning(false);
    setCoursesToUpdate([]);
    setUpdateData(!updateData);
  };
  const removeCourse = e => {
    setCourseIdToRemove(e.target.dataset.id);
    setCourseTitleToRemove(e.target.dataset.title);
    setError(true);
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
  const updateTemplate = (id, title, coords) => {
    setTemplate({ id: id, title: title, coords: coords });
    setUpdateId(id);
  };
  const removeTemplate = index => {
    axios
      .delete(`${API_HOST}/templates/${index}`)
      .then(response => {
        if (response.status === 200) {
          sessionStorage.removeItem('templates');
          setArrayTemplates([]);
          setTemplate({});
          setUpdateData(!updateData);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    // Fetch courses
    const fetchCourses = async () => {
      const data = await fetch(`${API_HOST}/courses`);
      const json = await data.json();
      setCourses(json);
      sessionStorage.setItem('courses', JSON.stringify(json));
      setLoading(false);
    };
    if (!sessionStorage.getItem('courses')) {
      fetchCourses().catch(console.error);
    } else {
      let tempCourses = sessionStorage.getItem('courses');
      setCourses(JSON.parse(tempCourses));
      setLoading(false);
    }
    // Fetch templates
    const fetchTemplates = async () => {
      const data = await fetch(`${API_HOST}/templates`);
      const json = await data.json();
      setTemplates(json);
      sessionStorage.setItem('templates', JSON.stringify(json));
      displayListItems();
    };
    if (!sessionStorage.getItem('templates')) {
      fetchTemplates().catch(console.error);
    } else {
      displayListItems();
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
        {loading ? (
          <CircularProgress />
        ) : (
          <div className={styles.table}>
            <DataGrid
              autoPageSize
              columns={columns}
              components={{ Toolbar: QuickSearchToolbar }}
              disableSelectionOnClick
              editMode='row'
              experimentalFeatures={{ newEditingApi: true }}
              getRowId={row => row.id}
              initialState={{
                filter: {
                  filterModel: {
                    items: [],
                    quickFilterLogicOperator: GridLinkOperator.Or
                  }
                }
              }}
              loading={loading}
              localeText={{
                localeText: esES.components.MuiDataGrid.defaultProps.localeText,
                noRowsLabel: 'Todavía no hay cursos disponibles. ¡Crea uno!'
              }}
              onProcessRowUpdateError={error => console.warn(error)}
              processRowUpdate={updateCourse}
              rowHeight={80}
              rows={courses}
              slots={{ toolbar: GridToolbar }}
              sx={{ overflowX: 'scroll' }}
            />
          </div>
        )}
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        <CoursesModal
          handleClose={handleClose}
          ncCourse={ncCourse}
          open={open}
          resetCourses={resetCourses}
          setCourses={setCourses}
          setNCCourse={setNCCourse}
          setUpdateData={setUpdateData}
          templates={arrayTemplates}
          updateData={updateData}
        />
      )}
      {templatesLoaded ? (
        <TemplateModal
          handleClose={handleClose2}
          listItems={listItems}
          open={open2}
          updateData={updateData}
          setArrayTemplates={setArrayTemplates}
          setUpdateData={setUpdateData}
          setTemplate={setTemplate}
          setUpdateId={setUpdateId}
          template={template}
          templatesLoaded={templatesLoaded}
          updateId={updateId}
        />
      ) : (
        ''
      )}
      <Alert
        className={`${warning ? 'active' : ''}`}
        onClose={hideWarning}
        severity='warning'
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
        className={`${error ? 'active' : ''}`}
        onClose={hideError}
        severity='error'
      >
        <AlertTitle>¿Desea eliminar este curso?</AlertTitle>
        <small className={styles.small}>
          {courseTitleToRemove} (id:{courseIdToRemove})
        </small>
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
    </>
  );
}
