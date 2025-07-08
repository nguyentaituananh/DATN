import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

export const getAllOrders = () => {
  return axios.get(API_URL);
};

export const getOrderById = (orderId: string) => {
  return axios.get(`${API_URL}/${orderId}`);
};

export const createOrder = (data: {
  user_id: string;
  shipping_address: string;
  order_date?: string;
  status?: 'pending' | 'shipped' | 'done';
  products: {
    product_id: string;
    quantity: number;
    price: number;
  }[];
}) => {
  return axios.post(API_URL, data);
};

export const updateOrder = (
  orderId: string,
  data: Partial<{
    shipping_address: string;
    order_date: string;
    status: 'pending' | 'shipped' | 'done';
    products: {
      product_id: string;
      quantity: number;
      price: number;
    }[];
  }>
) => {
  return axios.put(`${API_URL}/${orderId}`, data);
};

export const deleteOrder = (orderId: string) => {
  return axios.delete(`${API_URL}/${orderId}`);
};
