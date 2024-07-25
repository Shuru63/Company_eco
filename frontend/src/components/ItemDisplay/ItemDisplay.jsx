import React, { useContext } from 'react'
import './ItemDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import Product from '../Product/Product'

const ItemDisplay = ({category}) => {

    const {item_list}= useContext(StoreContext)
  return (
    <div className='item-display' id='item-display'>
      <h2>Explore our Products</h2>
      <div className="item-display-list">
        {item_list.map((item,index)=>{
            if(category==="All" || category===item.category){
                return <Product key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
            }
        })}
      </div>
    </div>
  )
}

export default ItemDisplay
