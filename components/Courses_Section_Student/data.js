import { Button } from '@mui/material';
import Link from 'next/link';
import styles from './CoursesSectionStudent.module.css';

export const columns = [
  {
    field: 'name',
    headerName: 'Nombre',
    width: 110,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'lastName',
    headerName: 'Apellidos',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'nif',
    headerName: 'NIF',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'endDate',
    headerName: 'F. fin examen',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    Cell: props => {
      moment(props.value).format('dd/MM/yyyy');
    }
  },
  {
    field: 'buttonActions',
    headerName: '',
    sortable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    renderCell: params => {
      const onClick = e => {
        console.log(params.row.id);
      };
      return (
        <Link href={'/alumno/' + params.row.id}>
          <Button className={styles.buttonStyle} variant='outlined'>
            Ver alumno
          </Button>
        </Link>
      );
    }
  }
];
