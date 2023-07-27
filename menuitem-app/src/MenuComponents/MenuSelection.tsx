// src/App.ts
import React, { useState, useEffect } from "react"
import axios from 'axios'
import MenuList from './MenuList'
import OrderSummary from "../OrderComponents/OrderSummary"
import { MenuType, OrderType } from "../Types/dataTypes"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import './MenuStyle.css'

const MenuSelection: React.FC = () => {
  let orderSent = false
  const [menuItems, setMenuItems] = useState<MenuType[]>([])
  const [orderItems, setOrderItems] = useState<{ item: MenuType, quantity: number }[]>([])
  const [itemQuantities, setItemQuantities] = useState<{ [itemId: number]: number }>({})
  const [orderNumber, setOrderNumber] = useState<number>(0) // Unique order number

  // Function to fetch menu items from API
  useEffect(() => {
    axios.get('http://192.168.1.10:3001/menu')
        .then((response) => {
            console.log('Menu Items: ', response.data)
            setMenuItems(response.data)   
        })
        .catch((error) => console.error('Error fetching menu data: ', error))
    const uniqueOrderNumber = Date.now()
    setOrderNumber(uniqueOrderNumber)
  }, []) // Empty dependency array ensures this effect runs only once when the component mounts

  const handleAddToOrder = (item: MenuType) => {
    const existingOrderItem = orderItems.find((orderItem) => orderItem.item.itemName === item.itemName);

    if (existingOrderItem) {
      // If the item is already in the Order Summary, increase its quantity
      setOrderItems((prevOrderItems) =>
        prevOrderItems.map((orderItem) => {
          if (orderItem.item.itemName === item.itemName) {
            return { ...orderItem, quantity: orderItem.quantity + 1 };
          }
          return orderItem;
        })
      );
    } else {
      // If the item is not in the Order Summary, add it with a quantity of 1
      setOrderItems([...orderItems, { item, quantity: 1 }]);
    }
  }

  const getTotalPrice = (): string => {
    let total = 0
    for (const orderItem of orderItems) {
      total += orderItem.item.price * orderItem.quantity
    }
    return total.toFixed(2)
  } 

  const handleIncreaseQuantity = (item: MenuType) => {
    setOrderItems((prevOrderItems) =>
      prevOrderItems.map((orderItem) => {
        if (orderItem.item.itemName === item.itemName) {
          return { ...orderItem, quantity: orderItem.quantity + 1 }
        }
        return orderItem
      })
    )
  }

  const handleDecreaseQuantity = (item: MenuType) => {
    setOrderItems((prevOrderItems) =>
      prevOrderItems.map((orderItem) => {
        if (orderItem.item.itemName === item.itemName && orderItem.quantity > 1) {
          return { ...orderItem, quantity: orderItem.quantity - 1 }
        }
        return orderItem
      })
    )
  }

  const handleRemoveItem = (item: MenuType) => {
    setOrderItems((prevOrderItems) => prevOrderItems.filter((orderItem) => orderItem.item.itemName !== item.itemName))
  } 

  const handlePlaceOrder = async () => {
    if (orderItems.length === 0) {
      // Display a message indicating no items in the Order Summary
      alert('No items have been ordered. Please add items to your order before placing it.');
      return;
    }

    try {
      const payload = orderItems.flatMap((orderItem) => {
        const { item, quantity } = orderItem
        return Array.from({ length: quantity }, () => ({
          id: item.id,
          category: item.category,
          itemName: item.itemName,
          price: item.price
        }))
      })

      console.log(payload)

      const response = await axios.post('http://192.168.1.10:3001/order', payload)
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data)
        orderSent = true
      }
      const orderResponse: OrderType = response.data.data
      // Do something with the orderResponse, like displaying a success message or updating UI
      await checkIsOrderSent(orderSent, orderResponse)

      // After successful submission, reset the orderItems state to an empty array
      setOrderItems([])
    } catch (error) {
      // Handle any errors
      alert(error)
      console.error('Error placing order:', error)
      orderSent = false
    }
  }

  const checkIsOrderSent = async (orderSuccess: boolean, response: OrderType) => {
    if (orderSuccess) {
      let orderNumber = 'Submission in progress... \nOrder #' + response.orderNumber
      let qty = ' - Item Count = ' + response.itemCount
      let successMessage = ', was placed succesfully! You will be charged: $' + getTotalPrice()
      let message = orderNumber + qty + successMessage
        toast.success(<div>{message}</div>, {
          onClose: () => {
            setTimeout(() => {              
            }, 5000)
          }
        })
     } else {
        toast.error('Something went wrong! Try again or contact tech support')
     }
}

  return (
    <div className="menu-selection-container">
      <h1 className="menu-selection-title">Menu Selection</h1>
      {menuItems.length === 0 ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <>
          <MenuList 
            menuItems={menuItems} 
            onAddToOrder={handleAddToOrder}
            itemQuantities={itemQuantities} 
            orderNumber={orderNumber}
            />
          <button className="place-order-button" onClick={handlePlaceOrder}>Place Order</button>
          <h2 className="total-price">Total Price: ${getTotalPrice()}</h2>
          <OrderSummary
            orderItems={orderItems}
            onRemoveItem={handleRemoveItem}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
          />
        </>
      )}
      <ToastContainer/>
    </div>
  )
}

export default MenuSelection
