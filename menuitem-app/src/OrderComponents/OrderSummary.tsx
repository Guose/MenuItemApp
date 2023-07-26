import React, { useState, useEffect } from 'react'
import { MenuType } from '../Types/dataTypes'
import './OrderSummaryStyle.css'

interface OrderSummaryProps {
  orderItems: { item: MenuType; quantity: number }[]
  onRemoveItem: (item: MenuType) => void
  onIncreaseQuantity: (item: MenuType) => void
  onDecreaseQuantity: (item: MenuType) => void
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderItems, onRemoveItem, onIncreaseQuantity, onDecreaseQuantity}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [currentOrderItems, setOrderItems] = useState<{item: MenuType, quantity: number}[]>(orderItems)

  useEffect(() => {
    setOrderItems(orderItems)
  }, [orderItems])

  const handleToggleEdit = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing)
  }

  return (
    <div>
      <h2>Order Summary</h2>
      <div className='edit-button-container'>
        <button className='edit-button' onClick={handleToggleEdit}>
          {isEditing ? 'Save' : 'Edit'}
        </button>       
      </div>
      <table className="order-summary-table">
        <thead>
          <tr>
            <th>Menu Item</th>
            <th>Quantity</th>
            {isEditing && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentOrderItems.slice().reverse().map((orderItem) => (
            <tr key={orderItem.item.id}>
              <td>{orderItem.item.itemName}</td>
              <td>{orderItem.quantity}</td>
              {isEditing && (
                <td className="control-buttons">
                  <button onClick={() => onIncreaseQuantity(orderItem.item)}>+</button>
                  <button onClick={() => onDecreaseQuantity(orderItem.item)}>-</button>
                  <button id='remove-item' onClick={() => onRemoveItem(orderItem.item)}>Remove</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderSummary
