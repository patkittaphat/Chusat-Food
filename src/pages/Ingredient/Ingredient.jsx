import React, { useState, useContext } from 'react'
import './Ingredient.css'
import { StoreContext } from '../../Context/StoreContext'
import IngredientItem from '../../components/IngredientItem/IngredientItem'

const Ingredient = () => {
  const [category, setCategory] = useState("All")
  const { ingredientList } = useContext(StoreContext)

  const ingredientCategories = [
    {
      category_name: "ทั้งหมด",
      category_value: "All"
    },
    {
      category_name: "พรีเมียม",
      category_value: "Premium"
    },
    {
      category_name: "อาหารทะเล",
      category_value: "Seafood"
    },
    {
      category_name: "ผักและเห็ด",
      category_value: "Vegetable"
    },
    {
      category_name: "ธัญพืช",
      category_value: "Grain"
    },
    {
      category_name: "ผลไม้",
      category_value: "Fruit"
    }
  ]

  return (
    <div className='ingredient-page' id='ingredient-page'>
      <div className="ingredient-header">
        <h1>วัตถุดิบคุณภาพ</h1>
        <p>วัตถุดิบสดใหม่สำหรับอาหารจีนแท้ ส่งตรงถึงบ้านคุณ</p>
      </div>

      <div className="ingredient-menu" id="ingredient-menu">
        <h2>เลือกหมวดหมู่วัตถุดิบ</h2>
        <div className="ingredient-menu-list">
          {ingredientCategories.map((item, index) => {
            return (
              <div 
                onClick={() => setCategory(prev => prev === item.category_value ? "All" : item.category_value)} 
                key={index} 
                className={`ingredient-menu-list-item ${category === item.category_value ? "active" : ""}`}
              >
                <p>{item.category_name}</p>
              </div>
            )
          })}
        </div>
        <hr />
      </div>

      <div className="ingredient-display" id="ingredient-display">
        <h2>วัตถุดิบแนะนำ</h2>
        <div className="ingredient-display-list">
          {ingredientList && ingredientList.map((item, index) => {
            if (category === "All" || category === item.category) {
              return <IngredientItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} unit={item.unit} />
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default Ingredient
