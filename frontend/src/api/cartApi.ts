import axios from 'axios';
const API_URL = 'http://localhost:5000/carts';

export const getCart = (userId: string) => {
  return axios.get(`${API_URL}?user_id=${userId}`);
};


export const addToCartApi = (data: {
  user_id: string;
  product_id: string;
  quantity: number;
}) => {
  return axios.post(API_URL, data);
};

export const updateCartItemApi = (
  userId: string,
  productId: string,
  quantity: number
) => {
  return axios.put(`${API_URL}/${userId}/${productId}`, { quantity });
};

export const removeCartItemApi = (userId: string, productId: string) => {
  return axios.delete(`${API_URL}/${userId}/${productId}`);
};

export const clearCartApi = (userId: string) => {
  return axios.delete(`${API_URL}/${userId}`);
};
