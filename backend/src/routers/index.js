import { Router } from "express";
import authRouter from "./auth.router.js";
import productRouter from "./product.router.js";
import favoriteRouter from "./favorite.router.js";
import cartItemRouter from "./cartItem.router.js";
import cartRouter from "./cart.router.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/api/products", productRouter);
router.use("/favorite", favoriteRouter);
router.use("/cartItem", cartItemRouter);
router.use("/cart", cartRouter);

export default router;
