import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("");

  const {getTotalFavAmount,token,setToken} = useContext(StoreContext);

  const navigate= useNavigate();
  const logout= ()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }
 

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" style={{marginLeft:25}} /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
        <Link to='/product' onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}>Product</Link>
        {/* <a href='#app-download' onClick={()=>setMenu("Mobile-app")} className={menu==="Mobile-app"?"active":""}>Mobile-app</a> */}
        <Link to='/contact' onClick={()=>setMenu("Contact Us")} className={menu==="Contact Us"?"active":""}>Contact Us</Link>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
            <Link  to='/fav'><img src={assets.fav_icon} alt="" /></Link>
            <div className={getTotalFavAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>
        :<div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
          </div>}
        
        
      </div>
    </div>
  )
}

export default Navbar
