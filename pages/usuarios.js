import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import Head from 'next/head';
import styles from '../styles/Users.module.css';

export default function Users() {
  return (
    <>
      <Head>
        <title>Certificados Medea - Usuarios</title>
        <meta
          name='description'
          content='Gestor de certificados de los cursos de Medea'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <h2>Usuarios</h2>
        <FormControl>
          <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='female'
            name='radio-buttons-group'
          >
            <FormControlLabel
              value='female'
              control={<Radio />}
              label='Female'
            />
            <FormControlLabel value='male' control={<Radio />} label='Male' />
            <FormControlLabel value='other' control={<Radio />} label='Other' />
          </RadioGroup>
        </FormControl>
      </main>
    </>
  );
}
