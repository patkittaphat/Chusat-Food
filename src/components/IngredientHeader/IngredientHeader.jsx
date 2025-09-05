import './IngredientHeader.css'
import React from 'react';

const IngredientHeader = () => {
    return (
        <div className='ingredient-header'>
            <div className='ingredient-header-contents'>
                <h2>วัตถุดิบคุณภาพสำหรับอาหารจีนแท้</h2>
                <p>
                    เลือกจากวัตถุดิบสดใหม่และคุณภาพดี ที่คัดสรรมาเป็นพิเศษ 
                    จากแหล่งที่มาที่เชื่อถือได้ พร้อมส่งตรงถึงมือคุณ 
                    เพื่อให้คุณสามารถปรุงอาหารจีนแสนอร่อยได้ในบ้าน
                </p>
                <a
                    href="#explore-ingredient"
                    className="ingredient-menu-link"
                >
                    <button className="view-ingredient-btn">ดูวัตถุดิบ</button>
                </a>
            </div>
        </div>
    )
}

export default IngredientHeader
