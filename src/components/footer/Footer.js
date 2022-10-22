import styles from './Footer.module.scss';

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {year} All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
