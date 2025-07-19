'use strict'

import jwt from 'jsonwebtoken'

const createTokenPair = async (payload, publicKey, privateKey) => {
	try {
		// Access token
		const accessToken = await jwt.sign(payload, publicKey, {
			expiresIn: '2 days'
		})

		// Refresh token
		const refreshToken = await jwt.sign(payload, privateKey, {
			expiresIn: '7 days'
		})

		// Verify token
		jwt.verify(accessToken, publicKey, (err, decode) => {
			if (err) {
				console.error('verify error:', err)
			} else {
				console.log('decode verify:', decode)
			}
		})

		return { accessToken, refreshToken }
	} catch (error) {
		console.error('createTokenPair error:', error)
		throw error
	}
}

const generateTokens = (payload) => {
	const accessSecret = process.env.JWT_ACCESS_SECRET || 'access-secret'
	const refreshSecret = process.env.JWT_REFRESH_SECRET || 'refresh-secret'

	const accessToken = jwt.sign(payload, accessSecret, {
		expiresIn: '15m'
	})

	const refreshToken = jwt.sign(payload, refreshSecret, {
		expiresIn: '7d'
	})

	return { accessToken, refreshToken }
}

const verifyToken = (token, secret) => {
	return jwt.verify(token, secret)
}

export { createTokenPair, generateTokens, verifyToken }
