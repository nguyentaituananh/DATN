import Favorite from "../models/favorites.model.js";
import { favoriteSchema, favoriteUpdateSchema } from "../validates/favorite.validate.js";

// Lấy tất cả favorites
export const getAllFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find()
      .populate("user_id")
      .populate("product_id");
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy 1 favorite theo ID
export const getFavoriteById = async (req, res) => {
  try {
    const favorite = await Favorite.findById(req.params.id)
      .populate("user_id")
      .populate("product_id");
    if (favorite) res.json(favorite);
    else res.status(404).json({ message: "Không tìm thấy sản phẩm yêu thích" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo mới favorite
export const createFavorite = async (req, res) => {
  const { error } = favoriteSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((err) => ({
      field: err.path?.[0] || "null",
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }

  try {
    const { user_id, product_id } = req.body;
    const newFavorite = new Favorite({ user_id, product_id });
    const saved = await newFavorite.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật favorite
export const updateFavorite = async (req, res) => {
  const { error } = favoriteUpdateSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((err) => ({
      field: err.path?.[0] || "null",
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }

  try {
    const { id } = req.params;
    const updatedFavorite = await Favorite.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedFavorite) {
      res.json(updatedFavorite);
    } else {
      res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm yêu thích để cập nhật." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xoá 1 favorite theo id
export const deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFavorite = await Favorite.findByIdAndDelete(id);
    if (deletedFavorite) {
      res.json({ message: "Xóa sản phẩm yêu thích thành công." });
    } else {
      res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm yêu thích để xóa." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xoá tất cả favorite theo user_id
export const deleteAllFavoritesByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await Favorite.deleteMany({ user_id: userId });

    if (result.deletedCount > 0) {
      res.status(200).json({
        message: `Đã xóa tất cả sản phẩm yêu thích của người dùng với id ${userId}.`,
      });
    } else {
      res.status(404).json({
        message: `Không có sản phẩm yêu thích nào của người dùng ${userId} để xóa.`,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
