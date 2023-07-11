import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import styles from './HomeSectionStats.module.css';
import moment from 'moment';
import axios from 'axios';

export default function HomeSectionStats() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);

  const { isReady } = useRouter();

  useEffect(() => {
    if (isReady) {
      if (!sessionStorage.getItem('stats')) {
        axios.get(`${process.env.API_HOST}/stats`).then(statsList => {
          if (statsList.status == 200) {
            setStats(statsList.data);
            sessionStorage.setItem('stats', JSON.stringify(statsList.data));
          } else {
            setError(true);
          }
          setLoading(false);
        });
      } else {
        let tempStats = JSON.parse(sessionStorage.getItem('stats'));
        setStats(tempStats);
        setLoading(false);
      }
    }
  }, [isReady]);

  if (error)
    return (
      <div className={styles.homeContainer}>
        <p>Error de conexión</p>
      </div>
    );

  return (
    <div className={styles.homeContainer}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div className={styles.sectionContainer}>
            <div className={`${styles.totals} ${styles.totalLeft}`}>
              <div className={styles.centeredCont}>
                <p className='mb1 typeL'>Total Cursos</p>
                {stats.totals.map(totals => (
                  <p className='typeXL' key={totals.courses}>
                    {totals.courses}
                  </p>
                ))}
              </div>
            </div>
            <div className={styles.right}>
              <p className='mb1 typeM'>Últimos cursos creados</p>
              {stats.lastCourses
                .slice(0)
                .reverse()
                .map(stat => (
                  <div className='mb1-2' key={stat.id}>
                    <p className='type'>{stat.title}</p>
                    <p className='typeS'>
                      {moment(stat.date_created).format('L LT')}
                      {stat.date_modified
                        ? ' | (mod. ' + moment(stat.date).format('L LT') + ')'
                        : ''}
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <div className={`${styles.sectionContainer} end`}>
            <div className={`${styles.totals} ${styles.totalRight}`}>
              <div className={styles.centeredCont}>
                <p className='mb1 typeL'>Total Alumnos</p>
                {stats.totals.map(totals => (
                  <p className='typeXL' key={totals.users}>
                    {totals.users}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className='mb1 typeM'>Últimos alumnos creados</p>
              {stats.lastUsers
                .slice(0)
                .reverse()
                .map(stat => (
                  <div className='mb1-2' key={stat.id}>
                    <p className='type'>{stat.name}</p>
                    <p className='typeS'>
                      {moment(stat.date_created).format('L LT')}
                      {stat.date_modified
                        ? ' | (mod. ' + moment(stat.date).format('L LT') + ')'
                        : ''}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
