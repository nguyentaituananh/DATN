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
