import React, { useContext, useMemo } from 'react'
import './ItemDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import Product from '../Product/Product'

const ItemDisplay = ({ category }) => {
  const { item_list } = useContext(StoreContext)
  
  // Group items by category
  const categorizedItems = useMemo(() => {
    const result = {}
    
    item_list.forEach(item => {
      // Filter based on selected category if not "All"
      if (category === "All" || category === item.category) {
        if (!result[item.category]) {
          result[item.category] = []
        }
        result[item.category].push(item)
      }
    })
    
    return result
  }, [item_list, category])
  
  return (
    <div className='item-display' id='item-display'>
      <h2>Explore our Products</h2>
      
      {Object.entries(categorizedItems).map(([categoryName, items]) => (
        <div key={categoryName} className="category-section">
          <h3 className="category-heading">{categoryName}</h3>
          <div className="category-row">
            {items.map((item, index) => (
              <Product 
                key={index} 
                id={item._id} 
                name={item.name} 
                description={item.description} 
                price={item.price} 
                image={item.image}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ItemDisplay