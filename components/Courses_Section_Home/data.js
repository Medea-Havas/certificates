import { Button } from '@mui/material';
import Image from 'next/Image';
import Link from 'next/link';
import styles from './CoursesSectionHome.module.css';

export const columns = [
  {
    field: 'name',
    headerName: 'Curso',
    minWidth: 110,
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'initDate',
    headerName: 'F. inicio',
    headerAlign: 'center',
    align: 'center',
    minWidth: 100,
    flex: 1,
    Cell: props => {
      props.value;
    }
  },
  {
    field: 'endDate',
    headerName: 'F. finalización',
    headerAlign: 'center',
    align: 'center',
    minWidth: 100,
    flex: 1,
    Cell: props => {
      props.value;
    }
  },
  {
    field: 'fileNumber',
    headerName: 'Nº Expediente',
    headerAlign: 'center',
    align: 'center',
    minWidth: 100,
    flex: 1
  },
  {
    field: 'credits',
    headerName: 'Nº créditos',
    type: 'number',
    headerAlign: 'center',
    align: 'center',
    minWidth: 100,
    flex: 1
  },
  {
    field: 'imagen',
    headerName: 'Imagen',
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
    field: 'buttonActions',
    headerName: '',
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    minWidth: 100,
    width: 240,
    renderCell: params => {
      const click = e => {
        console.log(params.row.id);
      };
      return (
        <div className={styles.buttonActions}>
          <Link
            href={{
              pathname: 'curso/[id]',
              query: {
                id: params.row.id
              }
            }}
          >
            <Button variant='outlined'>Ver</Button>
          </Link>
          <Link
            href={{
              pathname: 'curso/[id]/editar',
              query: {
                id: params.row.id
              }
            }}
          >
            <Button variant='outlined'>Editar</Button>
          </Link>
          <Button variant='outlined' onClick={click}>
            Borrar
          </Button>
        </div>
      );
    }
  }
];
