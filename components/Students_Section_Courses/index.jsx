import React, { useEffect, useState } from 'react';
import { DataGrid, GridLinkOperator, esES } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Modal from './modal';
import styles from './StudentsSectionCourses.module.css';
import { useRouter } from 'next/router';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import QuickSearchToolbar from '../Utils/searchbar';

export default function StudentsSectionCourses() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const { query, isReady } = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      renderCell: params => {
        const click = e => {
          console.log(params.row.id);
        };
        return (
          <div className={styles.buttonActions}>
            <Link
              href={{
                pathname: '../curso/[id]',
                query: {
                  id: params.row.id
                }
              }}
            >
              <Button variant='outlined'>Ver curso</Button>
            </Link>
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8080/coursesfromuser/' + query.id)
      .then(coursesList => coursesList.json())
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
}
