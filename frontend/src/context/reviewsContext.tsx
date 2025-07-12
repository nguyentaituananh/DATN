// src/context/reviewContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAllReviews, addReview, deleteReview } from '../api/reviewsApi';

export interface Review {
  id: number;
  customer: string;
  product: string;
  content: string;
  date: string;
}

interface ReviewContextType {
  reviews: Review[];
  fetchReviews: () => void;
  addNewReview: (review: Omit<Review, 'id'>) => void;
  removeReview: (id: number) => void;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchReviews = async () => {
    const res = await getAllReviews();
    setReviews(res.data);
  };

  const addNewReview = async (review: Omit<Review, 'id'>) => {
    await addReview(review);
    fetchReviews();
  };

  const removeReview = async (id: number) => {
    await deleteReview(id);
    fetchReviews();
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <ReviewContext.Provider value={{ reviews, fetchReviews, addNewReview, removeReview }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = (): ReviewContextType => {
  const context = useContext(ReviewContext);
  if (!context) throw new Error('useReview must be used within a ReviewProvider');
  return context;
};
