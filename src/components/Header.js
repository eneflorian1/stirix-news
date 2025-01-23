import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <Link to="/" className={styles.logo}>Știri România</Link>
          <ul className={styles.navLinks}>
            <li><Link to="/">Acasă</Link></li>
            <li><Link to="/categories">Categorii</Link></li>
            <li><Link to="/archive">Arhivă</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;