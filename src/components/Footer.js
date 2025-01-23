import React from 'react';
import styles from '../styles/Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2023 Știri România. Toate drepturile rezervate.</p>
        <nav className={styles.footerNav}>
          <a href="/about">Despre noi</a>
          <a href="/contact">Contact</a>
          <a href="/terms">Termeni și condiții</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;