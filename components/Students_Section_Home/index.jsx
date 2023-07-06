import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridLinkOperator,
  esES,
  GridToolbar
} from '@mui/x-data-grid';
import { Button, Alert, AlertTitle, Link } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import localization from 'moment/locale/es';
import StudentsModal from './modal';
import styles from './StudentsSectionHome.module.css';
import QuickSearchToolbar from '../Utils/searchbar';
import axios from 'axios';

export default function StudentsSectionHome() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [userToRemove, setUserToRemove] = useState({});
  const [usersToUpdate, setUsersToUpdate] = useState([]);
  const [resetUsers, setResetUsers] = useState(false);
  const [ncStudent, setNCStudent] = useState('');
  const API_HOST = process.env.API_HOST;
  moment.updateLocale('es', localization);

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
              data-id={params.row.id}
              data-name={`${params.row.name} ${params.row.last_name}`}
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
    setUserToRemove({
      id: e.target.dataset.id,
      name: e.target.dataset.name
    });
    setError(true);
  };
  const hideError = () => setError(false);
  const hideWarning = () => setWarning(false);
  const hideWarningAndReset = () => {
    setWarning(false);
    setResetUsers(!resetUsers);
    setUsersToUpdate([]);
  };
  const updateStudentField = (e, field) => {
    setNCStudent(prevState => ({
      ...prevState,
      [field]: e.target.value
    }));
  };
  const updateUser = newRow => {
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
  const handleAddStudent = event => {
    const addStudent = async () => {
      await fetch(`${API_HOST}/users`, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ncStudent)
      })
        .then(res => {
          sessionStorage.removeItem('users');
          setResetUsers(!resetUsers);
          handleClose();
        })
        .catch(err => {
          console.log(err);
        });
    };
    addStudent();
  };
  const handleUpdateUser = () => {
    usersToUpdate.forEach((value, index) => {
      axios
        .patch(`${API_HOST}/users/${value.id}`, value)
        .then(response => {
          if (response.status === 200) {
            console.log('User with id ' + value.id + ' was updated');
          }
          sessionStorage.removeItem('users');
          setResetUsers(!resetUsers);
          setWarning(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };
  const handleRemoveUser = () => {
    axios
      .delete(`${API_HOST}/users/${userToRemove.id}`)
      .then(response => {
        if (response.status === 200) {
          sessionStorage.removeItem('users');
          setResetUsers(!resetUsers);
          setError(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!sessionStorage.getItem('users')) {
      fetch(`${process.env.API_HOST}/users`)
        .then(usersList => usersList.json())
        .then(users => {
          setUsers(users);
          sessionStorage.setItem('users', JSON.stringify(users));
          setLoading(false);
        });
    } else {
      let tempUsers = sessionStorage.getItem('users');
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
      <StudentsModal
        open={open}
        handleClose={handleClose}
        ncStudent={ncStudent}
        handleAddStudent={handleAddStudent}
        updateStudentField={updateStudentField}
      />
      <Alert
        onClose={hideWarning}
        severity='warning'
        className={`${warning ? 'active' : ''}`}
      >
        <AlertTitle>Cambios detectados</AlertTitle>
        <ul className={styles.changesList}>
          {usersToUpdate.map(user => (
            <li key={user.id}>
              <p>
                {user.id} - {user.name} {user.last_name}
              </p>
              <p>
                {user.email} ({user.nif})
              </p>
            </li>
          ))}
        </ul>
        <Button variant='outlined' onClick={handleUpdateUser}>
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
        <AlertTitle>¿Desea eliminar este alumno?</AlertTitle>
        <small className={styles.small}>{userToRemove.name}</small>
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
