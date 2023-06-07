import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridLinkOperator,
  GridToolbarQuickFilter,
  esES
} from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import Modal from './modal';
import { columns, rows } from './data';
import styles from './StudentsSectionCourses.module.css';
import { useRouter } from 'next/router';
import moment from 'moment';

export default function StudentsSectionCourses() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { query, isReady } = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8080/coursesfromuser/' + query.id)
      .then(coursesList => coursesList.json())
      .then(courses =>
        courses.map(course => {
          return {
            ...course,
            id: course.id,
            name: course.title,
            initDate: moment(course.date_init).format('L LT'),
            endDate: moment(course.date_end).format('L LT'),
            fileNumber: course.file_number
          };
        })
      )
      .then(adaptedCourses => {
        setCourses(adaptedCourses);
        setLoading(false);
      });
  }, []);

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
          loading={loading}
          components={{ Toolbar: QuickSearchToolbar }}
          sx={{ overflowX: 'scroll' }}
          disableSelectionOnClick
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
      <Modal
        handleClose={handleClose}
        open={open}
        userId={query.id}
        ready={isReady}
      />
    </div>
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
