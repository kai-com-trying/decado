import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './layout/NavBar/NavBar';
import styles from './Root.module.css';


const Root = () => {
  return (
    <div>
      <NavBar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;