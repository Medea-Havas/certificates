import React, { useState } from 'react'
import Head from 'next/head'
import { DataGrid, esES } from '@mui/x-data-grid'
import { Button, Link, TextField } from '@mui/material'
import styles from './StudentsSectionCourses.module.css'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Breadcrumbs from '@mui/material/Breadcrumbs'

const columns = [
  {
    field: 'course',
    headerName: 'Nombre del curso',
    width: 110,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'certificate_number',
    headerName: 'Número de certificado',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'end',
    headerName: 'F. fin de examen',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    Cell: props => {
      moment(new Date(props.value)).format('dd/MM/yyyy')
    }
  },
  {
    field: 'city',
    headerName: 'Ciudad',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'course_date',
    headerName: 'F. celebración',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    Cell: props => {
      moment(props.value).format('dd/MM/yyyy')
    }
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
        <div className={styles.buttonAtions}>
          <Button onClick={onClick}>Ver</Button>
          <Button onClick={onClick}>Editar</Button>
          <Button onClick={onClick}>Borrar</Button>
        </div>
      )
    }
  }
]
const rows = [
  {
    id: 1,
    course: 'Curso 01',
    certificate_number: 'RcQnAvAFTPYF2iFzqaWKMDQbnE5C7c',
    end: '31/10/21',
    city: 'Huelva',
    course_date: '05/05/22'
  },
  {
    id: 2,
    course: 'Curso 02',
    certificate_number: 'wazTmSBDdZLYc5VMqw8xpyjd92kinG',
    end: '11/04/21',
    city: 'Salamanca',
    course_date: '05/05/22'
  },
  {
    id: 3,
    course: 'Curso 03',
    certificate_number: 'x3ynBery29CLUEpmxR3mcEZeYDRh8w',
    end: '12/08/21',
    city: 'A Coruña',
    course_date: '05/05/22'
  },
  {
    id: 4,
    course: 'Curso 04',
    certificate_number: 'Dy9JP39gCvevLxyWRKG4i4hYGuRUXG',
    end: '06/02/22',
    city: 'Álava',
    course_date: '05/05/22'
  },
  {
    id: 5,
    course: 'Curso 05',
    certificate_number: 'SFpeEVL5e9diDFEVEL7VNhfSEwjKHc',
    end: '02/11/22',
    city: 'Madrid',
    course_date: '05/05/22'
  },
  {
    id: 6,
    course: 'Curso 06',
    certificate_number: '4puzEtn3MCxgn44aVcmeWj6JdDzbaK',
    end: '22/05/22',
    city: 'Pamplona',
    course_date: '05/05/22'
  },
  {
    id: 7,
    course: 'Curso 07',
    certificate_number: 'Fy5xwNLmpt2paKqrZdVdt6qV6VJ6Pg',
    end: '27/12/22',
    city: 'Sevilla',
    course_date: '05/05/22'
  },
  {
    id: 8,
    course: 'Curso 08',
    certificate_number: 'yAdxF4ixjnkmE4WugKtfKZJAWb3x24',
    end: '16/03/22',
    city: 'Oviedo',
    course_date: '05/05/22'
  },
  {
    id: 9,
    course: 'Curso 09',
    certificate_number: 'bxux9feSBjS5kCABq7w7k5MHdRzdhF',
    end: '09/04/22',
    city: 'Lugo',
    course_date: '05/05/22'
  }
]
/*function HandleOpen() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
}*/

export default function StudentsSectionCourses() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [course, setCourse] = React.useState('')
  const handleChange = event => {
    setCourse(event.target.value)
  }

  const [ciudad, setCiudad] = React.useState(' ')
  const handleChangeCiudad = event => {
    setCiudad(event.target.value)
  }

  const [fFin, setFFin] = React.useState(null)
  const handleChangeFFin = event => {
    setFFin(event.target.value)
  }

  const [fCel, setFCel] = React.useState(null)
  const handleChangeFCel = event => {
    setFCel(event.target.value)
  }

  return (
    <div>
      <div className={styles.alumnoRoute}>
        <Breadcrumbs aria-label='breadcrumb' color='text.primary'>
          <Link underline='hover' color='text.primary' href='/'>
            Alumnos
          </Link>
          <Link underline='hover' color='text.primary' href='/'>
            John Doe Márquez
          </Link>
          <Typography color='text.primary'>Cursos matriculado</Typography>
        </Breadcrumbs>
      </div>
      <div className={styles.alumnoInfoTop}>
        <h1>John Doe Márquez</h1>
        <div>
          <Button variant='contained' className={styles.buttonTop}>
            Información
          </Button>
          <Button variant='contained' className={styles.buttonTop}>
            Cursos matriculado
          </Button>
        </div>
      </div>
      <div className={styles.alumnoInfoContainer}>
        <h1>Cursos Matriculado</h1>
        <Button variant='contained' onClick={handleOpen}>
          Cursos matriculado
        </Button>
      </div>
      <div className={styles.table}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          rowHeight={52}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
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
                    onChange={handleChange}
                    styles={styles.controlLabel}
                  >
                    <MenuItem value={10}>Course 01</MenuItem>
                    <MenuItem value={20}>Course 02</MenuItem>
                    <MenuItem value={30}>Course 03</MenuItem>
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
            </div>
            <div>
              <div className={styles.textFieldModal}>
                <p>Fecha fin de examen</p>
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
                <p>Fecha de celebración</p>
                <TextField
                  id='outlined-basic'
                  label=''
                  variant='outlined'
                  type='date'
                  value={fCel}
                  onChange={handleChangeFCel}
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
    </div>
  )
}
