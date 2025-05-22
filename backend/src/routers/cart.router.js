
import express from "express";
import { addToCart, clearCart, getCartByUser, removeCartItem, updateCartItem } from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.get("/:userId", getCartByUser);
cartRouter.post("/",addToCart);
cartRouter.put("/:userId/:productId", updateCartItem);
cartRouter.delete("/:userId/:productId", removeCartItem);
cartRouter.delete("/clear/:userId", clearCart);

export default cartRouter;
