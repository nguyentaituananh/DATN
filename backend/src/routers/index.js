import { Router } from "express";
import authRouter from "./auth.router.js";
import productRouter from "./products.router.js";
import categoryRouter from "./category.router.js";
import orderRouter from "./order.router.js";
import reviewRouter from "./review.router.js";
import favoriteRouter from "./favorite.router.js";
import bannersRouter from "./banners.router.js";
import couponsRouter from "./coupons.router.js";

import cartRouter from "./cart.router.js";
import cartItemRouter from "./cartItem.router.js";


import productVariantRouter from "./productVariant.router.js";
import materialsRouter from "./materials.router.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/api/products", productRouter);
router.use("/api/categories", categoryRouter);
router.use("/api/orders", orderRouter);
router.use("/api/reviews", reviewRouter);
router.use("/api/favorites", favoriteRouter);
router.use("/api/banners", bannersRouter);
router.use("/api/coupons", couponsRouter);
router.use("/cart", cartRouter);
router.use("/cartItem", cartItemRouter);

router.use("/api/product-variants", productVariantRouter);
router.use("/api/materials", materialsRouter);

export default router;
