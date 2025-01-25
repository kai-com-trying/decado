import React from 'react'
import styles from './SearchFrameworksBar.module.css'

const SearchFrameworksBar = () => {
  return (
    <div className={styles.searchArea}>
      <input type="text" placeholder="Search for frameworks..." className={styles.searchBar} />
    </div>
  )
}

export default SearchFrameworksBar
