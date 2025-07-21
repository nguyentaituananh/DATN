<<<<<<< HEAD
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
import careInstructionsRouter from "./careInstructions.router.js";
import assembliesRouter from "./assemblies.router.js";
import orderItemRouter from "./orderItem.router.js";
import productVariantRouter from "./product_variants.router.js";
import materialsRouter from "./materials.router.js";
import stylesRouter from "./styles.router.js";
import voucherRouter from "./voucher.router.js";
import roomRouter from "./room.router.js";
import dimensionRouter from "./dimension.router.js";
import deliveryOptionRouter from "./deliveryOption.router.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/api/products", productRouter);
router.use("/api/product-variants", productVariantRouter);
router.use("/api/categories", categoryRouter);
router.use("/api/orders", orderRouter);
router.use("/api/oderItems", orderItemRouter);
router.use("/api/reviews", reviewRouter);
router.use("/api/favorites", favoriteRouter);
router.use("/api/banners", bannersRouter);
router.use("/api/coupons", couponsRouter);
router.use("/api/vouchers", voucherRouter);
router.use("/api/cart", cartRouter);
router.use("/api/cartItem", cartItemRouter);
router.use("/api/careInstructions", careInstructionsRouter);
router.use("/api/assemblies", assembliesRouter);
router.use("/api/materials", materialsRouter);
router.use("/api/styles", stylesRouter);
router.use("/api/room", roomRouter);
router.use("/api/dimension", dimensionRouter);
router.use("/api/deliveryOption", deliveryOptionRouter);

export default router;
=======
import { Router } from 'express'

import authRouter from './auth/index.js'
import userRouter from './user/index.js'
import uploadRouter from './upload/index.js'
import categoryRouter from './category/index.js'
import addressesRouter from './addresses/index.js'
import messageRouter from './message/index.js'
// import paymentRouter from './payment/index.js'
import notificationRouter from './notification/index.js'
import instructionRouter from './instruction/index.js'
import delivery_optionRouter from './delivery_option/index.js'
import product_variantsRouter from './product_variants/index.js'
// Khởi tạo router chính
import productRouter from './product/index.js'

const router = Router()

// Authentication routes
router.use('/api/auth', authRouter)

// API routes
router.use('/api/users', userRouter)
router.use('/api/upload', uploadRouter)
router.use('/api/categories', categoryRouter)
router.use('/api/addresses', addressesRouter)
router.use('/api/message', messageRouter)
// router.use('/api/payment', paymentRouter)
router.use('/api/notification', notificationRouter)
router.use('/api/instructions', instructionRouter)
router.use('/api/delivery-options', delivery_optionRouter)
router.use('/api/product-variants', product_variantsRouter)

router.use('/api/products', productRouter)

export default router
>>>>>>> 75ebfd402da1b70a94ae98a3b99d6758141cad83
