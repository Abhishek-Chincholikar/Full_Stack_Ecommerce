import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import nav_dropdown from '../Assets/nav_dropdown.png'
import profile_icon from '../Assets/profile_icon2.jpg' 
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {

  let [menu, setMenu] = useState("shop");
  const [showProfile, setShowProfile] = useState(false); 

  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.replace("/");
  }

  return (
    <div className='nav'>
      <Link to='/' onClick={() => { setMenu("shop") }} style={{ textDecoration: 'none' }} className="nav-logo">
        <img src={logo} alt="logo" />
        <p>Quick-Cart</p>
      </Link>
      
      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="" />
      
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => { setMenu("mens") }}><Link to='/mens' style={{ textDecoration: 'none' }}>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("womens") }}><Link to='/womens' style={{ textDecoration: 'none' }}>Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("kids") }}><Link to='/kids' style={{ textDecoration: 'none' }}>Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
        <Link to='/contact' style={{ textDecoration: 'none', color: 'inherit' }}>Contact</Link>
      </ul>

      <div className="nav-login-cart">
        {/* CHECK IF USER IS LOGGED IN */}
        {localStorage.getItem('auth-token')
          ? (
            // IF LOGGED IN: SHOW PROFILE ICON WITH DROPDOWN
            <div className="nav-profile-container">
              {/* Clicking image toggles the showProfile state */}
              <img 
                src={profile_icon} 
                alt="profile" 
                className="nav-profile-icon" 
                onClick={() => setShowProfile(!showProfile)} 
              />
              
              {/* Only show this UL if showProfile is true */}
              {showProfile && (
                <ul className="nav-profile-dropdown">
                  <li className="nav-profile-name">
                    Hii, {localStorage.getItem('username') || "User"} 👋
                  </li>
                  {/* --------------------------------------------------- */}
                  
                  <li><Link to='/orders' style={{ textDecoration: 'none', color: 'inherit' }}>Orders</Link></li>
                  <li onClick={handleLogout}>Sign Out</li>
                </ul>
              )}
            </div>
          )
          : (
            // IF NOT LOGGED IN: SHOW LOGIN BUTTON
            <Link to='/login' style={{ textDecoration: 'none' }}>
              <button>Login</button>
            </Link>
          )
        }

        <Link to="/cart"><img src={cart_icon} alt="cart" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar