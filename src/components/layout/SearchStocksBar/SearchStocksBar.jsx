import React, { useEffect } from 'react'
import styles from './SearchStocksBar.module.css'
import { FaSistrix } from 'react-icons/fa'
import { setSearchQuery, clearSearchResults, fetchSearchResults } from '../../../features/searchSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom'

const SearchStocksBar = () => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.searchQuery);
  const searchResults = useSelector((state) => state.search.searchResults);
  const navigate = useNavigate();
  const setQuery = (e) => {
    dispatch(setSearchQuery(e.target.value));
    console.log(query);
  }

  const clearSearch = () => {
    dispatch(clearSearchResults());
    dispatch(setSearchQuery(""));
  }

  const search = (e) => {
    e.preventDefault();
    if(!query.trim()) return;
    dispatch(fetchSearchResults(query));
  }

  return (
    <div className={styles.searchArea}>
      <form 
        className={styles.searchForm}
        onSubmit={search}
      >
        <input 
          type="text" 
          placeholder="Search for stocks..." 
          className={styles.searchBar} 
          onChange={setQuery}
          value={query}
          onMouseEnter={search}
        />
        <button onClick={clearSearch}>
          <RxCross1 className={styles.clear}/>
        </button>
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
