import React from 'react'
import Head from 'next/head'
import { Button, Link } from '@mui/material'
import styles from './CoursesSectionInfo.module.css'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'

export default function CoursesSectionInfo() {
  return (
    <div>
      <div className={styles.coursesInfo}>
        <div className={styles.coursesInfoTitle}>
          <h2>Información del curso</h2>
        </div>
        <div className={styles.divInfoColCont}>
          <div className={styles.divInfoCol}>
            <p>
              <span className={styles.typeBold}>Nombre:</span> Curso 01
            </p>
            <p>
              <span className={styles.typeBold}>Duración:</span> 21/11/2020 -
              24/11/2021
            </p>
            <p>
              <span className={styles.typeBold}>Nº créditos:</span> 8,4
            </p>
            <p>
              <span className={styles.typeBold}>Ent. acreditora:</span> Medea,
              Medical Education Agency S.L.
            </p>
          </div>
          <div className={styles.divInfoCol}>
            <p>
              <span className={styles.typeBold}>Tutor:</span> John Doe
            </p>
            <p>
              <span className={styles.typeBold}>Horas:</span> 39
            </p>
            <p>
              <span className={styles.typeBold}>Nº de expediente:</span>{' '}
              07-AFOC-03874.3/2020
            </p>
            <p>
              <span className={styles.typeBold}>Acreditador por:</span> Comisión
              Formación Continuada Profesiones Sanitarias. Comunidad de Madrid
            </p>
          </div>
        </div>
        <div className={styles.divInfoCont}>
          <div>
            <p>
              <span className={styles.typeBold}>Contenidos:</span>
            </p>
          </div>
          <p>
            Lorem ipsum dolor sit amet. Sed dolore maiores At debitis aliquid et
            aliquam cumque aut eaque voluptatem qui iure voluptatem? Eos quia
            eligendi sed quidem harum nam excepturi numquam sed accusamus
            voluptas. Et nisi iste hic veniam odio in autem cupiditate. In
            pariatur error aut ipsam dolorum non quibusdam facere qui suscipit
            similique quo voluptates vero ea sunt possimus. Sed consectetur
            soluta eos consequatur quia quo harum voluptates ut placeat
            aspernatur eos accusantium atque. Eum labore expedita sed corrupti
            excepturi et sint quidem est vitae quasi. Aut delectus minima sed
            nobis numquam non magni Quis. Sed Quis voluptatem ad nesciunt eius
            ut reprehenderit sunt quo galisum quasi et quos aliquid rem
            quibusdam deserunt? Et excepturi quia ut nihil atque ex nihil
            consequatur in provident autem vel voluptatibus esse est quia sint.
            Ut voluptatem unde et omnis maxime aut omnis mollitia in nobis iure
            vel suscipit corrupti quo repudiandae neque.
          </p>
        </div>
        <div className={styles.divInfoColCont}>
          <div className={styles.divInfoCont}>
            <p>
              <span className={styles.typeBold}>Fecha de creación:</span>{' '}
              15/11/2020
            </p>
          </div>
          <div className={styles.divInfoCont}>
            <p>
              <span className={styles.typeBold}>Fecha de actualización:</span>{' '}
              17/07/2022
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
