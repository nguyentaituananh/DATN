// src/controllers/review.controller.js
import Review from "../models/review.model.js";

export const createReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo đánh giá", error });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user_id").populate("product_id");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách đánh giá", error });
  }
};
