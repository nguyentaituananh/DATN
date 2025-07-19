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
		const { page = 1, limit = 10, role, is_active } = query
		const filter = {}

		if (role) filter.role = role
		if (is_active !== undefined) filter.is_active = is_active

		const users = await User.find(filter)
			.select('-password -refreshToken')
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 })

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
						'address',
						'phone_number',
						'is_active',
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

		await User.findByIdAndDelete(userId)
		return { message: 'User deleted successfully' }
	}
}

export default UserService
