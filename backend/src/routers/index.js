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
router.use('/api/order', orderRouter)
router.use('/api/order-items', orderItemRoutes)
router.use('/api/products', productRouter)
router.use('api/review', reviewRouter)
router.use('/api/cart', cartRouter)
router.use('/api/cartItem', cartItemRouter)
router.use('api/favorites', favoriteRouter)
router.use('/api/coupons', couponRouter)

export default router