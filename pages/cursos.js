import React , {useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import next from 'next';
import Head from 'next/head';
import Image from 'next/Image';
import {moment} from 'moment'
import styles from '../styles/Courses.module.css';
import { Margin } from '@mui/icons-material';
import CursosFichaInfo from '../components/Cursos_Ficha_Info/index';
import CursosFichaDiploma from '../components/Cursos_Ficha_Diploma/index';
import CursosFichaAlumno from '../components/Cursos_Ficha_Alumno/index';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';


const columns = [
  { field: 'curso', headerName: 'Curso', width: 110, headerAlign: 'center', align: 'center' },
  {
    field: 'inicio',
    headerName: 'Inicio',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    Cell: props => {moment(props.value).format('dd/MM/yyyy')}
  },
  {
    field: 'fin',
    headerName: 'Fin',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
      Cell: props => {moment(props.value).format('dd/MM/yyyy')}
  },
  { field: 'tutores', headerName: 'Tutores',flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'ciudad', headerName: 'Ciudad',flex: 1, headerAlign: 'center', align: 'center' },
  {
    field: 'n_creditos',
    headerName: 'Nº créditos',
    type: 'number',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  { field: 'id', headerName: 'Nº Expediente', width: 250, headerAlign: 'center', align: 'center' },
  {
    field: "imagen",
    headerName: "Imagen",
    sortable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      const onClick = (e) => {
      };
      return <Image
      src={'/pexels.jpeg'}
      alt="Picture of the author"
      width={100}
      height={100}
      // blurDataURL="data:..." automatically provided
      // placeholder="blur" // Optional blur-up while loading
    />;
    }
  },
  {
    field: "buttonAtions",
    headerName: "",
    sortable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      const onClick = (e) => {
      };
      return <div className={styles.buttonAtions}><Button onClick={onClick}>Ver</Button><Button onClick={onClick}>Editar</Button><Button onClick={onClick}>Borrar</Button></div>;
    }
  }

];

const rows = [
  {curso: "Curso 01", inicio: "16/04/22", fin: "31/10/22", tutores: "Dr. John Doe", ciudad:"madrid", n_creditos: 13, id: "07-AFOC-03874.3/2020"},
  {curso: "Curso 01", inicio: "17/04/22", fin: "30/10/22", tutores: "Dr. John Doe", ciudad:"madrid", n_creditos: 13, id: "08-AFOC-03874.3/2020"},
  {curso: "Curso 01", inicio: "18/04/22", fin: "29/10/22", tutores: "Dr. John Doe", ciudad:"ciudad real", n_creditos: 13, id: "01-AFOC-03874.3/2020"},
  {curso: "Curso 01", inicio: "19/04/22", fin: "30/10/22", tutores: "Dr. John Doe", ciudad:"madrid", n_creditos: 13, id: "03-AFOC-03874.3/2020"},
  {curso: "Curso 01", inicio: "16/04/22", fin: "28/10/22", tutores: "Dr. John Doe", ciudad:"barcelona", n_creditos: 13, id: "06-AFOC-03874.3/2020"},
  {curso: "Curso 01", inicio: "16/04/22", fin: "30/10/22", tutores: "Dr. John Doe", ciudad:"madrid", n_creditos: 13, id: "02-AFOC-03874.3/2020"},
  {curso: "Curso 01", inicio: "16/04/22", fin: "30/10/22", tutores: "Dr. John Doe", ciudad:"madrid", n_creditos: 13, id: "04-AFOC-03874.3/2020"},
  {curso: "Curso 01", inicio: "16/04/22", fin: "30/10/22", tutores: "Dr. John Doe", ciudad:"madrid", n_creditos: 13, id: "05-AFOC-03874.3/2020"},

];

export default function Courses() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [nombre, setNombre] = React.useState('');
  const handleChangeNombre = (event) => {
    setNombre(event.target.value);
  };

  const [apellidos, setApellidos] = React.useState('');
  const handleChangeApellidos = (event) => {
    setApellidos(event.target.value);
  };

  const [email, setEmail] = React.useState(' ');
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  const [id, setID] = React.useState(' ');
  const handleChangeID = (event) => {
    setID(event.target.value);
  }

  const [userType, setUserType] = React.useState(' ');
  const handleChangeUserType = (event) => {
    setUserType(event.target.value);
  }


  return (
    <>
      <Head>
        <title>Certificados Medea - Cursos</title>
        <meta
          name='description'
          content='Gestor de certificados de los cursos de Medea'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div>
          <div className={styles.coursesTop}>
            <text className={styles.typeXLarge}>Cursos</text>
            <Button variant='contained' onClick={handleOpen}>+ Nuevo Curso</Button>
          </div>
          <div className={styles.searcherContainer}>
            <text className={styles.typeLarge}> Buscador</text>
              <div className={styles.allSearchers}>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Nombre de curso</text>
                  <TextField id="outlined-basic" label="" variant="outlined" className={styles.marginTop}/>
                </div>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Fecha de inicio</text>
                  <TextField id="outlined-basic" label="" variant="outlined" className={styles.marginTop}/>
                </div>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Fecha de finalización</text>
                  <TextField id="outlined-basic" label="" variant="outlined" className={styles.marginTop}/>
                </div>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Tutores</text>
                  <TextField id="outlined-basic" label="" variant="outlined" className={styles.marginTop}/>
                </div>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Ciudad</text>
                  <TextField id="outlined-basic" label="" variant="outlined" className={styles.marginTop}/>
                </div>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Nº créditos</text>
                  <TextField id="outlined-basic" label="" variant="outlined" className={styles.marginTop}/>
                </div>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Nº expediente</text>
                  <TextField id="outlined-basic" label="" variant="outlined" className={styles.marginTop}/>
                </div>
              </div>
              <div className={styles.table}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={4}
                  rowsPerPageOptions={[4]}
                  rowHeight={149.8}
                />
              </div>
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box className={styles.modalBox}>
          <Typography id="modal-modal-title" variant="subtitle2" component="h2" fontSize={26}>
            Matricular en curso
          </Typography>
          <div className={styles.allTextFields}>
            <div>
              <div className={styles.textFieldModal}>
                <text>Nombre</text>
                <TextField
                  id="outlined-basic"
                  label=""
                  variant="outlined"
                  value={nombre}
                  onChange={handleChangeNombre}
                />
              </div>
              <div className={styles.textFieldModal}>
                <text>Apellidos</text>
                <TextField
                  id="outlined-basic"
                  label=""
                  variant="outlined"
                  value={apellidos}
                  onChange={handleChangeApellidos}
                />
              </div>
              <div className={styles.textFieldModal}>
                <text>Email</text>
                <TextField
                  id="outlined-basic"
                  label=""
                  variant="outlined"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </div>
            </div>
            <div>
              <div className={styles.textFieldModal}>
                <text>NIF</text>
                <TextField
                  id="outlined-basic"
                  label=""
                  variant="outlined"
                  type="id"
                  value={id}
                  onChange={handleChangeID}
                />
              </div>
              <div className={styles.textFieldModal}>
                <text>Tipo de Usuario</text>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userType}
                    label="UserType"
                    onChange={handleChangeUserType}
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
         {/*<CursosFichaInfo />*/}
      </main>
    </>
  );
}
