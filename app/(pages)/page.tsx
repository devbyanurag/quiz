'use client'

import styles from "./page.module.scss";
import CategoriesCard from "../components/categories_card/CategoriesCard";
import { useEffect, useState } from "react";
import { api_backend } from "../api/api";
import { fetchCategory } from "../utils/types";
import { CategoriesCard_variant } from "../utils/constants";
import LoadingComponent from "../components/loading/loading";


export default function Home() {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getLoadData()

  }, [])

  const [categories, setCategories] = useState<fetchCategory[]>([])

  const getLoadData = async () => {
    try {
      setLoading(true)
      const response = await api_backend.get(`quiz/categories`);
      setCategories(response.data.data)
      setLoading(false)

    } catch (error) {
      setLoading(false)

      console.error('Error fetching weather data:', error);
    }
  }


  return (
    <div className={styles.container}>
      {
        loading &&
        <LoadingComponent />

      }
      <div className={styles.heading}>
        <p>Explore a diverse range of knowledge with our Categories section, where you can select from a myriad of topics to challenge your intellect. From science to pop culture, our quiz app offers a variety of categories to cater to every curiosity.</p>
        <div className={styles.divider}></div>
      </div>
      <div className={styles.categories_container}>
        <h3 className={styles.heading}>Categories</h3>
        <div className={styles.cards_container}>
          {
            categories.length > 0 &&
            categories.map((category: fetchCategory, index) => {
              const variantIndex = index % CategoriesCard_variant.length;
              return <CategoriesCard category={category} varient={CategoriesCard_variant[variantIndex] as "BLUE" | "GREEN" | "YELLOW" | "ORANGE"} key={category.id} />

            })
          }
        </div>

      </div>


    </div>
  );
}


// {env}
// <Link href="/quiz/123">Home</Link>