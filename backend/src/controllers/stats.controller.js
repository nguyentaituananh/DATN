'use strict'

import StatsService from '../services/stats.service.js'
import { SuccessResponse } from '../core/success.response.js'

class StatsController {
	getBestSellingProducts = async (req, res, next) => {
		try {
			const { limit } = req.query
			const result = await StatsService.getBestSellingProducts({ limit })
			new SuccessResponse({
				message: 'Lấy sản phẩm bán chạy nhất thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	getCustomerOverviewStats = async (req, res, next) => {
		try {
			const { startDate, endDate } = req.query
			const result = await StatsService.getCustomerOverviewStats({ startDate, endDate })

			new SuccessResponse({
				message: 'Lấy thống kê tổng quan khách hàng thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	getNewCustomersByTime = async (req, res, next) => {
		try {
			const { startDate, endDate, interval } = req.query
			const result = await StatsService.getNewCustomersByTime({ startDate, endDate, interval })

			new SuccessResponse({
				message: 'Lấy thống kê khách hàng mới theo thời gian thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	getVerificationStatusDistribution = async (req, res, next) => {
		try {
			const result = await StatsService.getVerificationStatusDistribution()

			new SuccessResponse({
				message: 'Lấy thống kê phân bố trạng thái xác minh thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	getLoginCountsByTime = async (req, res, next) => {
		try {
			const { startDate, endDate, interval } = req.query
			const result = await StatsService.getLoginCountsByTime({ startDate, endDate, interval })

			new SuccessResponse({
				message: 'Lấy thống kê số lần đăng nhập theo thời gian thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	getRoleDistribution = async (req, res, next) => {
		try {
			const result = await StatsService.getRoleDistribution()

			new SuccessResponse({
				message: 'Lấy thống kê phân bố vai trò thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}
}

export default new StatsController()
