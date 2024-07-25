import React, { useContext} from 'react'
import './Product.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const Product = ({id,name,price,description,image}) => {

    const {favItems,addToFav,removeFromFav,url}=useContext(StoreContext);

  return (
    <div className='product'>
      <div className="product-img-container">

        <img className='product-image' src={url+"/images/"+image} alt="" />
        {!favItems[id]
            ?<img className='add' onClick={()=>addToFav(id)} src={assets.add_icon_white} alt="" />
            :<div className='product-counter'>
                <img onClick={()=>removeFromFav(id)} src={assets.remove_icon_red} alt="" />
                <p>{favItems[id]}</p>
                <img onClick={()=>addToFav(id)} src={assets.add_icon_green} alt="" />
            </div>
        }
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
  )
}

export default Product
