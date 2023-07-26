// src/App.ts
import React, { useState, useEffect } from "react"
import axios from 'axios'
import MenuList from './MenuList'
import OrderSummary from "../OrderComponents/OrderSummary"
import { MenuType } from "../Types/dataTypes"

const MenuItemApi: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuType[]>([])
  const [orderItems, setOrderItems] = useState<{ item: MenuType; quantity: number }[]>([])
  const [itemQuantities, setItemQuantities] = useState<{ [itemId: number]: number }>({});
  const [orderNumber, setOrderNumber] = useState<number>(0)

  // Function to fetch menu items from API
  useEffect(() => {
    axios.get('http://localhost:3001/menu')
        .then((response) => {
            console.log('Menu Items: ', response.data)
            setMenuItems(response.data)   
        })
        .catch((error) => console.error('Error fetching menu data: ', error))
    
        const uniqueOrderNumber = Date.now()
        setOrderNumber(uniqueOrderNumber)
  }, []) // Empty dependency array ensures this effect runs only once when the component mounts

  const handleQuantityChange = (itemId: number, quantity: number) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: quantity,
    }));
  };

  const getTotalPrice = (): string => {
    let total = 0
    for (const orderItem of orderItems) {
      total += orderItem.item.price * orderItem.quantity
    }
    return total.toFixed(2)
  }
  

  const handleAddToOrder = (item: MenuType) => {
    // check if item is already in the Order Summary
    const isItemInOrder = orderItems.some((orderItem) => orderItem.item.itemName === item.itemName)
    
    if (!isItemInOrder) {
      setOrderItems((prevOrderItems) => [...prevOrderItems, { item, quantity: 1}])
    }
  }

  const handleRemoveItem = (item: MenuType) => {
    setOrderItems((prevOrderItems) => prevOrderItems.filter((orderItem) => orderItem.item.itemName !== item.itemName))
  }
  

  const handleIncreaseQuantity = (item: MenuType) => {
    setOrderItems((prevOrderItems) =>
      prevOrderItems.map((orderItem) => {
        if (orderItem.item.id === item.id) {
          return { ...orderItem, quantity: orderItem.quantity + 1 }
        }
        return orderItem
      })
    )
  }

  const handleDecreaseQuantity = (item: MenuType) => {
    setOrderItems((prevOrderItems) =>
      prevOrderItems.map((orderItem) => {
        if (orderItem.item.id === item.id && orderItem.quantity > 1) {
          return { ...orderItem, quantity: orderItem.quantity - 1 }
        }
        return orderItem
      })
    )
  }

  return (
    <div>
      <h1>Menu Selection</h1>
      {menuItems.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <MenuList 
            menuItems={menuItems} 
            onAddToOrder={handleAddToOrder}
            itemQuantities={itemQuantities} 
            orderNumber={orderNumber}
            />
          <h2>Total Price: ${getTotalPrice()}</h2>
          <OrderSummary
            orderItems={orderItems}
            onRemoveItem={handleRemoveItem}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
          />
        </>
      )}
    </div>
  )
}

export default MenuItemApi
