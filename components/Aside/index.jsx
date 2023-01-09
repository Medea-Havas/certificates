import styles from './Aside.module.css';
import Link from 'next/link';

export default function Aside() {
  return (
    <nav className={styles.aside}>
      <ul>
        <li className={styles.li}>
          <Link href='/'>Home</Link>
        </li>
        <li className={styles.li}>
          <Link href='/cursos'>Cursos</Link>
        </li>
        <li className={styles.li}>
          <Link href='/usuarios'>Usuarios</Link>
        </li>
      </ul>
    </nav>
  );
}
