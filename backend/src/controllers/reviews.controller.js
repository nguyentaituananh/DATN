import Review from "../models/reviews.model.js";

// Lấy tất cả đánh giá
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user_id product_id");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy đánh giá theo ID
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate("user_id product_id");
    if (review) res.json(review);
    else res.status(404).json({ message: "Không tìm thấy đánh giá" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo đánh giá mới
export const createReview = async (req, res) => {
  try {
    const { user_id, product_id, rating, comment } = req.body;
    const newReview = new Review({
      user_id,
      product_id,
      rating,
      comment,
    });
    const saved = await newReview.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật đánh giá
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReview = await Review.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedReview) res.json(updatedReview);
    else res.status(400).json({ message: "Không tìm thấy đánh giá để cập nhật." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa đánh giá
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);
    if (deletedReview) res.json(deletedReview);
    else res.status(400).json({ message: "Không tìm thấy đánh giá để xóa." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
