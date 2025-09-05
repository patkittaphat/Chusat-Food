import React, { useContext } from 'react';
import './IngredientDisplay.css';
import IngredientItem from '../IngredientItem/IngredientItem';
import { StoreContext } from '../../Context/StoreContext';

const IngredientDisplay = ({ category = 'All' }) => {
  const { ingredientList } = useContext(StoreContext);

  const filteredIngredients = React.useMemo(() => {
    const norm = (v) => (v ?? '').toString().trim().toLowerCase();
    if (norm(category) === 'all') return ingredientList || [];
    return (ingredientList || []).filter((ingredient) => norm(ingredient.category) === norm(category));
  }, [ingredientList, category]);

  return (
    <div className="ingredient-display">
      <h2 className="ingredient-display-title">Top ingredients near you</h2>
      <div className="ingredient-display-list">
        {filteredIngredients.length === 0 && (
          <div className="ingredient-display-empty">No ingredients found in this category.</div>
        )}
        {filteredIngredients.map((ingredient, idx) => (
          <IngredientItem
            key={ingredient._id || idx}
            id={ingredient._id}
            image={ingredient.image}
            name={ingredient.name}
            price={ingredient.price}
            description={ingredient.description}
            unit={ingredient.unit}
          />
        ))}
      </div>
    </div>
  );
};

export default IngredientDisplay;
