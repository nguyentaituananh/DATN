'use strict'

import AccessService from '../services/access.service.js'
import { SuccessResponse, CREATED } from '../core/success.response.js'

class AccessController {
	signUp = async (req, res, next) => {
		try {
			const result = await AccessService.signUp(req.body)

			new CREATED({
				message: 'Đăng ký thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	login = async (req, res, next) => {
		try {
			const result = await AccessService.login(req.body)

			new SuccessResponse({
				message: 'Đăng nhập thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	logout = async (req, res, next) => {
		try {
			const result = await AccessService.logout(req.keyStore)

			new SuccessResponse({
				message: 'Đăng xuất thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	refreshToken = async (req, res, next) => {
		try {
			const result = await AccessService.refreshToken({
				refreshToken: req.refreshToken,
				user: req.user,
				keyStore: req.keyStore
			})

			new SuccessResponse({
				message: 'Lấy token thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}
}

export default new AccessController()
