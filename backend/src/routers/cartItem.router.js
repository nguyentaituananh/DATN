import express from "express";
<<<<<<< HEAD
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
=======
import { addCartItem, deleteCartItem, getItemsByCartId } from "../controllers/cartItem.controller.js";
import { updateCartItem } from "../controllers/cart.controller.js";


const cartItemRouter = express.Router();
cartItemRouter.post("/", addCartItem);
cartItemRouter.get("/cart/:cart_id", getItemsByCartId);
cartItemRouter.put("/:id", updateCartItem);
cartItemRouter.delete("/:id", deleteCartItem);

export default cartItemRouter;
>>>>>>> 55d107a72aa0df79e9a549e316f81d2abd82a840
