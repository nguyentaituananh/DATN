import express from "express";
import { addCartItem, deleteCartItem, getItemsByCartId } from "../controllers/cartItem.controller";
import { updateCartItem } from "../controllers/cart.controller";


const cartItemRouter = express.Router();

// Thêm mục mới vào giỏ hàng
cartItemRouter.post("/", addCartItem);

// Lấy tất cả mục trong giỏ hàng theo cart_id
cartItemRouter.get("/cart/:cart_id", getItemsByCartId);

// Cập nhật số lượng mục theo id của cart item
cartItemRouter.put("/:id", updateCartItem);

// Xóa mục giỏ hàng theo id
cartItemRouter.delete("/:id", deleteCartItem);

export default cartItemRouter;
