import React, { useEffect, useState } from 'react';
import styles from './StudentsSectionInfo.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function StudentsSectionInfo() {
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState({});
  const [users, setUsers] = useState([]);

  const { query, isReady } = useRouter();

  useEffect(() => {
    if (isReady) {
      if (!sessionStorage.getItem('users')) {
        axios
          .get(`${process.env.API_HOST}/users`)
          .then(usersList => usersList.data.json())
          .then(users =>
            users.map(user => {
              return {
                ...user,
                initDate: user.date_init,
                endDate: user.date_end,
                fileNumber: user.file_number
              };
            })
          )
          .then(adaptedUsers => {
            setUsers(adaptedUsers);
            sessionStorage.setItem('users', JSON.stringify(adaptedUsers));
            var selUser = adaptedUsers.filter(user => user.id == query.id)[0];
            setSelectedUser(selUser);
            setLoading(false);
          });
      } else {
        let tempUsers = JSON.parse(sessionStorage.getItem('users'));
        setUsers(tempUsers);
        let selUser = tempUsers.filter(user => user.id == query.id)[0];
        setSelectedUser(selUser);
        setLoading(false);
      }
    }
  }, [isReady]);

  return (
    <div className={styles.main}>
      <div className={styles.alumnoInfoContainer}>
        <h2>Información</h2>
        <div className={styles.alumnoInfo}>
          <p>
            <span>Nombre:</span> {selectedUser.name}
          </p>
          <p>
            <span>Apellidos:</span> {selectedUser.last_name}
          </p>
          <p>
            <span>NIF:</span> {selectedUser.nif}
          </p>
        </div>
      </div>
    </div>
  );
}
