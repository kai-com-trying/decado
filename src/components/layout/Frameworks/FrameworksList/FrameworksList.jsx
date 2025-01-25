import React from 'react'
import { frameworks } from '../../../../api/frameworks'
import FrameworkTile from '../FrameworkTile/FrameworkTile'
import styles from './FrameworksList.module.css'

const FrameworksList = () => {
  return (
    <div className={styles.frameworksList}>
        {frameworks.map((framework, index) => (
            <FrameworkTile key={index} framework={framework} />
        ))}
    </div>
  )
}

export default FrameworksList
