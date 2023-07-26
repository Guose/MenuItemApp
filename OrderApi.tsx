import { useState } from 'react'
import axios from 'axios'
import { MenuType, OrderType } from '../Types/dataTypes'

const OrderApi = () => {
    const [orderItems, setOrderItems] = useState<{ item: MenuType; quantity: number }[]>([])

    const handlePlaceOrder = async () => {
        try {
          const orderRequestBody = {
            orderNumber: Date.now(), // Assuming orderNumber is unique and generated based on the timestamp
            itemCount: orderItems.length,
            menuItems: orderItems.map((orderItem) => ({
              id: orderItem.item.id,
              quantity: orderItem.quantity,
            })),
          };
    
          const response = await axios.post<OrderType>('http://localhost:3001/order', orderRequestBody);
          const orderResponse: OrderType = response.data;
          // Do something with the orderResponse, like displaying a success message or updating UI
    
          // After successful submission, reset the orderItems state to an empty array
          setOrderItems([]);
        } catch (error) {
          console.error('Error placing order:', error);
          // Handle any errors that occurred during the request, like showing an error message
        }
      };

    return (
        <div>
            <button onClick={handlePlaceOrder}>Place Order</button> {/* Button to place the order */}
        </div>
      );
}

export default OrderApi