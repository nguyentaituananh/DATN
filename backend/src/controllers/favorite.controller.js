import Favorite from "../models/favorite.model.js";

// Lấy danh sách sản phẩm yêu thích của 1 user
export const getFavoritesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.find({ user_id: userId }).populate("product_id");
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Thêm sản phẩm vào danh sách yêu thích
export const addFavorite = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    // Kiểm tra đã tồn tại chưa
    const exists = await Favorite.findOne({ user_id, product_id });
    if (exists) return res.status(400).json({ message: "Sản phẩm đã có trong danh sách yêu thích." });

    const favorite = new Favorite({ user_id, product_id });
    const saved = await favorite.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa sản phẩm khỏi danh sách yêu thích
export const removeFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const deleted = await Favorite.findOneAndDelete({ user_id: userId, product_id: productId });
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy để xóa." });
    res.json({ message: "Đã xóa khỏi danh sách yêu thích." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
