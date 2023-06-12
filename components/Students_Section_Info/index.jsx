import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import styles from './StudentsSectionInfo.module.css';
import { useRouter } from 'next/router';

export default function StudentsSectionInfo() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const { query, isReady } = useRouter();

  useEffect(() => {
    if (isReady) {
      if (!localStorage.getItem('users')) {
        fetch('http://localhost:8080/users')
          .then(usersList => usersList.json())
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
            localStorage.setItem('users', JSON.stringify(adaptedUsers));
            var selUser = adaptedUsers.filter(user => user.id == query.id)[0];
            setSelectedUser(selUser);
            setLoading(false);
          });
      } else {
        let tempUsers = JSON.parse(localStorage.getItem('users'));
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
