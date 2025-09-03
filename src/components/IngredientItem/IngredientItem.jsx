import React, { useContext } from 'react'
import './IngredientItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'

const IngredientItem = ({ id, name, price, description, image, unit }) => {

    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
    
    // Handle image source - use local asset if backend image not available
    const getImageSrc = () => {
        if (typeof image === 'string' && image.includes('.png')) {
            return url + "/images/" + image;
        }
        return image; // Use imported asset
    };

    return (
        <div className='ingredient-item'>
            <div className="ingredient-item-img-container">
                <img className='ingredient-item-image' src={getImageSrc()} alt={name} />
                {!cartItems[id]
                    ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                    : <div className='ingredient-item-counter'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                    </div>
                }
            </div>
            <div className="ingredient-item-info">
                <div className="ingredient-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="ingredient-item-desc">{description}</p>
                <div className="ingredient-item-price-unit">
                    <p className="ingredient-item-price">฿{price}</p>
                    <p className="ingredient-item-unit">/{unit}</p>
                </div>
            </div>
        </div>
    )
}

export default IngredientItem
