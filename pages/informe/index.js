import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ReactSVG } from 'react-svg';
import { CircularProgress } from '@mui/material';
import Head from 'next/head';
import styles from './Informe.module.css';
import moment from 'moment';
import localization from 'moment/locale/es';

export default function Report() {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const { query, isReady } = useRouter();

  const cvs = query.cvs;
  const CryptoJS = require('crypto-js');

  const decryptWithAES = ciphertext => {
    const passphrase = 'integracion';
    const bytes = CryptoJS.AES.decrypt(
      ciphertext.replaceAll('-', '+'),
      passphrase
    );
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };

  useEffect(() => {
    if (isReady) {
      const decrypted = decryptWithAES(cvs);
      const userId = decrypted.split('-')[0];
      const courseId = decrypted.split('-')[1];
      fetch(`${process.env.API_HOST}/report/${userId}/${courseId}`)
        .then(info => info.json())
        .then(info => {
          setInfo(info);
          setLoading(false);
        });
      moment.updateLocale('es', localization);
    }
  }, [isReady]);

  return (
    <>
      <Head>
        <title>Certificados Medea - Informe</title>
        <meta name='description' content='Informe de certificado' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <section>
          <div className={styles.sectionHeader}>
            <ReactSVG src='./logo.svg' className={styles.logo} />
            <h1>
              Secretaría técnica de programas de formación <br />
              médica continuada
            </h1>
          </div>
          <div className={styles.container}>
            {loading ? (
              <CircularProgress />
            ) : (
              <div className={styles.content}>
                <div className={styles.datafields}>
                  <h2>Curso</h2>
                  <p>{info.title}</p>
                </div>
                <div className={styles.datafields}>
                  <h2>Acreditado por</h2>
                  <p>{info.accredited_by}</p>
                </div>
                <div className={styles.datafields}>
                  <h2>Alumno</h2>
                  <p>
                    {info.name} {info.last_name}
                  </p>
                </div>
                <div className={styles.datafields}>
                  <h2>NIF</h2>
                  <p>{info.nif}</p>
                </div>
                <div className={styles.datafields}>
                  <h2>Fecha de emisión</h2>
                  <p>{moment(info.date_completed).format('L')}</p>
                </div>
                <div className={styles.datafields}>
                  <h2>Nº de expediente</h2>
                  <p>{info.file_number}</p>
                </div>
                <div className={styles.datafields}>
                  <h2>Ciudad</h2>
                  <p>{info.city}</p>
                </div>
                <div className={styles.datafields}>
                  <h2>Número de créditos</h2>
                  <p>{info.credits}</p>
                </div>
                <div className={styles.datafields}>
                  <h2>Número de horas</h2>
                  <p>{info.hours}</p>
                </div>
                <div className={styles.datafields}>
                  <h2>Duración</h2>
                  <p>
                    {moment(info.date_init).format('L')} –{' '}
                    {moment(info.date_end).format('L')}
                  </p>
                </div>
                <div className={styles.datafields}>
                  <h2>Tutor/es</h2>
                  <p>{info.tutors}</p>
                </div>
                <div className={styles.datafields}>
                  <h2>Contenidos</h2>
                  <p>{info.content}</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
