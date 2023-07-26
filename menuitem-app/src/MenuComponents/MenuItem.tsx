import React from 'react'
import { MenuType } from '../Types/dataTypes'
import './MenuStyle.css'

interface MenuItemProps {
  item: MenuType
  quantity: number
}

const MenuItem: React.FC<MenuItemProps> = ({ item, quantity }) => {  
  return (

    <div>
      
      <div className='menu-item'>
        <h3>{item.itemName}</h3>
        <p>Price: ${item.price}</p>
        
      </div>
      <a id='select-item-text'>Select to add to order</a>
    </div>
    
  )
}

export default MenuItem
