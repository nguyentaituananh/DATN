import express from "express";
import {
  addCartItem,
  deleteCartItem,
  getItemsByCartId,
} from "../../controllers/cartItem.controller.js";
import { updateCartItem } from "../../controllers/cart.controller.js";

const cartItemRouter = express.Router();
cartItemRouter.post("/", addCartItem);
cartItemRouter.get("/cart/:cart_id", getItemsByCartId);
cartItemRouter.put("/:id", updateCartItem);
cartItemRouter.delete("/:id", deleteCartItem);

export default cartItemRouter;
