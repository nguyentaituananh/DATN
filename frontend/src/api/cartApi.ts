import axios from 'axios';
const API_URL = 'http://localhost:5000/carts';

export const getCart = (userId: string) => {
  return axios.get(`${API_URL}?user_id=${userId}`);
};


export const addToCartApi = async ({
  userId,
  productId,
  quantity
}: {
  userId: string;
  productId: string;
  quantity: number;
}) => {
  return await axios.post(`http://localhost:5000/api/cart/add`, {
    userId,
    productId,
    quantity
  });
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
