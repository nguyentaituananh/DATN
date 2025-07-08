// src/api/reviewApi.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/reviews';

export const getAllReviews = () => axios.get(API_URL);

export const addReview = (data: {
  customer: string;
  product: string;
  content: string;
  date: string;
}) => axios.post(API_URL, data);

export const deleteReview = (id: number) => axios.delete(`${API_URL}/${id}`);
