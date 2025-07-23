'use strict'

import express from 'express'
import product_variantsController from '../../controllers/product_variant.controller.js'

const router = express.Router()

// Tạo biến thể sản phẩm mới
router.post('/', product_variantsController.createProductVariant)

// Lấy tất cả biến thể sản phẩm
router.get('/', product_variantsController.getAllProductVariants)

// Lấy biến thể sản phẩm theo ID
router.get('/:variantId', product_variantsController.getProductVariantById)

// Cập nhật biến thể sản phẩm
router.patch('/:variantId', product_variantsController.updateProductVariant)

// Xóa biến thể sản phẩm
router.delete('/:variantId', product_variantsController.deleteProductVariant)

export default router