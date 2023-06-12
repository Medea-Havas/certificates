import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridLinkOperator,
  esES,
  GridToolbar
} from '@mui/x-data-grid';
import { Button, Box, Alert, AlertTitle, Link } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import localization from 'moment/locale/es';
import StudentsModal from './modal';
import styles from './StudentsSectionHome.module.css';
import QuickSearchToolbar from '../Utils/searchbar';

export default function StudentsSectionHome() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [userToRemove, setUserToRemove] = useState(null);
  const [usersToUpdate, setUsersToUpdate] = useState([]);
  const [resetUsers, setResetUsers] = useState(false);
  const columns = [
    {
      headerName: 'Nombre',
      field: 'name',
      editable: true,
      minWidth: 110,
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      headerName: 'Apellidos',
      field: 'last_name',
      editable: true,
      minWidth: 100,
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      headerName: 'Email',
      field: 'email',
      editable: true,
      minWidth: 100,
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      headerName: 'NIF',
      field: 'nif',
      editable: true,
      minWidth: 100,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      data: 'idTable'
    },
    {
      headerName: '',
      field: 'buttonActions',
      editable: false,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      width: 240,
      renderCell: params => {
        return (
          <div className={styles.buttonActions}>
            <Link href={`alumno/${params.row.id}`}>
              <Button variant='outlined'>Ver</Button>
            </Link>
            <Button
              data-id={`${params.row.name} ${params.row.last_name}`}
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
    setUserToRemove(e.target.dataset.id);
    setError(true);
  };
  const hideError = () => setError(false);
  const showWarning = e => {
    setUserToRemove(e.target.dataset.id);
    setWarning(true);
  };
  const hideWarning = () => setWarning(false);
  const hideWarningAndReset = () => {
    setWarning(false);
    setResetUsers(!resetUsers);
    setUsersToUpdate([]);
  };
  const handleRemoveUser = () => {
    //TODO Remove user
    console.log('Remove user');
  };
  const updateUser = newRow => {
    //TODO Update user
    const updatedRow = { ...newRow, isNew: false };
    var index = -1;
    for (var i = 0; i < usersToUpdate.length; i++) {
      if (usersToUpdate[i].id == newRow.id) {
        index = i;
      }
    }
    if (index == -1) {
      setUsersToUpdate([...usersToUpdate, newRow]);
    } else {
      const newArray = [...usersToUpdate];
      newArray.splice(index, 1, newRow);
      setUsersToUpdate(newArray);
    }
    setWarning(true);
    return updatedRow;
  };
  const removeAccents = str => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  useEffect(() => {
    moment.updateLocale('es', localization);
    if (!localStorage.getItem('users')) {
      fetch('http://localhost:8080/users')
        .then(usersList => usersList.json())
        .then(users => {
          setUsers(users);
          localStorage.setItem('users', JSON.stringify(users));
          setLoading(false);
        });
    } else {
      let tempUsers = localStorage.getItem('users');
      let finalUsers = JSON.parse(tempUsers).map(usr => {
        return {
          ...usr
        };
      });
      setUsers(finalUsers);
      setLoading(false);
    }
  }, [resetUsers]);

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
            getRowId={row => row.id}
            columns={columns}
            rows={users}
            rowHeight={80}
            editMode='row'
            processRowUpdate={updateUser}
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
            autoPageSize
            loading={loading}
            components={{ Toolbar: QuickSearchToolbar }}
            sx={{ overflowX: 'scroll' }}
            disableSelectionOnClick
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            onProcessRowUpdateError={error => console.warn(error)}
          />
        </div>
      </div>
      <StudentsModal open={open} handleClose={handleClose} />
      <Alert
        onClose={hideWarning}
        severity='warning'
        className={`${warning ? 'active' : ''}`}
      >
        <AlertTitle>Cambios detectados</AlertTitle>
        <ul className={styles.changesList}>
          {usersToUpdate.map(user => (
            <li key={Math.random()}>
              <p>
                {user.id} - {user.name} {user.last_name}
              </p>
              <p>
                {user.email} ({user.nif})
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
        <AlertTitle>¿Desea eliminar este alumno?</AlertTitle>
        <small className={styles.small}>{userToRemove}</small>
        <Button
          variant='outlined'
          className={styles.updateButton}
          onClick={handleRemoveUser}
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
