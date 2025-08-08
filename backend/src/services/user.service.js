'use strict'

import bcrypt from 'bcrypt'
import User from '../models/user.model.js'
import { BadRequestError, NotFoundError } from '../core/error.response.js'
import { getInfoData } from '../utils/index.js'

class UserService {
	static updateProfile = async (userId, { name, address, phone_number }) => {
		const user = await User.findById(userId)
		if (!user) {
			throw new NotFoundError('User not found')
		}

		// Update user fields
		if (name) user.name = name
		if (address) user.address = address
		if (phone_number) user.phone_number = phone_number

		await user.save()

		return {
			user: getInfoData({
				fides: ['_id', 'name', 'email', 'customer_code', 'role', 'address', 'phone_number', 'is_active'],
				object: user
			})
		}
	}

	static getProfile = async (userId) => {
		const user = await User.findById(userId).select('-password -refreshToken')
		if (!user) {
			throw new NotFoundError('User not found')
		}

		return {
			user: getInfoData({
				fides: [
					'_id',
					'name',
					'email',
					'customer_code',
					'role',
					'address',
					'phone_number',
					'is_active',
					'verify',
					'lastLogin',
					'createdAt'
				],
				object: user
			})
		}
	}

	static changePassword = async (userId, { currentPassword, newPassword }) => {
		const user = await User.findById(userId)
		if (!user) {
			throw new NotFoundError('User not found')
		}

		// Check current password
		const isMatch = await bcrypt.compare(currentPassword, user.password)
		if (!isMatch) {
			throw new BadRequestError('Current password is incorrect')
		}

		// Hash new password
		const hashedPassword = await bcrypt.hash(newPassword, 10)
		user.password = hashedPassword
		await user.save()

		return { message: 'Password changed successfully' }
	}

	static getAllUsers = async (query = {}) => {
		const {
			page = 1,
			limit = 10,
			sortBy = 'createdAt',
			sortOrder = 'desc',
			search,
			role,
			is_active,
			verify,
			lastLogin_gte,
			lastLogin_lte
		} = query

		const filter = {}

		if (search) {
			const searchRegex = new RegExp(search, 'i')
			filter.$or = [
				{ name: { $regex: searchRegex } },
				{ email: { $regex: searchRegex } },
				{ customer_code: { $regex: searchRegex } },
				{ phone_number: { $regex: searchRegex } }
			]
		}

		if (role) {
			filter.role = role
		}

		if (is_active !== undefined) {
			filter.is_active = ['true', '1'].includes(String(is_active).toLowerCase())
		}

		if (verify !== undefined) {
			filter.verify = ['true', '1'].includes(String(verify).toLowerCase())
		}

		if (lastLogin_gte || lastLogin_lte) {
			filter.lastLogin = {}
			if (lastLogin_gte) {
				filter.lastLogin.$gte = new Date(lastLogin_gte)
			}
			if (lastLogin_lte) {
				filter.lastLogin.$lte = new Date(lastLogin_lte)
			}
		}

		const sort = {}
		const validSortFields = ['name', 'customer_code', 'lastLogin', 'createdAt']
		if (validSortFields.includes(sortBy)) {
			sort[sortBy] = sortOrder === 'asc' ? 1 : -1
		} else {
			sort.createdAt = -1
		}

		const fieldsToSelect = '-password -refreshToken'

		const users = await User.find(filter)
			.select(fieldsToSelect)
			.sort(sort)
			.limit(limit * 1)
			.skip((page - 1) * limit)

		const total = await User.countDocuments(filter)

		return {
			users: users.map((user) =>
				getInfoData({
					fides: [
						'_id',
						'name',
						'email',
						'customer_code',
						'role',
						'phone_number',
						'is_active',
						'verify',
						'lastLogin',
						'createdAt'
					],
					object: user
				})
			),
			pagination: {
				page: parseInt(page),
				limit: parseInt(limit),
				total,
				pages: Math.ceil(total / limit)
			}
		}
	}

	static toggleUserStatus = async (userId) => {
		const user = await User.findById(userId)
		if (!user) {
			throw new NotFoundError('User not found')
		}

		user.is_active = !user.is_active
		await user.save()

		return {
			user: getInfoData({
				fides: ['_id', 'name', 'email', 'customer_code', 'role', 'is_active'],
				object: user
			})
		}
	}

	static deleteUser = async (userId) => {
		const user = await User.findById(userId)
		if (!user) {
			throw new NotFoundError('User not found')
		}

		// Soft delete
		user.is_active = false
		await user.save()

		return { message: 'User deactivated successfully' }
	}

	static sendVerificationEmail = async (userId) => {
		const user = await User.findById(userId)
		if (!user) {
			throw new NotFoundError('User not found')
		}

		if (user.verify) {
			throw new BadRequestError('User already verified')
		}

		// In a real application, you would send an actual email here.
		// For demonstration, we'll just log a message.
		console.log(`Sending verification email to ${user.email}`)

		return { message: 'Verification email sent successfully (placeholder)' }
	}

	static resetPasswordLink = async (userId) => {
		const user = await User.findById(userId)
		if (!user) {
			throw new NotFoundError('User not found')
		}

		// In a real application, you would generate a unique token and send a reset password link.
		// For demonstration, we'll just log a message.
		console.log(`Sending password reset link to ${user.email}`)

		return { message: 'Password reset link sent successfully (placeholder)' }
	}

	static revokeAllSessions = async (userId) => {
		const user = await User.findById(userId)
		if (!user) {
			throw new NotFoundError('User not found')
		}

		user.refreshToken = [] // Clear all refresh tokens
		await user.save()

		return { message: 'All sessions revoked successfully' }
	}
}

export default UserService
