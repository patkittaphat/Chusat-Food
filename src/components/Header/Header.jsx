import './Header.css'
import React from 'react';
const Header = ({ menu, setMenu }) => {
    return (
        <div className='header'>
            <div className='header-contents'>
                <h2>Order your favourite food here</h2>
                <p>
                    Choose from a diverse menu featuring a delectable array of
                    dishes crafted with the finest ingredients and culinary
                    expertise. Our mission is to satisfy your cravings and
                    elevate your dining experience, one delicious meal at a time.
                </p>

                {/* 🔥 ปุ่ม View Menu */}
                <a
                    href="#explore-menu"
                    onClick={() => setMenu("menu")}
                    className={menu === "menu" ? "active" : ""}
                >
                    <button className="view-menu-btn">View Menu</button>
                    
                </a>
            </div>
        </div>
    )
}

export default Header
