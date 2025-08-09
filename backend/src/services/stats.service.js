'use strict'

import OrderItem from '../models/orderItem.model.js'
import Product from '../models/product.model.js'
import User from '../models/user.model.js'

class StatsService {
	static getBestSellingProducts = async ({ limit = 5 }) => {
		const bestSellingProducts = await OrderItem.aggregate([
			{
				$group: {
					_id: '$product',
					totalQuantitySold: { $sum: '$quantity' }
				}
			},
			{
				$sort: { totalQuantitySold: -1 }
			},
			{
				$limit: parseInt(limit, 10)
			},
			{
				$lookup: {
					from: 'products',
					localField: '_id',
					foreignField: '_id',
					as: 'productDetails'
				}
			},
			{
				$unwind: '$productDetails'
			},
			{
				$project: {
					_id: 1,
					name: '$productDetails.name',
					thumb: '$productDetails.thumb',
					stock: '$productDetails.quantity',
					totalQuantitySold: 1
				}
			}
		])

		return bestSellingProducts
	}
	static getCustomerOverviewStats = async ({ startDate, endDate }) => {
		// Calculate total number of customers
		const totalCustomers = await User.countDocuments()
		// Calculate number of active customers
		const activeCustomers = await User.countDocuments({ is_active: true })
		// Calculate number of verified customers
		const verifiedCustomers = await User.countDocuments({ verify: true })

		// Calculate number of new customers within a date range
		const newCustomersQuery = {}
		if (startDate) {
			newCustomersQuery.createdAt = { $gte: new Date(startDate) }
		}
		if (endDate) {
			// Use $lte only if $gte is already defined
			newCustomersQuery.createdAt = newCustomersQuery.createdAt
				? { ...newCustomersQuery.createdAt, $lte: new Date(endDate) }
				: { $lte: new Date(endDate) }
		}
		const newCustomers = await User.countDocuments(newCustomersQuery)

		// Calculate role distribution (admin vs customer)
		const roleDistribution = await User.aggregate([
			{
				$group: {
					_id: '$role',
					count: { $sum: 1 }
				}
			}
		])

		// Transform role distribution result to a more convenient format
		const roleStats = roleDistribution.reduce(
			(acc, item) => {
				acc[item._id] = item.count
				return acc
			},
			{ admin: 0, customer: 0 }
		)

		return {
			// Total number of customers
			totalCustomers,
			// Number of active customers
			activeCustomers,
			// Number of verified customers
			verifiedCustomers,
			// Number of new customers
			newCustomers,
			// Role distribution statistics
			roleStats
		}
	}

	static getNewCustomersByTime = async ({ startDate, endDate, interval }) => {
		// Implementation for fetching new customers by time interval (day, week, month)
		const group = {
			$dateToString: {
				date: '$createdAt',
				format: interval === 'week' ? '%Y-%U' : interval === 'month' ? '%Y-%m' : '%Y-%m-%d' // Default to day
			}
		}

		const result = await User.aggregate([
			{
				$match: {
					createdAt: {
						$gte: startDate ? new Date(startDate) : new Date(new Date().setDate(new Date().getDate() - 30)), // Default to 30 days ago
						$lte: endDate ? new Date(endDate) : new Date()
					}
				}
			},
			{
				$group: {
					_id: group,
					count: { $sum: 1 }
				}
			},
			{
				$sort: { _id: 1 }
			}
		])

		return result.map(item => ({ time: item._id, count: item.count }))
	}

	static getVerificationStatusDistribution = async () => {
		// Implementation for fetching verification status distribution
		const verifiedCount = await User.countDocuments({ verify: true })
		const unverifiedCount = await User.countDocuments({ verify: false })

		return [
			{ label: 'Verified', value: verifiedCount },
			{ label: 'Unverified', value: unverifiedCount }
		]
	}

	static getLoginCountsByTime = async ({ startDate, endDate, interval }) => {
		// Implementation for fetching login counts by time interval (day, week)
		const group = {
			$dateToString: {
				date: '$lastLogin',
				format: interval === 'week' ? '%Y-%U' : '%Y-%m-%d' // Default to day
			}
		}

		const result = await User.aggregate([
			{
				$match: {
					lastLogin: {
						$gte: startDate ? new Date(startDate) : new Date(new Date().setDate(new Date().getDate() - 30)), // Default to 30 days ago
						$lte: endDate ? new Date(endDate) : new Date()
					}
				}
			},
			{
				$group: {
					_id: group,
					count: { $sum: 1 }
				}
			},
			{
				$sort: { _id: 1 }
			}
		])

		return result.map(item => ({ time: item._id, count: item.count }))
	}

	static getRoleDistribution = async () => {
		// Implementation for fetching role distribution
		const roleDistribution = await User.aggregate([
			{
				$group: {
					_id: '$role',
					count: { $sum: 1 }
				}
			}
		])

		return roleDistribution.map(item => ({ label: item._id, value: item.count }))
	}
}

export default StatsService
