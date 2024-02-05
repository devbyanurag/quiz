import React from 'react'
import styles from './loading.module.scss'
import Image from 'next/image'
const LoadingComponent = () => {
    return (
        <div className={styles.container}>
 
            <Image className={styles.loader} src={'/loading.png'} alt='csa' height={100} width={100}/>
        </div>
    )
}

export default LoadingComponent