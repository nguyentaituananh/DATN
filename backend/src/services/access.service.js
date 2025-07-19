'use strict'

import bcrypt from 'bcrypt'
import crypto from 'crypto'
import User from '../models/user.model.js'
import { BadRequestError, AuthFailureError, ConflictRequestError } from '../core/error.response.js'
import { getInfoData } from '../utils/index.js'
import { createTokenPair } from '../auth/authUtils.js'
import { generateRefreshToken, generateToken } from '../helpers/jwt.js'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function getNextPrefix(current) {
	const [firstChar, secondChar] = current
	const firstIndex = LETTERS.indexOf(firstChar)
	const secondIndex = LETTERS.indexOf(secondChar)

	if (secondIndex < LETTERS.length - 1) {
		return firstChar + LETTERS[secondIndex + 1]
	}

	if (firstIndex < LETTERS.length - 1) {
		return LETTERS[firstIndex + 1] + 'A'
	}

	throw new Error('Đã đạt giới hạn mã khách hàng (ZZ99999)')
}

class AccessService {
	static generateCustomerCode = async () => {
		const latestUser = await User.findOne({ customer_code: { $exists: true } })
			.sort({ customer_code: -1 })
			.lean()

		if (!latestUser || !latestUser.customer_code) {
			return 'AA00000'
		}

		const prevCode = latestUser.customer_code
		const prefix = prevCode.slice(0, 2)
		const number = parseInt(prevCode.slice(2))
		let newPrefix = prefix
		let newNumber = number + 1

		if (newNumber >= 100000) {
			newPrefix = getNextPrefix(prefix)
			newNumber = 0
		}

		const paddedNumber = String(newNumber).padStart(5, '0')
		return `${newPrefix}${paddedNumber}`
	}

	static signUp = async ({ name, email, password }) => {
		// Step 1: Check email exists
		const holderUser = await User.findOne({ email }).lean()
		if (holderUser) {
			throw new ConflictRequestError('Error: Email đã tồn tại')
		}

		// Step 2: Validate input
		if (!name || !email || !password) {
			throw new BadRequestError('Thiếu các trường bắt buộc: name, email, password')
		}

		// Generate customer code
		const customerCode = await AccessService.generateCustomerCode()

		const newUser = await User.create({
			name,
			email,
			password,
			role: 'customer',
			is_active: true,
			customer_code: customerCode
		})

		if (newUser) {
			// Step 4: Generate tokens
			const accessToken = await generateToken(newUser._id)
			const refreshToken = await generateRefreshToken(newUser._id)

			// Step 5: Save refresh token
			await User.findByIdAndUpdate(newUser._id, {
				refreshToken: refreshToken
			})

			return {
				user: getInfoData({
					fides: ['_id', 'name', 'email', 'role', 'is_active'],
					object: newUser
				}),
				tokens: {
					accessToken
				}
			}
		}

		return null
	}

	static login = async ({ email, password }) => {
		// Step 1: Check email exists
		const foundUser = await User.findOne({ email })
		if (!foundUser) {
			throw new BadRequestError('Người dùng chưa đăng ký')
		}

		// Step 2: Check password
		const match = await foundUser.matchPassword(password)
		if (!match) {
			throw new AuthFailureError('Lỗi xác thực')
		}

		// Step 3: Check if user is active
		if (!foundUser.is_active) {
			throw new AuthFailureError('Tài khoản người dùng đã bị vô hiệu hóa')
		}

		// step 4: generate tokens
		const accessToken = await generateToken(foundUser._id)
		const refreshToken = await generateRefreshToken(foundUser._id)

		// Step 5: Update last login and save refresh token
		await User.findByIdAndUpdate(foundUser._id, {
			lastLogin: new Date(),
			refreshToken: refreshToken
		})

		return {
			user: getInfoData({
				fides: ['_id', 'name', 'email', 'role', 'is_active'],
				object: foundUser
			}),
			tokens: {
				accessToken,
				refreshToken
			}
		}
	}

	static logout = async (keyStore) => {
		// Remove keyStore or refresh token from database
		return { message: 'Đăng xuất thành công' }
	}

	static refreshToken = async ({ refreshToken, user, keyStore }) => {
		const { userId, email } = user

		// Verify refresh token
		if (keyStore.refreshTokensUsed.includes(refreshToken)) {
			// Delete keyStore
			throw new BadRequestError('Có gì đó sai sót! Vui lòng đăng nhập lại')
		}

		if (keyStore.refreshToken !== refreshToken) {
			throw new AuthFailureError('Người dùng chưa đăng ký')
		}

		// Check user exists
		const foundUser = await User.findById(userId)
		if (!foundUser) {
			throw new AuthFailureError('Người dùng chưa đăng ký')
		}

		// Create new tokens
		const tokens = await createTokenPair({ userId, email }, keyStore.publicKey, keyStore.privateKey)

		// Update keyStore
		await keyStore.updateOne({
			$set: { refreshToken: tokens.refreshToken },
			$addToSet: { refreshTokensUsed: refreshToken }
		})

		return {
			user: getInfoData({
				fides: ['_id', 'name', 'email', 'role'],
				object: foundUser
			}),
			tokens
		}
	}
}

export default AccessService
