import React, { useState, useEffect } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const FoodDisplay = ({ category = 'All' }) => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(`${API}/api/food`);
        const data = await res.json();
        // Some APIs return {success, data}. If so, use data.data; otherwise use data directly.
        const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
        setFoods(list);
      } catch (err) {
        setFoods([]);
      }
    };
    fetchFoods();
  }, []);

  const filteredFoods = React.useMemo(() => {
    const norm = (v) => (v ?? '').toString().trim().toLowerCase();
    if (norm(category) === 'all') return foods;
    return foods.filter((f) => norm(f.category) === norm(category));
  }, [foods, category]);

  return (
    <div className="food-display">
      <h2 className="food-display-title">Top dishes near you</h2>
      <div className="food-display-list">
        {filteredFoods.length === 0 && (
          <div className="food-display-empty">No items found in this category.</div>
        )}
        {filteredFoods.map((food, idx) => (
          <FoodItem
            key={food._id || idx}
            id={food._id}
            image={food.image}
            name={food.name}
            price={food.price}
            desc={food.description}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;