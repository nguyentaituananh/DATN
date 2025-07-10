import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, CartItem, Address } from '../types';
import { useAuth } from './AuthContext';
import { createOrder as apiCreateOrder } from '../api/orderAPI';

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

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        setOrders([]);
        localStorage.setItem('orders', JSON.stringify([]));
      }
    }
  }, [user]);

  const createOrder = async (
    items: CartItem[],
    shippingAddress: Address,
    billingAddress: Address,
    paymentMethod: string
  ): Promise<Order> => {
    if (!user || !user.id) throw new Error('User not authenticated');

    const subtotal = items.reduce(
      (sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity,
      0
    );
    const shipping = 15;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const products = items.map(item => ({
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.salePrice || item.product.price
    }));
const orderData = {
  user_id: user.id,
  shipping_address: `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.zipCode}, ${shippingAddress.country}`,
  billing_address: `${billingAddress.street}, ${billingAddress.city}, ${billingAddress.state}, ${billingAddress.zipCode}, ${billingAddress.country}`,
  order_date: new Date().toISOString(),
  status: 'pending',
  products,
};
    console.log("🚀 Sending order to backend:", orderData);

    const response = await apiCreateOrder(orderData);

    if (!response || !response.data) {
      throw new Error("Không nhận được dữ liệu từ API");
    }

    const newOrder: Order = {
      ...response.data,
      shippingAddress,
      billingAddress,
      paymentMethod,
      subtotal,
      shipping,
      tax,
      total
    };

    setOrders(prev => [...prev, newOrder]);

    return newOrder;
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
