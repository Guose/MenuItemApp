// Api POST payload and GET schema
export interface MenuType {
    id: number
    category: string
    itemName: string
    price: number
}

// Api response
export interface OrderType {
    orderNumber: number
    itemCount: number
}