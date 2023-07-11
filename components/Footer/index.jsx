import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrap}>
        © {year} Medea, Medical Education Agency S.L.
      </div>
    </footer>
  );
}
