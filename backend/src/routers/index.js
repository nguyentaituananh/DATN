import { Router } from "express";
import categoryRouter from "./category.router.js";
import couponsRouter from "./coupons.router.js";

import cartRouter from "./cart.router.js";
import cartItemRouter from "./cartItem.router.js";

import roomRouter from "./room.router.js";
import dimensionRouter from "./dimension.router.js";
import deliveryOptionRouter from "./deliveryOption.router.js";
import orderItemRouter from "./orderItem.router.js";
import product_variants from "./product_variants.router.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/api/products", productRouter);
router.use("/api/product-variant", product_variants);
router.use("/api/categories", categoryRouter);
router.use("/api/orders", orderRouter);
router.use("/api/coupons", couponsRouter);
router.use("/api/cart", cartRouter);
router.use("/api/cartItem", cartItemRouter);
router.use("/api/room", roomRouter);
router.use("/api/dimension", dimensionRouter);
router.use("/api/deliveryOption", deliveryOptionRouter);
router.use("/api/oderItems", orderItemRouter);

export default router;
