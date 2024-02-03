import React from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
const Header = () => {
  return (
    <div className={styles.container}>
        <p className={styles.logo_text}><Link href={'/'}>Quiz<span>App</span></Link> </p>
    </div>
  )
}

export default Header