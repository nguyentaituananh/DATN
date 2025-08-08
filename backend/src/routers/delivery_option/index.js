'use strict'

import express from 'express'
import delivery_optionController from '../../controllers/delivery_option.controller.js'

const router = express.Router()

// Tạo tùy chọn giao hàng mới
router.post('/', delivery_optionController.createDeliveryOption)

// Lấy tất cả tùy chọn giao hàng
router.get('/', delivery_optionController.getAllDeliveryOptions)

// Lấy tùy chọn giao hàng theo ID
router.get('/:deliveryOptionId', delivery_optionController.getDeliveryOptionById)

// Cập nhật tùy chọn giao hàng
router.patch('/:deliveryOptionId', delivery_optionController.updateDeliveryOption)

// Xóa tùy chọn giao hàng
router.delete('/:deliveryOptionId', delivery_optionController.deleteDeliveryOption)

export default router