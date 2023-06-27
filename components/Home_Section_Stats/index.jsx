import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import styles from './HomeSectionStats.module.css';

export default function HomeSectionStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { isReady } = useRouter();

  useEffect(() => {
    if (isReady) {
      if (!sessionStorage.getItem('stats')) {
        fetch(`${process.env.API_HOST}/stats`)
          .then(statsList => {
            if (statsList.ok) {
              return statsList.json();
            }
          })
          .then(res => {
            if (!res) {
              setError(true);
              return;
            }
            setStats(res);
            sessionStorage.setItem('stats', JSON.stringify(res));
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
                  <p key={totals.courses} className='typeXL'>
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
                  <div key={stat.id} className='mb1-2'>
                    <p className='type'>{stat.title}</p>
                    <p className='typeS'>
                      {stat.date_created}
                      {stat.date_modified ? ' | (mod. ' + stat.date + ')' : ''}
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
                  <p key={totals.users} className='typeXL'>
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
                  <div key={stat.id} className='mb1-2'>
                    <p className='type'>{stat.name}</p>
                    <p className='typeS'>
                      {stat.date_created}
                      {stat.date_modified ? ' | (mod. ' + stat.date + ')' : ''}
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
