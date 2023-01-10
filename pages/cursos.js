import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import next from 'next';
import Head from 'next/head';
import Image from 'next/Image';
import {moment} from 'moment'
import styles from '../styles/Courses.module.css';
import { Margin } from '@mui/icons-material';


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
      return <div className={styles.buttonAtions}><Button onClick={onClick} className={styles.buttonStyle}>Ver</Button><Button onClick={onClick} className={styles.buttonStyle}>Editar</Button><Button onClick={onClick} className={styles.buttonStyle}>Borrar</Button></div>;
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
            <Button variant='contained'>+ Nuevo Curso</Button>
          </div>
          <div className={styles.searcherContainer}>
            <text className={styles.typeLarge}> Buscador</text>
              <div className={styles.allSearchers}>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Nombre de curso</text>
                  <TextField id="outlined-basic" label="" variant="outlined" InputLabelProps={{className: styles.input}} InputProps={{className: styles.label}} />
                </div>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Fecha de inicio</text>
                  <TextField id="outlined-basic" label="" variant="outlined" InputLabelProps={{className: styles.input}} InputProps={{className: styles.label}} />
                </div>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Fecha de finalización</text>
                  <TextField id="outlined-basic" label="" variant="outlined" InputLabelProps={{className: styles.input}} InputProps={{className: styles.label}} />
                </div>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Tutores</text>
                  <TextField id="outlined-basic" label="" variant="outlined" InputLabelProps={{className: styles.input}} InputProps={{className: styles.label}} />
                </div>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Ciudad</text>
                  <TextField id="outlined-basic" label="" variant="outlined" InputLabelProps={{className: styles.input}} InputProps={{className: styles.label}} />
                </div>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Nº créditos</text>
                  <TextField id="outlined-basic" label="" variant="outlined" InputLabelProps={{className: styles.input}} InputProps={{className: styles.label}} />
                </div>
                <div className={styles.searcherField}>
                  <text className={styles.typeXSmall}>Nº expediente</text>
                  <TextField id="outlined-basic" label="" variant="outlined" InputLabelProps={{className: styles.input}} InputProps={{className: styles.label}} />
                </div>
              </div>
            {/*<div className={styles.fieldsTitle}>
              <text className={styles.typeMedium}> Curso</text>
              <text className={styles.typeMedium}> Inicio</text>
              <text className={styles.typeMedium}> Fin</text>
              <text className={styles.typeMedium}> Tutores</text>
              <text className={styles.typeMedium}> Ciudad</text>
              <text className={styles.typeMedium}> Nº créditos</text>
              <text className={styles.typeMedium}> Nº expediente</text>
              <text className={styles.typeMedium}> Imagen</text>
            </div>
            <div className={styles.course}>
              <text className={styles.typeSmall}> Curso 01</text>
              <text className={styles.typeSmall}> 16-04-22</text>
              <text className={styles.typeSmall}> 31-10-22</text>
              <text className={styles.typeSmall}> Dr. John Doe</text>
              <text className={styles.typeSmall}> Madrid</text>
              <text className={styles.typeSmall}> 13,6</text>
              <text className={styles.typeSmall}> 07-AFOC-03874.3/2020</text>
              <div><Image
                src={'/pexels.jpeg'}
                alt="Picture of the author"
                width={50}
                height={50}
                // blurDataURL="data:..." automatically provided
                // placeholder="blur" // Optional blur-up while loading
              /></div>
              </div>*/}

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
      </main>
    </>
  );
}
