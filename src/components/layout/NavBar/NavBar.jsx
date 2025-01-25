import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCubes, FaSistrix, FaChartLine } from 'react-icons/fa';
import styles from './NavBar.module.css'; // Import the CSS Module

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? `${styles.navItem} ${styles.active}` : styles.navItem)}
      >
        <FaHome />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/frameworks"
        className={({ isActive }) => (isActive ? `${styles.navItem} ${styles.active}` : styles.navItem)}
      >
        <FaCubes />
        <span>Frameworks</span>
      </NavLink>
      <NavLink
        to="/stocks"
        className={({ isActive }) => (isActive ? `${styles.navItem} ${styles.active}` : styles.navItem)}
      >
        <FaChartLine />
        <span>Stocks</span>
      </NavLink>
    </nav>
  );
};

export default NavBar;
