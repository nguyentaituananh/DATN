import { Router } from 'express'

import authRouter from './auth/index.js'
import userRouter from './user/index.js'
import uploadRouter from './upload/index.js'
import categoryRouter from './category/index.js'
import productRouter from './product/index.js'

const router = Router()

// Authentication routes
router.use('/api/auth', authRouter)

// API routes
router.use('/api/users', userRouter)
router.use('/api/upload', uploadRouter)
router.use('/api/categories', categoryRouter)
router.use('/api/products', productRouter)

export default router
