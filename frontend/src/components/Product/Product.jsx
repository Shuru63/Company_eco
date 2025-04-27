import React, { useContext} from 'react'
import './Product.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { Link } from 'react-router-dom'
const Product = ({id,name,price,description,image}) => {

    const {favItems,addToFav,removeFromFav,url}=useContext(StoreContext);

  return (
    <Link to={`/product/${id}`} className="product-link">
    <div className='product'>
      <div className="product-img-container">

        <img className='product-image' src={url+"/images/"+image} alt="" />
        
           <img className='add' onClick={()=>addToFav(id)} src={assets.add_icon_white} alt="" />
          
      </div>
      <div className="product-info">
        <div className="product-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className="product-desc">{description}</p>
        <p className='product-price'>${price}</p>
      </div>
    </div>
    </Link>
  )
}

export default Product
