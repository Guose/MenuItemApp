import React, { useState } from 'react';
import MenuItem from './MenuItem';
import { MenuType } from '../Types/dataTypes';
import './MenuStyle.css'

interface MenuListProps {
  menuItems: MenuType[]
  onAddToOrder: (item: MenuType) => void
  itemQuantities: { [itemId: number]: number}
  orderNumber: number
}

const MenuList: React.FC<MenuListProps> = ({ menuItems, onAddToOrder, itemQuantities, orderNumber }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0)

  // Filter menu items based on the selected category
  const filteredMenuItems = menuItems.filter((item) => item.category === selectedCategory)

  // Function to handle next item slide
  const handleNextItem = () => {
    setCurrentItemIndex((prevIndex) => (prevIndex + 1) % filteredMenuItems.length)
  }

  // Function to handle next item slide
  const handlePrevItem = () => {
    setCurrentItemIndex((prevIndex) => (prevIndex - 1 + filteredMenuItems.length) % filteredMenuItems.length)
  }
  
  const handleClickMenuItem = () => {
    // Add the selected menu item to the order summary
    onAddToOrder(filteredMenuItems[currentItemIndex])
  }

  return (
    <div className='menu-list-container'>
      <div className="category-buttons">
        <div className="category-button">
          <img
            src="/images/sandwiches.png"
            alt="Sandwiches"
            onClick={() => setSelectedCategory('Sandwiches')}
            className={`category-image ${selectedCategory === 'Sandwiches' ? 'active-button' : ''}`}
          />
          <span className='category-label'>Sandwiches</span>
        </div>
        <div className="category-button">
          <img
            src="/images/sides.png"
            alt="Sides"
            onClick={() => setSelectedCategory('Sides')}
            className={`category-image ${selectedCategory === 'Sides' ? 'active-button' : ''}`}
          />
          <span className='category-label'>Sides</span>
        </div>
        <div className="category-button">
          <img
            src="/images/drinks.png"
            alt="Drinks"
            onClick={() => setSelectedCategory('Drinks')}
            className={`category-image ${selectedCategory === 'Drinks' ? 'active-button' : ''}`}
          />
          <span className='category-label'>Drinks</span>
        </div>
      </div>
      <div className='menu-nav-buttons'>
        <button onClick={handlePrevItem}>&lt;</button>

        {filteredMenuItems.length === 0 ? ( <p>No items available in this category.</p> ) : (
          <div className='current-item-container' key={filteredMenuItems[currentItemIndex].id} onClick={handleClickMenuItem}>
            <MenuItem item={filteredMenuItems[currentItemIndex]} quantity={itemQuantities[filteredMenuItems[currentItemIndex].id] || 0} />
          </div>
        )}
        <button onClick={handleNextItem}>&gt;</button>
      </div>
    </div>
  )
}

export default MenuList
