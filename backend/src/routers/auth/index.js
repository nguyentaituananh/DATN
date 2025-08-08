'use strict'

import express from 'express'
import AccessController from '../../controllers/access.controller.js'
import { authentication, authenticationRefreshToken } from '../../middlewares/authMiddleware.js'

const router = express.Router()

// Authentication routes (public)
router.post('/signup', AccessController.signUp)
router.post('/login', AccessController.login)

// Protected routes (require authentication)
router.use(authentication)
router.post('/logout', AccessController.logout)

// Refresh token route (requires refresh token)
router.post('/refresh-token', authenticationRefreshToken, AccessController.refreshToken)

export default router
