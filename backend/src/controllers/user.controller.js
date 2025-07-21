'use strict'

import UserService from '../services/user.service.js'
import { SuccessResponse, CREATED } from '../core/success.response.js'

class UserController {
	updateProfile = async (req, res, next) => {
		try {
			const userId = req.user._id
			const result = await UserService.updateProfile(userId, req.body)

			new SuccessResponse({
				message: 'Cập nhật hồ sơ thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	getProfile = async (req, res, next) => {
		try {
			const userId = req.user._id
			const result = await UserService.getProfile(userId)

			new SuccessResponse({
				message: 'Lấy hồ sơ thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	changePassword = async (req, res, next) => {
		try {
			const userId = req.user._id
			const result = await UserService.changePassword(userId, req.body)

			new SuccessResponse({
				message: 'Đổi mật khẩu thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	getAllUsers = async (req, res, next) => {
		try {
			const result = await UserService.getAllUsers(req.query)

			new SuccessResponse({
				message: 'Lấy danh sách người dùng thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	getUserById = async (req, res, next) => {
		try {
			const { userId } = req.params
			const result = await UserService.getProfile(userId)

			new SuccessResponse({
				message: 'Lấy thông tin người dùng thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	toggleUserStatus = async (req, res, next) => {
		try {
			const { userId } = req.params
			const result = await UserService.toggleUserStatus(userId)

			new SuccessResponse({
				message: 'Cập nhật trạng thái người dùng thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	deleteUser = async (req, res, next) => {
		try {
			const { userId } = req.params
			const result = await UserService.deleteUser(userId)

			new SuccessResponse({
				message: 'Xóa người dùng thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}
}

export default new UserController()
