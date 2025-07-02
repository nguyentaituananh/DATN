import { Router } from "express";
import authRouter from "./auth.router.js";
<<<<<<< HEAD
import productRouter from "./product.router.js";
import favoriteRouter from "./favorite.router.js";
import cartItemRouter from "./cartItem.router.js";
import cartRouter from "./cart.router.js";
import roomRouter from "./room.router.js";
import dimensionRouter from "./dimension.router.js";
import deliveryOptionRouter from "./deliveryOption.route.js";
import careInstructionsRouter from "./careInstructions.router.js";
import assembliesRouter from "./assemblies.router.js";
import orderItemRouter from "./orderItem.router.js";
import productVariantRouter from "./productVariant.router.js";
=======
import productRouter from "./products.router.js";
import categoryRouter from "./category.router.js";
import orderRouter from "./order.router.js";
import reviewRouter from "./review.router.js";
import favoriteRouter from "./favorite.router.js";
import bannersRouter from "./banners.router.js";
import couponsRouter from "./coupons.router.js";

import cartRouter from "./cart.router.js";
import cartItemRouter from "./cartItem.router.js";
import roomRouter from "./room.router.js";
import dimensionRouter from "./dimension.router.js";
import deliveryOptionRouter from "./deliveryOption.router.js";
import careInstructionsRouter from "./careInstructions.router.js";
import assembliesRouter from "./assemblies.router.js";
import orderItemRouter from "./orderItem.router.js";
import product_variants from "./product_variants.router.js";

>>>>>>> 55d107a72aa0df79e9a549e316f81d2abd82a840
import materialsRouter from "./materials.router.js";
import stylesRouter from "./styles.router.js";
const router = Router();

router.use("/auth", authRouter);
router.use("/api/products", productRouter);
<<<<<<< HEAD
router.use("/favorite", favoriteRouter);
router.use("/cartItem", cartItemRouter);

router.use("/cart", cartRouter);

router.use("/room", roomRouter)
router.use("/dimension", dimensionRouter)
router.use("/deliveryOption", deliveryOptionRouter)
router.use("/api/cart", cartRouter);
router.use("/api/cartItem", cartItemRouter);
router.use("api/careInstructions", careInstructionsRouter);
router.use("/api/assemblies", assembliesRouter);
router.use("/api/oderItems", orderItemRouter);

router.use("/api/product-variants", productVariantRouter);
router.use("/api/materials", materialsRouter);
=======
router.use("/api/product-variant", product_variants);
router.use("/api/categories", categoryRouter);
router.use("/api/orders", orderRouter);
router.use("/api/reviews", reviewRouter);
router.use("/api/favorites", favoriteRouter);
router.use("/api/banners", bannersRouter);
router.use("/api/coupons", couponsRouter);
router.use("/api/cart", cartRouter);
router.use("/api/cartItem", cartItemRouter);
router.use("/api/room", roomRouter)
router.use("/api/dimension", dimensionRouter)
router.use("/api/deliveryOption", deliveryOptionRouter)
router.use("/api/careInstructions", careInstructionsRouter);
router.use("/api/assemblies", assembliesRouter);
router.use("/api/oderItems", orderItemRouter);
router.use("/api/materials", materialsRouter);
router.use("/api/styles", stylesRouter);
>>>>>>> 55d107a72aa0df79e9a549e316f81d2abd82a840

export default router;
