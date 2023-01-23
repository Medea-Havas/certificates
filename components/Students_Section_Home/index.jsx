import React, { useState } from 'react'
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
  esES
} from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import AddIcon from '@mui/icons-material/Add'
import { FormControl } from '@mui/material'
import styles from './StudentsSectionHome.module.css'

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
  )
}

const columns = [
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 110,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'apellidos',
    headerName: 'Apellidos',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'id',
    headerName: 'NIF',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    data: 'idTable'
  },
  {
    field: 'tipo_usuario',
    headerName: 'Tipo de Usuario',
    width: 250,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'buttonAtions',
    headerName: '',
    sortable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    renderCell: params => {
      const onClick = e => {}
      return (
        <div>
          <Button onClick={onClick} className={styles.buttonStyle}>
            Ver
          </Button>
          <Button onClick={onClick} className={styles.buttonStyle}>
            Editar
          </Button>
          <Button onClick={onClick} className={styles.buttonStyle}>
            Borrar
          </Button>
        </div>
      )
    }
  }
]

const rows = [
  {
    nombre: 'Juan',
    apellidos: 'Galileo Doe',
    email: 'juanga@gmail.com',
    id: '27856438J',
    tipo_usuario: 'Alumno'
  },
  {
    nombre: 'Francisco',
    apellidos: 'Martinez Martin',
    email: 'franmarma@gmail.com',
    id: '27856439A',
    tipo_usuario: 'Alumno'
  },
  {
    nombre: 'Pablo',
    apellidos: 'Perez Gil',
    email: 'pablopegi@gmail.com',
    id: '27856438P',
    tipo_usuario: 'Alumno'
  },
  {
    nombre: 'Bruno',
    apellidos: 'Ortega Smith',
    email: 'brunosmi@gmail.com',
    id: '27856438B',
    tipo_usuario: 'Alumno'
  },
  {
    nombre: 'Alejandro',
    apellidos: 'Galileo Doe',
    email: 'alegado@gmail.com',
    id: '37856438J',
    tipo_usuario: 'Alumno'
  },
  {
    nombre: 'Juan',
    apellidos: 'Galileo Doe',
    email: 'juanga@gmail.com',
    id: '27856438C',
    tipo_usuario: 'Alumno'
  },
  {
    nombre: 'Juan',
    apellidos: 'Galileo Doe',
    email: 'juanga@gmail.com',
    id: '27856438D',
    tipo_usuario: 'Alumno'
  },
  {
    nombre: 'Juan',
    apellidos: 'Galileo Doe',
    email: 'juanga@gmail.com',
    id: '27856438G',
    tipo_usuario: 'Alumno'
  },
  {
    nombre: 'Juan',
    apellidos: 'Galileo Doe',
    email: 'juanga@gmail.com',
    id: '27856438E',
    tipo_usuario: 'Alumno'
  },
  {
    nombre: 'Juan',
    apellidos: 'Galileo Doe',
    email: 'juanga@gmail.com',
    id: '27856437J',
    tipo_usuario: 'Alumno'
  },
  {
    nombre: 'Juan',
    apellidos: 'Galileo Doe',
    email: 'juanga@gmail.com',
    id: '27856433A',
    tipo_usuario: 'Alumno'
  }
]

export default function StudentsSectionHome() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [course, setCourse] = useState('')
  const handleChangeCourse = event => {
    setCourse(event.target.value)
  }

  const [tutor, setTutor] = useState('')
  const handleChangeTutor = event => {
    setTutor(event.target.value)
  }

  const [ciudad, setCiudad] = useState(' ')
  const handleChangeCiudad = event => {
    setCiudad(event.target.value)
  }

  const [fFin, setFFin] = useState(' ')
  const handleChangeFFin = event => {
    setFFin(event.target.value)
  }

  const [fInicio, setFInicio] = useState(' ')
  const handleChangeFInicio = event => {
    setFInicio(event.target.value)
  }

  const [nCreditos, setNCred] = useState(' ')
  const handleChangeNCred = event => {
    setNCred(event.target.value)
  }

  const [nExpediente, setNExp] = useState(' ')
  const handleChangeNExp = event => {
    setNExp(event.target.value)
  }

  return (
    <>
      <div>
        <div className={styles.studentsTop}>
          <h1>Alumnos</h1>
          <Button variant='contained' onClick={handleOpen}>
            <AddIcon fontSize='13' />
            &emsp;Nuevo Alumno
          </Button>
        </div>
        <div className={styles.table}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={9}
            rowsPerPageOptions={[9]}
            rowHeight={71}
            initialState={{
              filter: {
                filterModel: {
                  items: [],
                  quickFilterLogicOperator: GridLinkOperator.Or
                }
              }
            }}
            components={{ Toolbar: QuickSearchToolbar }}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className={styles.modalBox}>
          <Typography
            id='modal-modal-title'
            variant='subtitle2'
            component='h2'
            fontSize='28'
          >
            Matricular en curso
          </Typography>
          <div className={styles.allTextFields}>
            <div>
              <div className={styles.textFieldModal}>
                <p>Seleccione un curso</p>
                <FormControl fullWidth>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={course}
                    label='Course'
                    onChange={handleChangeCourse}
                  >
                    <MenuItem value={10}>Course 01</MenuItem>
                    <MenuItem value={20}>Course 02</MenuItem>
                    <MenuItem value={30}>Course 03</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={styles.textFieldModal}>
                <p>Tutor</p>
                <FormControl fullWidth>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={tutor}
                    label='Tutor'
                    onChange={handleChangeTutor}
                  >
                    <MenuItem value={10}>Tutor 01</MenuItem>
                    <MenuItem value={20}>Tutor 02</MenuItem>
                    <MenuItem value={30}>Tutor 03</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={styles.textFieldModal}>
                <p>Ciudad</p>
                <TextField
                  id='outlined-basic'
                  label=''
                  variant='outlined'
                  value={ciudad}
                  onChange={handleChangeCiudad}
                />
              </div>
              <div className={styles.textFieldModal}>
                <Button variant='contained'> Insertar imagen</Button>
              </div>
            </div>
            <div>
              <div className={styles.textFieldModal}>
                <p>Fecha de inicio</p>
                <TextField
                  id='outlined-basic'
                  label=''
                  variant='outlined'
                  type='date'
                  value={fInicio}
                  onChange={handleChangeFInicio}
                />
              </div>
              <div className={styles.textFieldModal}>
                <p>Fecha de fin</p>
                <TextField
                  id='outlined-basic'
                  label=''
                  variant='outlined'
                  type='date'
                  value={fFin}
                  onChange={handleChangeFFin}
                />
              </div>
              <div className={styles.textFieldModal}>
                <p>Nº de créditos</p>
                <TextField
                  id='outlined-basic'
                  label=''
                  variant='outlined'
                  type='number'
                  value={nCreditos}
                  onChange={handleChangeNCred}
                />
              </div>
              <div className={styles.textFieldModal}>
                <p>Nº de expediente</p>
                <TextField
                  id='outlined-basic'
                  label=''
                  variant='outlined'
                  value={nExpediente}
                  onChange={handleChangeNExp}
                />
              </div>
            </div>
          </div>
          <div className={styles.modalButtonsCont}>
            <Button variant='contained' className={styles.modalButton}>
              Cancelar
            </Button>
            <Button variant='contained' className={styles.modalButton}>
              Aceptar
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}
