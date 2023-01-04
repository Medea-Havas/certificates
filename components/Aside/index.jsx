import styles from './Aside.module.css';
import Link from 'next/link';

export default function Aside() {
  return (
    <nav className={styles.aside}>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/usuarios'>Usuarios</Link>
        </li>
        <li>
          <Link href='/cursos'>Cursos</Link>
        </li>
      </ul>
    </nav>
  );
}
