// 'use strict'

// import Payment from '../models/payment.model.js'
// import Order from '../models/order.model.js'
// import User from '../models/user.model.js'
// import { BadRequestError, NotFoundError, ConflictRequestError } from '../core/error.response.js'
// import { getInfoData } from '../utils/index.js'

// class PaymentService {
//   // Tạo thanh toán mới
//   static createPayment = async ({ order_id, user_id, amount, method, note }) => {
//     try {
//       // Kiểm tra order_id và user_id có tồn tại không
//       const orderExists = await Order.findById(order_id)
//       const userExists = await User.findById(user_id)
//       if (!orderExists || !userExists) {
//         throw new NotFoundError('Đơn hàng hoặc người dùng không tồn tại')
//       }

//       // Kiểm tra số tiền hợp lệ
//       if (!amount || amount <= 0) {
//         throw new BadRequestError('Số tiền thanh toán phải lớn hơn 0')
//       }

//       // Kiểm tra phương thức thanh toán
//       const validMethods = ['credit_card', 'paypal', 'cod', 'momo', 'bank_transfer']
//       if (!validMethods.includes(method)) {
//         throw new BadRequestError('Phương thức thanh toán không hợp lệ')
//       }

//       // Kiểm tra xem đã có thanh toán cho đơn hàng này chưa
//       const existingPayment = await Payment.findOne({ order_id })
//       if (existingPayment) {
//         throw new ConflictRequestError('Đơn hàng đã có thanh toán')
//       }

//       // Tạo thanh toán mới
//       const newPayment = await Payment.create({
//         order_id,
//         user_id,
//         amount,
//         method,
//         status: 'pending',
//         note: note?.trim() || null
//       })

//       return {
//         payment: getInfoData({
//           fides: [
//             '_id',
//             'order_id',
//             'user_id',
//             'amount',
//             'method',
//             'status',
//             'transaction_id',
//             'paid_at',
//             'note',
//             'created_at',
//             'updated_at'
//           ],
//           object: newPayment
//         })
//       }
//     } catch (error) {
//       throw error
//     }
//   }

//   // Lấy tất cả thanh toán
//   static getAllPayments = async (query = {}) => {
//     try {
//       const { page = 1, limit = 10, order_id, user_id, status, search } = query
//       const filter = {}

//       // Filter theo order_id
//       if (order_id) {
//         filter.order_id = order_id
//       }

//       // Filter theo user_id
//       if (user_id) {
//         filter.user_id = user_id
//       }

//       // Filter theo trạng thái
//       if (status) {
//         filter.status = status
//       }

//       // Search theo transaction_id hoặc note
//       if (search) {
//         filter.$or = [
//           { transaction_id: { $regex: search, $options: 'i' } },
//           { note: { $regex: search, $options: 'i' } }
//         ]
//       }

//       const payments = await Payment.find(filter)
//         .populate('order_id', 'order_code')
//         .populate('user_id', 'name')
//         .limit(limit * 1)
//         .skip((page - 1) * limit)
//         .sort({ created_at: -1 })

//       const total = await Payment.countDocuments(filter)

//       return {
//         payments: payments.map((payment) =>
//           getInfoData({
//             fides: [
//               '_id',
//               'order_id',
//               'user_id',
//               'amount',
//               'method',
//               'status',
//               'transaction_id',
//               'paid_at',
//               'note',
//               'created_at',
//               'updated_at'
//             ],
//             object: payment
//           })
//         ),
//         pagination: {
//           page: parseInt(page),
//           limit: parseInt(limit),
//           total,
//           pages: Math.ceil(total / limit)
//         }
//       }
//     } catch (error) {
//       throw error
//     }
//   }

//   // Lấy thanh toán theo ID
//   static getPaymentById = async (paymentId) => {
//     try {
//       const payment = await Payment.findById(paymentId)
//         .populate('order_id', 'order_code')
//         .populate('user_id', 'name')

//       if (!payment) {
//         throw new NotFoundError('Thanh toán không tồn tại')
//       }

//       return {
//         payment: getInfoData({
//           fides: [
//             '_id',
//             'order_id',
//             'user_id',
//             'amount',
//             'method',
//             'status',
//             'transaction_id',
//             'paid_at',
//             'note',
//             'created_at',
//             'updated_at'
//           ],
//           object: payment
//         })
//       }
//     } catch (error) {
//       throw error
//     }
//   }

//   // Cập nhật thanh toán
//   static updatePayment = async (paymentId, updateData) => {
//     try {
//       const { amount, method, status, transaction_id, paid_at, note } = updateData

//       const payment = await Payment.findById(paymentId)
//       if (!payment) {
//         throw new NotFoundError('Thanh toán không tồn tại')
//       }

//       // Kiểm tra số tiền nếu có cập nhật
//       if (amount && amount <= 0) {
//         throw new BadRequestError('Số tiền thanh toán phải lớn hơn 0')
//       }

//       // Kiểm tra phương thức thanh toán nếu có cập nhật
//       if (method) {
//         const validMethods = ['credit_card', 'paypal', 'cod', 'momo', 'bank_transfer']
//         if (!validMethods.includes(method)) {
//           throw new BadRequestError('Phương thức thanh toán không hợp lệ')
//         }
//       }

//       // Kiểm tra trạng thái nếu có cập nhật
//       if (status) {
//         const validStatuses = ['pending', 'completed', 'failed', 'refunded']
//         if (!validStatuses.includes(status)) {
//           throw new BadRequestError('Trạng thái thanh toán không hợp lệ')
//         }
//       }

//       // Cập nhật thanh toán
//       const updatedPayment = await Payment.findByIdAndUpdate(
//         paymentId,
//         {
//           ...(amount && { amount }),
//           ...(method && { method }),
//           ...(status && { status }),
//           ...(transaction_id !== undefined && { transaction_id: transaction_id || null }),
//           ...(payment fie_at !== undefined && { paid_at: paid_at || null }),
//           ...(note !== undefined && { note: note?.trim() || null })
//         },
//         { new: true }
//       )
//         .populate('order_id', 'order_code')
//         .populate('user_id', 'name')

//       return {
//         payment: getInfoData({
//           fides: [
//             '_id',
//             'order_id',
//             'user_id',
//             'amount',
//             'method',
//             'status',
//             'transaction_id',
//             'paid_at',
//             'note',
//             'created_at',
//             'updated_at'
//           ],
//           object: updatedPayment
//         })
//       }
//     } catch (error) {
//       throw error
//     }
//   }

//   // Xóa thanh toán
//   static deletePayment = async (paymentId) => {
//     try {
//       const payment = await Payment.findById(paymentId)
//       if (!payment) {
//         throw new NotFoundError('Thanh toán không tồn tại')
//       }

//       // Kiểm tra trạng thái thanh toán
//       if (payment.status === 'completed' || payment.status === 'refunded') {
//         throw new BadRequestError('Không thể xóa thanh toán đã hoàn thành hoặc đã hoàn tiền')
//       }

//       await Payment.findByIdAndDelete(paymentId)

//       return { message: 'Xóa thanh toán thành công' }
//     } catch (error) {
//       throw error
//     }
//   }
// }

// export default PaymentService