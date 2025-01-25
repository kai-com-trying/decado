import React from 'react'
import styles from './SearchStocksBar.module.css'
import { FaSistrix } from 'react-icons/fa'

const SearchStocksBar = () => {
  return (
    <div className={styles.searchArea}>
      <input type="text" placeholder="Search for stocks..." className={styles.searchBar} />
      <FaSistrix className={styles.searchIcon} />
    </div>
  )
}

export default SearchStocksBar
