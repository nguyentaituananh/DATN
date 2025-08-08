import { Router } from 'express'

import authRouter from './auth/index.js'
import userRouter from './user/index.js'
import uploadRouter from './upload/index.js'
import categoryRouter from './category/index.js'
import orderRouter from './order/index.js'
import orderItemRoutes from './orderItem/index.js'
import addressesRouter from './addresses/index.js'
import messageRouter from './message/index.js'
import notificationRouter from './notification/index.js'
import instructionRouter from './instruction/index.js'
import delivery_optionRouter from './delivery_option/index.js'
import product_variantsRouter from './product_variants/index.js'
import productRouter from './product/index.js'
import reviewRouter from './review/index.js'
import cartRouter from './cart/index.js'
import cartItemRouter from './cartItem/index.js'
import favoriteRouter from './favorites/index.js'
import couponRouter from './coupons/index.js'
import statsRouter from './stats/index.js'

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
router.use("api/careInstructions", careInstructionsRouter);
router.use("/api/oderItems", orderItemRouter);
router.use("/api/materials", materialsRouter);
router.use("/api/room", roomRouter)
router.use("/api/dimension", dimensionRouter)
router.use("/api/deliveryOption", deliveryOptionRouter)
router.use("/api/room", roomRouter);
router.use("/api/dimension", dimensionRouter);
router.use("/api/deliveryOption", deliveryOptionRouter);
router.use("/api/careInstructions", careInstructionsRouter);
router.use("/api/assemblies", assembliesRouter);
router.use("/api/styles", stylesRouter);
router.use("/api/vouchers", voucherRouter);

export default router
