import { Router } from "express";
import categoryRouter from "./category.router.js";
import couponsRouter from "./coupons.router.js";
import cartRouter from "./cart/cart.router.js";
import deliveryOptionRouter from "./deliveryOption.router.js";
import orderItemRouter from "./order/orderItem.router.js";
import authRouter from "./access/auth.router.js";
import productRouter from "./product/products.router.js";
import product_variants from "./product/product_variants.router.js";
import orderRouter from "./order/order.router.js";
import cartItemRouter from "./cart/cartItem.router.js";
const router = Router();

router.use("/auth", authRouter);
router.use("/api/products", productRouter);
router.use("/api/product-variant", product_variants);
router.use("/api/categories", categoryRouter);
router.use("/api/orders", orderRouter);
router.use("/api/coupons", couponsRouter);
router.use("/api/cart", cartRouter);
router.use("/api/cartItem", cartItemRouter);
router.use("/api/deliveryOption", deliveryOptionRouter);
router.use("/api/oderItems", orderItemRouter);

export default router;
