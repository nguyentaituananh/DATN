import { Router } from "express";
import authRouter from "./auth.router.js";
import productRouter from "./products.router.js";
import favoriteRouter from "./favorite.router.js"; 
import bannersRouter from "./banners.router.js";
import couponsRouter from "./coupons.router.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/api/products", productRouter);
router.use("/api/favorites", favoriteRouter); 
router.use("/api/banners", bannersRouter); 
router.use("/api/coupons", couponsRouter);
export default router;
