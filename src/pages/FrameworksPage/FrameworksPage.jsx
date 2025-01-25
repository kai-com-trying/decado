import React from 'react';
import SearchFrameworksBar from '../../components/layout/SearchFrameworksBar/SearchFrameworksBar';
import styles from './FrameworksPage.module.css';
import FrameworksList from '../../components/layout/Frameworks/FrameworksList/FrameworksList';

const FrameworksPage = () => {
  return (
    <div>
      <div className={styles.searchArea}>
        <SearchFrameworksBar />
      </div>
      <div className={styles.frameworksList}>
        <FrameworksList />
      </div>
    </div>
  );
};

export default FrameworksPage;