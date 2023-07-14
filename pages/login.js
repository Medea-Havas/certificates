import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Login.module.css';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
const API_HOST = process.env.API_HOST;

export default function Courses() {
  const [reqUser, setReqUser] = useState(true);
  const [reqPass, setReqPass] = useState(true);
  const [user, setUser] = useState({});
  const router = useRouter();

  const handleSubmit = () => {
    axios
      .put(`${API_HOST}/login/1`, user)
      .then(response => {
        if (response.status == 200 || response.status == 201) {
          sessionStorage.setItem('token', response.data.messages.data.token);
          router.push('/');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const updateField = (e, field) => {
    setUser(prevState => ({
      ...prevState,
      [field]: e.target.value
    }));
  };

  return (
    <>
      <Head>
        <title>Certificados Medea - Login</title>
        <meta
          name='description'
          content='Gestor de certificados de los cursos de Medea'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div className={styles.form}>
          <h1>Login</h1>
          <div className={styles.textField}>
            <p>
              Usuario<span>*</span>
            </p>
            <TextField
              error={reqUser ? false : true}
              onChange={e => updateField(e, 'user')}
              variant='outlined'
              value={user.user}
            />
          </div>
          <div className={styles.textField}>
            <p>
              Contraseña<span>*</span>
            </p>
            <TextField
              error={reqPass ? false : true}
              onChange={e => updateField(e, 'pass')}
              variant='outlined'
              value={user.pass}
            />
          </div>
          <div className={styles.buttonCont}>
            <Button
              className={styles.loginButton}
              onClick={handleSubmit}
              variant='contained'
            >
              Entrar
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
