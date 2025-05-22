import Review from "../models/review.model.js";

// Tạo đánh giá mới
export const createReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo đánh giá", error });
  }
};

// Lấy tất cả đánh giá
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user_id")
      .populate("product_id");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách đánh giá", error });
  }
};

// Lấy đánh giá theo ID
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("user_id")
      .populate("product_id");
    if (!review) return res.status(404).json({ message: "Không tìm thấy đánh giá" });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy đánh giá", error });
  }
};

// Cập nhật đánh giá
export const updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReview) return res.status(404).json({ message: "Không tìm thấy đánh giá để cập nhật" });
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật đánh giá", error });
  }
};

// Xoá đánh giá
export const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ message: "Không tìm thấy đánh giá để xoá" });
    res.status(200).json({ message: "Xoá đánh giá thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xoá đánh giá", error });
  }
};
