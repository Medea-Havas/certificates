import { Box, Button } from '@mui/material';
import {
  DataGrid,
  GridLinkOperator,
  GridToolbarQuickFilter,
  esES
} from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './CoursesSectionHome.module.css';
import { columns } from './data';
import CoursesModal from './modal';
import moment from 'moment';
import localization from 'moment/locale/es';

export default function CoursesSectionHome() {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    moment.updateLocale('es', localization);
    if (!localStorage.getItem('courses')) {
      fetch('https://certificates-api.hhytest.com/public/index.php/courses')
        .then(coursesList => coursesList.json())
        .then(courses =>
          courses.map(course => {
            return {
              ...course,
              name: course.title,
              initDate: moment(course.date_init).format('L LT'),
              endDate: moment(course.date_end).format('L LT'),
              fileNumber: course.file_number
            };
          })
        )
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
  }, []);

  return (
    <>
      <div>
        <div className='sectionHeader'>
          <h1>Cursos</h1>
          <Button variant='outlined' onClick={handleOpen}>
            + Nuevo Curso
          </Button>
        </div>
        <div className={styles.searcherContainer}>
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
              loading={loading}
              components={{ Toolbar: QuickSearchToolbar }}
              sx={{ overflowX: 'scroll' }}
              disableSelectionOnClick
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            />
          </div>
        </div>
      </div>
      <CoursesModal open={open} handleClose={handleClose} />
    </>
  );

  function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 2
        }}
      >
        <GridToolbarQuickFilter
          className={styles.gridTool}
          placeholder='Buscar...'
          quickFilterParser={searchInput =>
            searchInput
              .split(',')
              .map(value => value.trim())
              .filter(value => value !== '')
          }
        />
      </Box>
    );
  }
}
