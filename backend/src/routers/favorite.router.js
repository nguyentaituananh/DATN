import express from "express";
import { createFavorite, deleteAllFavoritesByUser, deleteFavorite, getAllFavorites, updateFavorite } from "../controllers/favorites.controller.js";

const favoriteRouter = express.Router();

favoriteRouter.get('/',getAllFavorites),
favoriteRouter.get('/:id',getAllFavorites), // Lấy sản phẩm yêu thích theo ID
favoriteRouter.post('/',createFavorite), // Tạo sản phẩm yêu thích mới
favoriteRouter.put('/:id',updateFavorite), // Cập nhật sản phẩm yêu thích
favoriteRouter.delete('/:id',deleteFavorite) // Xóa sản phẩm yêu thích
favoriteRouter.delete('/:userId',deleteAllFavoritesByUser) // Xóa tất cả sản phẩm yêu thích của người dùng cụ thể


export default favoriteRouter;