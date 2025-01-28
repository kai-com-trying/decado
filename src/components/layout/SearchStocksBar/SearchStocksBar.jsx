import React from 'react'
import styles from './SearchStocksBar.module.css'
import { FaSistrix } from 'react-icons/fa'

const SearchStocksBar = () => {
  return (
    <div className={styles.searchArea}>
      <form 
        className={styles.searchForm}>
        <input 
          type="text" 
          placeholder="Search for stocks..." 
          className={styles.searchBar} 
        />
        <button 
          type="submit" 
          className={styles.searchButton}
        >
          <FaSistrix className={styles.searchIcon} />
        </button>
        
      </form>
    </div>
  )
}

export default SearchStocksBar
