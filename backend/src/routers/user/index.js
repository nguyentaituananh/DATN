'use strict'

import express from 'express'
import { authentication, isAdmin } from '../../middlewares/authMiddleware.js'
import userController from '../../controllers/user.controller.js'

const userRouter = express.Router()

// All user routes require authentication
userRouter.use(authentication)

// Customer routes
userRouter.get('/profile', userController.getProfile)
userRouter.put('/profile', userController.updateProfile)
userRouter.put('/change-password', userController.changePassword)

// Admin routes
userRouter.get('/', isAdmin, userController.getAllUsers)
userRouter.get('/:userId', isAdmin, userController.getUserById)
userRouter.put('/:userId/toggle-status', isAdmin, userController.toggleUserStatus)
userRouter.delete('/:userId', isAdmin, userController.deleteUser)
userRouter.post('/:userId/send-verification-email', isAdmin, userController.sendVerificationEmail)
userRouter.post('/:userId/reset-password-link', isAdmin, userController.resetPasswordLink)
userRouter.post('/:userId/revoke-sessions', isAdmin, userController.revokeAllSessions)

export default userRouter
