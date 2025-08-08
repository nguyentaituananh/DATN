'use strict'

import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { AuthFailureError, ForBiddenError } from '../core/error.response.js'

// Middleware để verify access token
const authentication = async (req, res, next) => {
	try {
		const authorization = req.headers['authorization']
		if (!authorization) {
			throw new AuthFailureError('Missing authorization header')
		}

		const accessToken = authorization.replace('Bearer ', '')
		if (!accessToken) {
			throw new AuthFailureError('Missing access token')
		}

		console.log(accessToken)

		// Verify access token
		const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)

		const user = await User.findById(decoded.id).select('-password -refreshToken')

		if (!user) {
			throw new AuthFailureError('User not found')
		}

		if (!user.is_active) {
			throw new AuthFailureError('Account is inactive')
		}

		console.log(123)

		req.user = user
		req.userId = decoded.userId
		next()
	} catch (error) {
		next(error)
	}
}

// Middleware để verify refresh token
const authenticationRefreshToken = async (req, res, next) => {
	try {
		const refreshToken = req.headers['x-refresh-token']
		if (!refreshToken) {
			throw new AuthFailureError('Missing refresh token')
		}

		// Verify refresh token
		const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'refresh-secret')
		const user = await User.findById(decoded.userId)

		if (!user) {
			throw new AuthFailureError('User not found')
		}

		if (user.refreshToken !== refreshToken) {
			throw new AuthFailureError('Invalid refresh token')
		}

		req.user = user
		req.refreshToken = refreshToken
		next()
	} catch (error) {
		next(error)
	}
}

// Middleware kiểm tra role admin
const isAdmin = async (req, res, next) => {
	try {
		const user = req.user
		if (!user) {
			throw new AuthFailureError('Authentication required')
		}

		if (user.role !== 'admin') {
			throw new ForBiddenError('Admin access required')
		}

		next()
	} catch (error) {
		next(error)
	}
}

// Middleware kiểm tra role customer
const isCustomer = async (req, res, next) => {
	try {
		const user = req.user
		if (!user) {
			throw new AuthFailureError('Authentication required')
		}

		if (user.role !== 'customer') {
			throw new ForBiddenError('Customer access required')
		}

		next()
	} catch (error) {
		next(error)
	}
}

export { authentication, authenticationRefreshToken, isAdmin, isCustomer }
