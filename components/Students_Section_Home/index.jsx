import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
  esES
} from '@mui/x-data-grid';
import { columns } from './data';
import { Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import localization from 'moment/locale/es';
import { useRouter } from 'next/router';
import StudentsModal from './modal';
import styles from './StudentsSectionHome.module.css';

/*Filtrar por busqueda en la tabla*/
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

export default function StudentsSectionHome() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    moment.updateLocale('es', localization);
    if (!localStorage.getItem('users')) {
      fetch('http://localhost:8080/users')
        .then(usersList => usersList.json())
        .then(users =>
          users.map(user => {
            return {
              ...user,
              lastName: user.last_name
            };
          })
        )
        .then(adaptedUsers => {
          setUsers(adaptedUsers);
          localStorage.setItem('users', JSON.stringify(adaptedUsers));
          setLoading(false);
        });
    } else {
      let tempUsers = localStorage.getItem('users');
      let finalUsers = JSON.parse(tempUsers).map(usr => {
        return {
          ...usr,
          lastName: usr.last_name
        };
      });
      setUsers(finalUsers);
      setLoading(false);
    }
  }, []);

  const processRowUpdate = newRow => {
    // const updatedRow = { ...newRow, isNew: false };
    // console.log(newRow);
    console.log(updatedRow);
    // return updatedRow;
    return newRow;
  };

  return (
    <>
      <div>
        <div className={styles.studentsTop}>
          <h1>Alumnos</h1>
          <Button variant='outlined' onClick={handleOpen}>
            <AddIcon fontSize='13' />
            &emsp;Nuevo Alumno
          </Button>
        </div>
        <div className={styles.table}>
          <DataGrid
            columns={columns}
            rows={users}
            rowHeight={120}
            editMode='row'
            processRowUpdate={processRowUpdate}
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
      <StudentsModal open={open} handleClose={handleClose} />
    </>
  );
}
