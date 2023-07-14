import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Font
} from '@react-pdf/renderer';
import { CircularProgress } from '@mui/material';
import Head from 'next/head';
import moment from 'moment';
import localization from 'moment/locale/es';
import styles from './Certificate.module.css';
import axios from 'axios';

export default function Certificate() {
  const [coords, setCoords] = useState([]);
  const [cvs, setCVS] = useState('');
  const [loadedToken, setLoadedToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pdfHeight, setPdfHeight] = useState(0);
  const [src, setSrc] = useState('');
  const [studentCourse, setStudentCourse] = useState({});

  const { query, isReady } = useRouter();
  const ref = useRef(null);

  const API_HOST = process.env.API_HOST;
  const HOST = process.env.HOST;
  const TEMP_API_HOST = 'https://certificates-api.hhytest.com/public';
  const userId = query.userId;
  const courseId = query.courseId;
  moment.updateLocale('es', localization);

  const CryptoJS = require('crypto-js');

  const encryptWithAES = text => {
    const passphrase = 'integracion';
    const encrypted = CryptoJS.AES.encrypt(text, passphrase).toString();
    return encrypted.replaceAll('+', '-');
  };

  Font.register({
    family: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: 'normal',
    src: 'https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap'
  });

  const MyDocument = () => (
    <Document>
      <Page size='A4' style={PdfStyles.page} orientation='landscape'>
        <Image
          src={`${TEMP_API_HOST}/assets/certificates/${studentCourse.certificate_image}`}
          style={PdfStyles.bg}
        />
        <View>
          <Image
            src={src}
            className={PdfStyles.qr}
            style={{ left: '40px', top: '250px', width: '90px' }}
          />
        </View>
        <View style={PdfStyles.name}>
          <Text>
            {studentCourse.name} {studentCourse.last_name}
          </Text>
        </View>
        <View style={PdfStyles.file_number}>
          <Text>{studentCourse.file_number}</Text>
        </View>
        <View style={PdfStyles.credits}>
          <Text>{studentCourse.credits}</Text>
        </View>
        <View style={PdfStyles.date}>
          <Text>{moment(studentCourse.date_completed).format('L')}</Text>
        </View>
      </Page>
      {studentCourse.certificate_image2 ? (
        <Page size='A4' style={PdfStyles.page} orientation='portrait'>
          <Image
            src={`${TEMP_API_HOST}/assets/certificates/${studentCourse.certificate_image2}`}
            style={styles.bg}
          ></Image>
          <View style={PdfStyles.qr}>
            <Text>
              {studentCourse.name} {studentCourse.last_name}
            </Text>
          </View>
          <View style={PdfStyles.sec_name}>
            <Text>
              {studentCourse.name} {studentCourse.last_name}
            </Text>
          </View>
          <View style={PdfStyles.sec_nif}>
            <Text>{studentCourse.nif}</Text>
          </View>
          <View style={PdfStyles.sec_file_number}>
            <Text>{studentCourse.file_number}</Text>
          </View>
          <View style={PdfStyles.sec_credits}>
            <Text>{studentCourse.credits}</Text>
          </View>
          <View style={PdfStyles.sec_hours}>
            <Text>{studentCourse.hours}</Text>
          </View>
        </Page>
      ) : (
        ''
      )}
    </Document>
  );

  const PDF = () => (
    <PDFViewer height={pdfHeight} width='100%'>
      <MyDocument width='100%' />
    </PDFViewer>
  );

  const PdfStyles = StyleSheet.create({
    bg: {
      position: 'absolute',
      width: '100%',
      zIndex: 1
    },
    page: {
      background: `${TEMP_API_HOST}/assets/certificates/${studentCourse.certificate_image}`,
      flexDirection: 'row',
      width: '100%'
    },
    pdfContent: {
      fontFamily: 'Helvetica',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%'
    },
    qr: {
      position: 'absolute',
      zIndex: 4
    },
    name: {
      fontSize: coords[0] ? coords[0][3] : 0,
      left: coords[0] ? coords[0][1] : 0,
      position: 'absolute',
      top: coords[0] ? coords[0][0] - 5 : 0,
      width: coords[0] ? coords[0][2] : 0
    },
    file_number: {
      fontSize: coords[1] ? coords[1][3] : 0,
      left: coords[1] ? coords[1][1] : 0,
      position: 'absolute',
      top: coords[1] ? coords[1][0] - 5 : 0,
      width: coords[1] ? coords[1][2] : 0
    },
    date: {
      fontSize: coords[2] ? coords[2][3] : 0,
      left: coords[2] ? coords[2][1] : 0,
      position: 'absolute',
      top: coords[2] ? coords[2][0] - 5 : 0,
      width: coords[2] ? coords[2][2] : 0
    },
    credits: {
      fontSize: coords[3] ? coords[3][3] : 0,
      left: coords[3] ? coords[3][1] : 0,
      position: 'absolute',
      top: coords[3] ? coords[3][0] - 5 : 0,
      width: coords[3] ? coords[3][2] : 0
    },
    sec_name: {
      fontSize: coords[4] ? coords[4][3] : 0,
      left: coords[4] ? coords[4][1] : 0,
      position: 'absolute',
      top: coords[4] ? coords[4][0] : 0,
      width: coords[4] ? coords[4][2] : 0
    },
    sec_nif: {
      fontSize: coords[5] ? coords[5][3] : 0,
      left: coords[5] ? coords[5][1] : 0,
      position: 'absolute',
      top: coords[5] ? coords[5][0] : 0,
      width: coords[5] ? coords[5][2] : 0
    },
    sec_file_number: {
      fontSize: coords[6] ? coords[6][3] : 0,
      left: coords[6] ? coords[6][1] : 0,
      position: 'absolute',
      top: coords[6] ? coords[6][0] : 0,
      width: coords[6] ? coords[6][2] : 0
    },
    sec_credits: {
      fontSize: coords[7] ? coords[7][3] : 0,
      left: coords[7] ? coords[7][1] : 0,
      position: 'absolute',
      top: coords[7] ? coords[7][0] : 0,
      width: coords[7] ? coords[7][2] : 0
    },
    sec_hours: {
      fontSize: coords[8] ? coords[8][3] : 0,
      left: coords[8] ? coords[8][1] : 0,
      position: 'absolute',
      top: coords[8] ? coords[8][0] : 0,
      width: coords[8] ? coords[8][2] : 0
    }
  });

  useEffect(() => {
    if (
      !sessionStorage.getItem('token') ||
      sessionStorage.getItem('token') == ''
    ) {
      Router.push('/login');
    } else {
      axios.interceptors.request.use(
        function (config) {
          const token = sessionStorage.getItem('token');
          config.headers.Authorization = 'Bearer ' + token;
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
      );
      setLoadedToken(true);
    }
  }, []);

  useEffect(() => {
    if (isReady) {
      axios
        .get(`${API_HOST}/usercourse/${userId}/${courseId}`)
        .then(coursesList => coursesList.data)
        .then(studentCourseRes => {
          setStudentCourse(studentCourseRes);
          let tempCoords = studentCourseRes.coords.split('*');
          var arCoords = [];
          arCoords[0] = tempCoords[0].split(',');
          arCoords[1] = tempCoords[1].split(',');
          arCoords[2] = tempCoords[2].split(',');
          arCoords[3] = tempCoords[3].split(',');
          arCoords[4] = tempCoords[4].split(',');
          arCoords[5] = tempCoords[5].split(',');
          arCoords[6] = tempCoords[6].split(',');
          arCoords[7] = tempCoords[7].split(',');
          arCoords[8] = tempCoords[8].split(',');
          setCoords(arCoords);
          setCVS(encryptWithAES(userId + '-' + courseId));
          if (!pdfHeight) setPdfHeight(ref.current.offsetWidth * 0.8);
          setSrc(
            `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${HOST}/informe?cvs=${cvs}&choe=UTF-8`
          );
          setLoading(false);
        })
        .then(res => {
          console.log('cvs', cvs);
        })
        .catch(function (error) {
          if (error) {
            setLoading(false);
            return;
          }
        });
    }
  }, [isReady]);

  return loadedToken ? (
    <>
      <Head>
        <title>Certificados Medea - Certificado</title>
        <meta
          name='description'
          content='Gestor de certificados de los cursos de Medea'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='main'>
        <div>
          <div className='sectionHeader' ref={ref}>
            <h1>Certificado</h1>
          </div>
          {loading ? (
            <CircularProgress />
          ) : src ? (
            <PDF className={styles.pdf} />
          ) : (
            'El certificado no existe'
          )}
        </div>
      </main>
    </>
  ) : (
    <>
      <Head>
        <title>Certificados Medea</title>
        <meta
          name='description'
          content='Gestor de certificados de los cursos de Medea'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='main'>
        <p className='centered'>No está autorizado para ver el contenido</p>
      </main>
    </>
  );
}
