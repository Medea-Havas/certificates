import {
  Box,
  Button,
  FormControl,
  Link,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from '@mui/material'
import {
  DataGrid,
  GridLinkOperator,
  GridToolbarQuickFilter,
  esES
} from '@mui/x-data-grid'
import Image from 'next/Image'
import { useState } from 'react'
import styles from './CoursesSectionHome.module.css'

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
    field: 'curso',
    headerName: 'Curso',
    width: 110,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'inicio',
    headerName: 'Inicio',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    Cell: props => {
      moment(props.value).format('dd/MM/yyyy')
    }
  },
  {
    field: 'fin',
    headerName: 'Fin',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    Cell: props => {
      moment(props.value).format('dd/MM/yyyy')
    }
  },
  {
    field: 'tutores',
    headerName: 'Tutores',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'ciudad',
    headerName: 'Ciudad',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'n_creditos',
    headerName: 'Nº créditos',
    type: 'number',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'id',
    headerName: 'Nº Expediente',
    width: 250,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'imagen',
    headerName: 'Imagen',
    sortable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    renderCell: params => {
      const onClick = e => {}
      return (
        <Image
          src={'/pexels.jpeg'}
          alt='Picture of the author'
          width={100}
          height={100}
          // blurDataURL="data:..." automatically provided
          // placeholder="blur" // Optional blur-up while loading
        />
      )
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
          <Link href='/curso'>Ver</Link>
          <Button onClick={onClick}>Editar</Button>
          <Button onClick={onClick}>Borrar</Button>
        </div>
      )
    }
  }
]

const rows = [
  {
    curso: 'Curso 01',
    inicio: '16/04/22',
    fin: '31/10/22',
    tutores: 'Dr. John Doe',
    ciudad: 'madrid',
    n_creditos: 13,
    id: '07-AFOC-03874.3/2020'
  },
  {
    curso: 'Curso 01',
    inicio: '17/04/22',
    fin: '30/10/22',
    tutores: 'Dr. John Doe',
    ciudad: 'madrid',
    n_creditos: 13,
    id: '08-AFOC-03874.3/2020'
  },
  {
    curso: 'Curso 01',
    inicio: '18/04/22',
    fin: '29/10/22',
    tutores: 'Dr. John Doe',
    ciudad: 'ciudad real',
    n_creditos: 13,
    id: '01-AFOC-03874.3/2020'
  },
  {
    curso: 'Curso 01',
    inicio: '19/04/22',
    fin: '30/10/22',
    tutores: 'Dr. John Doe',
    ciudad: 'madrid',
    n_creditos: 13,
    id: '03-AFOC-03874.3/2020'
  },
  {
    curso: 'Curso 01',
    inicio: '16/04/22',
    fin: '28/10/22',
    tutores: 'Dr. John Doe',
    ciudad: 'barcelona',
    n_creditos: 13,
    id: '06-AFOC-03874.3/2020'
  },
  {
    curso: 'Curso 01',
    inicio: '16/04/22',
    fin: '30/10/22',
    tutores: 'Dr. John Doe',
    ciudad: 'madrid',
    n_creditos: 13,
    id: '02-AFOC-03874.3/2020'
  },
  {
    curso: 'Curso 01',
    inicio: '16/04/22',
    fin: '30/10/22',
    tutores: 'Dr. John Doe',
    ciudad: 'madrid',
    n_creditos: 13,
    id: '04-AFOC-03874.3/2020'
  },
  {
    curso: 'Curso 01',
    inicio: '16/04/22',
    fin: '30/10/22',
    tutores: 'Dr. John Doe',
    ciudad: 'madrid',
    n_creditos: 13,
    id: '05-AFOC-03874.3/2020'
  }
]
export default function CoursesSectionHome() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [nombre, setNombre] = useState('')
  const handleChangeNombre = event => {
    setNombre(event.target.value)
  }

  const [apellidos, setApellidos] = useState('')
  const handleChangeApellidos = event => {
    setApellidos(event.target.value)
  }

  const [email, setEmail] = useState('')
  const handleChangeEmail = event => {
    setEmail(event.target.value)
  }

  const [id, setID] = useState('')
  const handleChangeID = event => {
    setID(event.target.value)
  }

  const [userType, setUserType] = useState('')
  const handleChangeUserType = event => {
    setUserType(event.target.value)
  }

  return (
    <>
      <div>
        <div className={styles.coursesTop}>
          <h1>Cursos</h1>
          <Button variant='contained' onClick={handleOpen}>
            + Nuevo Curso
          </Button>
        </div>
        <div className={styles.searcherContainer}>
          <div className={styles.table}>
            <DataGrid
              columns={columns}
              components={{ Toolbar: QuickSearchToolbar }}
              initialState={{
                filter: {
                  filterModel: {
                    items: [],
                    quickFilterLogicOperator: GridLinkOperator.Or
                  }
                }
              }}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              pageSize={4}
              rows={rows}
              rowHeight={149.8}
              rowsPerPageOptions={[4]}
            />
          </div>
        </div>
      </div>
      <Modal
        aria-describedby='modal-modal-description'
        aria-labelledby='modal-modal-title'
        onClose={handleClose}
        open={open}
      >
        <Box className={styles.modalBox}>
          <Typography
            id='modal-modal-title'
            component='h2'
            fontSize='28'
            variant='subtitle2'
          >
            Matricular en curso
          </Typography>
          <div className={styles.allTextFields}>
            <div>
              <div className={styles.textFieldModal}>
                <p>Nombre</p>
                <TextField
                  id='outlined-basic'
                  label=''
                  onChange={handleChangeNombre}
                  variant='outlined'
                  value={nombre}
                />
              </div>
              <div className={styles.textFieldModal}>
                <p>Apellidos</p>
                <TextField
                  id='outlined-basic'
                  label=''
                  onChange={handleChangeApellidos}
                  value={apellidos}
                  variant='outlined'
                />
              </div>
              <div className={styles.textFieldModal}>
                <p>Email</p>
                <TextField
                  id='outlined-basic'
                  label=''
                  onChange={handleChangeEmail}
                  value={email}
                  variant='outlined'
                />
              </div>
            </div>
            <div>
              <div className={styles.textFieldModal}>
                <p>NIF</p>
                <TextField
                  id='outlined-basic'
                  label=''
                  onChange={handleChangeID}
                  type='id'
                  value={id}
                  variant='outlined'
                />
              </div>
              <div className={styles.textFieldModal}>
                <p>Tipo de Usuario</p>
                <FormControl fullWidth>
                  <Select
                    id='demo-simple-select'
                    label='UserType'
                    labelId='demo-simple-select-label'
                    onChange={handleChangeUserType}
                    value={userType}
                  >
                    <MenuItem value={10}>Tipo usuario 1</MenuItem>
                    <MenuItem value={20}>Tipo usuario 2</MenuItem>
                    <MenuItem value={30}>Tipo usuario 3</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className={styles.modalButtonsCont}>
            <div className={styles.modalButtons}>
              <Button variant='contained'>Cancelar</Button>
              <Button variant='contained'>Aceptar</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}
