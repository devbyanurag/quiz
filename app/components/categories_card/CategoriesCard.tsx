'use client'
import React from 'react'
import styles from './CategoriesCard.module.scss'
import { fetchCategory } from '@/app/utils/types'
import Link from 'next/link'



interface CategoriesCardProps{
  varient: "BLUE" | "YELLOW" | "ORANGE" | "GREEN",
  category: fetchCategory
}
const CategoriesCard = ({varient, category}:CategoriesCardProps) => {

  const navigate=()=>{
    console.log("first")
    
    

  }

  
  return (
    <Link href={`/quiz/${category.category}`} style={{textDecoration:'none'}}>
      <div onClick={navigate} className={`${styles.card}  ${ varient==="BLUE" && styles.varient_blue} ${ varient==="YELLOW" && styles.varient_yellow} ${ varient==="GREEN" && styles.varient_green} ${ varient==="ORANGE" && styles.varient_orange}`}>
      <p className={styles.bgID}>{category.id}</p>
      <p className={styles.cardCategory}>{category.category}</p>

    </div>
    </Link>
  )
}

export default CategoriesCard