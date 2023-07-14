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
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ncStudent, setNCStudent] = useState('');
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [resetUsers, setResetUsers] = useState(false);
  const [userToRemove, setUserToRemove] = useState({});
  const [usersToUpdate, setUsersToUpdate] = useState([]);
  const [warning, setWarning] = useState(false);

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

  const handleAddStudent = event => {
    const addStudent = async () => {
      await axios
        .post(`${API_HOST}/users`, JSON.stringify(ncStudent))
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
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
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
  const hideError = () => setError(false);
  const hideWarning = () => setWarning(false);
  const hideWarningAndReset = () => {
    setWarning(false);
    setResetUsers(!resetUsers);
    setUsersToUpdate([]);
  };
  const showError = e => {
    setUserToRemove({
      id: e.target.dataset.id,
      name: e.target.dataset.name
    });
    setError(true);
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
  const updateStudentField = (e, field) => {
    setNCStudent(prevState => ({
      ...prevState,
      [field]: e.target.value
    }));
  };

  useEffect(() => {
    if (!sessionStorage.getItem('users')) {
      axios
        .get(`${process.env.API_HOST}/users`)
        .then(usersList => usersList.data)
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
          <Button onClick={handleOpen} variant='outlined'>
            <AddIcon fontSize='13' />
            &emsp;Nuevo Alumno
          </Button>
        </div>
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
              noRowsLabel: 'Todavía no hay alumnos. ¡Crea uno!'
            }}
            onProcessRowUpdateError={error => console.warn(error)}
            processRowUpdate={updateUser}
            rows={users}
            rowHeight={80}
            slots={{ toolbar: GridToolbar }}
            sx={{ overflowX: 'scroll' }}
          />
        </div>
      </div>
      <StudentsModal
        handleAddStudent={handleAddStudent}
        handleClose={handleClose}
        ncStudent={ncStudent}
        open={open}
        updateStudentField={updateStudentField}
      />
      <Alert
        className={`${warning ? 'active' : ''}`}
        onClose={hideWarning}
        severity='warning'
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
        <Button onClick={handleUpdateUser} variant='outlined'>
          Actualizar cambios
        </Button>
        <Button onClick={hideWarningAndReset} variant='outlined'>
          Deshechar cambios
        </Button>
        <Button onClick={hideWarning} variant='outlined'>
          Cancelar
        </Button>
      </Alert>
      <Alert
        className={`${error ? 'active' : ''}`}
        onClose={hideError}
        severity='error'
      >
        <AlertTitle>¿Desea eliminar este alumno?</AlertTitle>
        <small className={styles.small}>{userToRemove.name}</small>
        <Button
          className={styles.updateButton}
          onClick={handleRemoveUser}
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
