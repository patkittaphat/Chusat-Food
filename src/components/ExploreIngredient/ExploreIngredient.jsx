import React, { useContext } from "react";
import "./ExploreIngredient.css";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";

const ExploreIngredient = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);

  const ingredientCategories = [
    {
      category_name: "ทั้งหมด",
      category_value: "All",
      category_image: menu_list[0]?.menu_image || assets.menu_1
    },
    {
      category_name: "พรีเมียม",
      category_value: "Premium",
      category_image: menu_list[1]?.menu_image || assets.menu_2
    },
    {
      category_name: "อาหารทะเล",
      category_value: "Seafood",
      category_image: menu_list[2]?.menu_image || assets.menu_3
    },
    {
      category_name: "ผักและเห็ด",
      category_value: "Vegetable",
      category_image: menu_list[3]?.menu_image || assets.menu_4
    },
    {
      category_name: "ธัญพืช",
      category_value: "Grain",
      category_image: menu_list[4]?.menu_image || assets.menu_5
    },
    {
      category_name: "ผลไม้",
      category_value: "Fruit",
      category_image: menu_list[5]?.menu_image || assets.menu_6
    }
  ];

  return (
    <div className="explore-ingredient" id="explore-ingredient">
      <h1>Explore our Ingredient</h1>
      <p className="explore-ingredient-text">
        เลือกจากหมวดหมู่วัตถุดิบที่หลากหลาย เพื่อค้นหาวัตถุดิบที่คุณต้องการ 
        จากแหล่งที่มาที่เชื่อถือได้และคุณภาพสูง พร้อมส่งตรงถึงมือคุณ 
        เพื่อให้คุณสามารถปรุงอาหารได้อย่างมีคุณภาพ
      </p>
      <div className="explore-ingredient-list">
        {ingredientCategories.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.category_value ? "All" : item.category_value
                )
              }
              key={index}
              className="explore-ingredient-list-item"
            >
              <img
                src={item.category_image}
                className={category === item.category_value ? "active" : ""}
                alt={item.category_name}
              />
              <p>{item.category_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreIngredient;
