import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, CartItem, Address } from '../types';
import { useAuth } from './AuthContext';

interface OrderContextType {
  orders: Order[];
  createOrder: (
    items: CartItem[], 
    shippingAddress: Address, 
    billingAddress: Address, 
    paymentMethod: string
  ) => Promise<Order>;
  getOrderById: (orderId: string) => Order | undefined;
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: "order1",
    userId: "user123",
    items: [],
    status: "delivered",
    shippingAddress: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    billingAddress: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    paymentMethod: "credit_card",
    subtotal: 1299.99,
    shipping: 15,
    tax: 130,
    total: 1444.99,
    createdAt: "2023-12-10T14:30:00Z",
    updatedAt: "2023-12-15T09:45:00Z"
  }
];

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // In a real app, this would fetch orders from an API
    // For demo purposes, we're using mock data
    if (user) {
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        setOrders(mockOrders);
        localStorage.setItem('orders', JSON.stringify(mockOrders));
      }
    }
  }, [user]);

  const createOrder = async (
    items: CartItem[],
    shippingAddress: Address,
    billingAddress: Address,
    paymentMethod: string
  ): Promise<Order> => {
    // In a real app, this would make an API call to create the order
    
    // Calculate totals
    const subtotal = items.reduce(
      (sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity, 
      0
    );
    const shipping = 15;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;
    
    // Create new order
    const newOrder: Order = {
      id: `order${Date.now()}`,
      userId: user?.id || "guest",
      items,
      status: "pending",
      shippingAddress,
      billingAddress,
      paymentMethod,
      subtotal,
      shipping,
      tax,
      total,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update state and localStorage
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    return newOrder;
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};