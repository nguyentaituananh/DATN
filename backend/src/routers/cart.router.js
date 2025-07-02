
import express from "express";
import { addToCart, clearCart, getCartByUser, removeCartItem, updateCartItem } from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.get("/:userId", getCartByUser);
cartRouter.post("/",addToCart);
cartRouter.put("/:userId/:productId", updateCartItem);
cartRouter.delete("/:userId/:productId", removeCartItem);
cartRouter.delete("/clear/:userId", clearCart);

<<<<<<< HEAD
export default cartRouter;
=======
export default cartRouter;
>>>>>>> 55d107a72aa0df79e9a549e316f81d2abd82a840
