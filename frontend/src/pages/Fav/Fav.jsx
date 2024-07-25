import React, { useContext } from 'react'
import './Fav.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Fav = ()=>{

  const { favItems, item_list, removeFromFav, getTotalFavAmount, url } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className='fav'>
      <div className="fav-items">
        <div className="fav-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {item_list.map((item) => {
          if (favItems[item._id] > 0) {
            return (
              <div>
                <div className='fav-items-title fav-items-item'>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{favItems[item._id]}</p>
                  <p>${item.price * favItems[item._id]}</p>
                  <p onClick={() => removeFromFav(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>

            )
          }
        })}
      </div>
      <div className="fav-bottom">
        <div className="fav-total">
          <h2>Fav Totals</h2>
          <div>
            <div className="fav-total-details">
              <p>Subtotal</p>
              <p>${getTotalFavAmount()}</p>
            </div>
            <hr />
            <div className="fav-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalFavAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="fav-total-details">
              <b>Total </b>
              <b>${getTotalFavAmount()===0?0:getTotalFavAmount()+2}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="fav-promocode">
          <div>
            <p>If you have a promo code, enter it here.</p>
            <div className="fav-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fav
