import React from 'react'
import { FaArrowCircleRight } from "react-icons/fa";
import styles from './FrameworkTile.module.css'

const FrameworkTile = ({ framework }) => {
  return (
    <div className={styles.frameworkTile}>
        <div className={styles.titleDescription}>
            <h2>{framework.name}</h2>
            <p>{framework.description}</p>
        </div>
        <div className={styles.arrow}>
            <FaArrowCircleRight />
        </div>
    </div>
  )
}

export default FrameworkTile
