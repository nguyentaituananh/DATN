// 'use strict'

// import PaymentService from '../services/payment.service.js'
// import { SuccessResponse, CREATED } from '../core/success.response.js'

// class PaymentController {
//   // Tạo thanh toán mới
//   createPayment = async (req, res, next) => {
//     try {
//       const result = await PaymentService.createPayment(req.body)

//       new CREATED({
//         message: 'Tạo thanh toán thành công',
//         metadata: result
//       }).send(res)
//     } catch (error) {
//       next(error)
//     }
//   }

//   // Lấy tất cả thanh toán
//   getAllPayments = async (req, res, next) => {
//     try {
//       const result = await PaymentService.getAllPayments(req.query)

//       new SuccessResponse({
//         message: 'Lấy danh sách thanh toán thành công',
//         metadata: result
//       }).send(res)
//     } catch (error) {
//       next(error)
//     }
//   }

//   // Lấy thanh toán theo ID
//   getPaymentById = async (req, res, next) => {
//     try {
//       const { paymentId } = req.params
//       const result = await PaymentService.getPaymentById(paymentId)

//       new SuccessResponse({
//         message: 'Lấy thanh toán thành công',
//         metadata: result
//       }).send(res)
//     } catch (error) {
//       next(error)
//     }
//   }

//   // Cập nhật thanh toán
//   updatePayment = async (req, res, next) => {
//     try {
//       const { paymentId } = req.params
//       const result = await PaymentService.updatePayment(paymentId, req.body)

//       new SuccessResponse({
//         message: 'Cập nhật thanh toán thành công',
//         metadata: result
//       }).send(res)
//     } catch (error) {
//       next(error)
//     }
//   }

//   // Xóa thanh toán
//   deletePayment = async (req, res, next) => {
//     try {
//       const { paymentId } = req.params
//       const result = await PaymentService.deletePayment(paymentId)

//       new SuccessResponse({
//         message: 'Xóa thanh toán thành công',
//         metadata: result
//       }).send(res)
//     } catch (error) {
//       next(error)
//     }
//   }
// }

// export default new PaymentController()