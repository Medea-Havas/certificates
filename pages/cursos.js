import React, { useState } from 'react';
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator
} from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import Head from 'next/head';
import Image from 'next/Image';
import { moment } from 'moment';
import styles from '../styles/Courses.module.css';
import CoursesSectionInfo from '../components/Courses_Section_Info';
import CoursesSectionCertificate from '../components/Courses_Section_Certificate';
import CoursesSectionStudent from '../components/Courses_Section_Student';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import CoursesSectionHome from '../components/Courses_Section_Home';

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
      <main className={`page ${styles.main}`}>
        <CoursesSectionHome />
        {/* <CoursesSectionInfo /> */}
        {/* <CoursesSectionCertificate /> */}
        {/* <CoursesSectionStudent /> */}
      </main>
    </>
  );
}
