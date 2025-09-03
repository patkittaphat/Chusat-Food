import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token ,setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/')
  }

  const handleMenuClick = (menuItem, sectionId) => {
    setMenu(menuItem);
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({behavior: 'smooth'});
      }, 100);
    } else {
      // If already on home page, just scroll to section
      document.getElementById(sectionId)?.scrollIntoView({behavior: 'smooth'});
    }
  };

  // Update active menu based on current route
  useEffect(() => {
    if (location.pathname === '/') {
      setMenu("home");
    } else if (location.pathname === '/cart') {
      setMenu("");
    } else if (location.pathname === '/order') {
      setMenu("");
    } else if (location.pathname === '/myorders') {
      setMenu("");
    } else if (location.pathname === '/ingredient') {
      setMenu("ingredient");
    }
  }, [location.pathname]);

  return (
    <div className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo} alt="" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={`${menu === "home" ? "active" : ""}`}>Home</Link>
        <Link to="/" onClick={() => handleMenuClick("menu", "explore-menu")} className={`${menu === "menu" ? "active" : ""}`}>Menu</Link>
        <Link to="/ingredient" onClick={() => setMenu("ingredient")} className={`${menu === "ingredient" ? "active" : ""}`}>Ingredient</Link>
        <Link to="/" onClick={() => handleMenuClick("mob-app", "reserve")} className={`${menu === "mob-app" ? "active" : ""}`}>Service</Link>
        <Link to="/" onClick={() => handleMenuClick("contact", "footer")} className={`${menu === "contact" ? "active" : ""}`}>Contact us</Link>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>
        {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}> <img src={assets.bag_icon} alt="" /> <p>Orders</p></li>
              <hr />
              <li onClick={logout}> <img src={assets.logout_icon} alt="" /> <p>Logout</p></li> 
            </ul>
          </div>
        }

      </div>
    </div>
  )
}

export default Navbar
