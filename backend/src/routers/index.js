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
<<<<<<< HEAD
import careInstructionsRouter from "./careInstructions.router.js";
import assembliesRouter from "./assemblies.router.js";


import materialsRouter from "./materials.router.js";


=======

>>>>>>> 4972f81020297a60c800d3060049d31b85e1d23b
import roomRouter from "./room.router.js";
import dimensionRouter from "./dimension.router.js";
import deliveryOptionRouter from "./deliveryOption.router.js";
import orderItemRouter from "./orderItem.router.js";
import product_variants from "./product_variants.router.js";

<<<<<<< HEAD

=======
import materialsRouter from "./materials.router.js";
>>>>>>> 4972f81020297a60c800d3060049d31b85e1d23b
import stylesRouter from "./styles.router.js";
import voucherRouter from "./voucher.router.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/api/products", productRouter);
router.use("/api/product-variant", product_variants);
router.use("/api/categories", categoryRouter);
router.use("/api/orders", orderRouter);
router.use("/api/reviews", reviewRouter);
router.use("/api/favorites", favoriteRouter);
router.use("/api/banners", bannersRouter);
router.use("/api/coupons", couponsRouter);
router.use("/api/cart", cartRouter);
router.use("/api/cartItem", cartItemRouter);
<<<<<<< HEAD
router.use("api/careInstructions", careInstructionsRouter);
router.use("/api/oderItems", orderItemRouter);
router.use("/api/materials", materialsRouter);
router.use("/api/room", roomRouter)
router.use("/api/dimension", dimensionRouter)
router.use("/api/deliveryOption", deliveryOptionRouter)
=======
router.use("/api/room", roomRouter);
router.use("/api/dimension", dimensionRouter);
router.use("/api/deliveryOption", deliveryOptionRouter);
router.use("/api/careInstructions", careInstructionsRouter);
>>>>>>> 4972f81020297a60c800d3060049d31b85e1d23b
router.use("/api/assemblies", assembliesRouter);
router.use("/api/styles", stylesRouter);
router.use("/api/vouchers", voucherRouter);

export default router;
