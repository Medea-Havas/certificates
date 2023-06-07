import { Button } from '@mui/material';
import Link from 'next/link';
import styles from './StudentsSectionHome.module.css';

export const columns = [
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
    field: 'lastName',
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
      const click = e => {
        console.log(params.row.id);
      };
      return (
        <div className={styles.buttonActions}>
          <Link
            href={{
              pathname: 'alumno/[id]',
              query: {
                id: params.row.id
              }
            }}
          >
            <Button variant='outlined'>Ver</Button>
          </Link>
          <Button onClick={click} variant='outlined'>
            Editar
          </Button>
          <Button onClick={click} variant='outlined'>
            Borrar
          </Button>
        </div>
      );
    }
  }
];
