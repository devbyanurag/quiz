import React from 'react'
import styles from './Header.module.scss'
const Header = () => {
  return (
    <div className={styles.container}>
        <p className={styles.logo_text}>Quiz<span>App</span> </p>
    </div>
  )
}

export default Header