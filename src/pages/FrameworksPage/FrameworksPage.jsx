import React from 'react';
import SearchFrameworksBar from '../../components/layout/SearchFrameworksBar/SearchFrameworksBar';
import styles from './FrameworksPage.module.css';

const FrameworksPage = () => {
  return (
    <div>
      <div className={styles.searchArea}>
        <SearchFrameworksBar />
      </div>
      <h1>Frameworks Page</h1>
    </div>
  );
};

export default FrameworksPage;