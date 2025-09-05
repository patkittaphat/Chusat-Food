import React, { useState } from 'react'
import IngredientHeader from '../../components/IngredientHeader/IngredientHeader'
import ExploreIngredient from '../../components/ExploreIngredient/ExploreIngredient'
import IngredientDisplay from '../../components/IngredientDisplay/IngredientDisplay'

const Ingredient = () => {
  const [category, setCategory] = useState("All")

  return (
    <>
      <IngredientHeader />
      <ExploreIngredient setCategory={setCategory} category={category} />
      <IngredientDisplay category={category} />
      <div style={{ height: '300px' }}></div>
    </>
  )
}

export default Ingredient
