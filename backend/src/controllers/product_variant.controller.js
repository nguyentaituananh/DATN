'use strict'

import ProductVariantService from '../services/product_variants.service.js'
import { OK, CREATED } from '../core/success.response.js'
import asyncHandler from '../helpers/asyncHandler.js'

class ProductVariantController {
  // Tạo biến thể sản phẩm mới
  createProductVariant = asyncHandler(async (req, res, next) => {
    const result = await ProductVariantService.createProductVariant(req.body)

    new CREATED({
      message: 'Tạo biến thể sản phẩm thành công',
      metadata: result
    }).send(res)
  })

  // Lấy tất cả biến thể sản phẩm
  getAllProductVariants = asyncHandler(async (req, res, next) => {
    const result = await ProductVariantService.getAllProductVariants(req.query)

    new OK({
      message: 'Lấy danh sách biến thể sản phẩm thành công',
      metadata: result
    }).send(res)
  })

  // Lấy biến thể sản phẩm theo ID
  getProductVariantById = asyncHandler(async (req, res, next) => {
    const { variantId } = req.params
    const result = await ProductVariantService.getProductVariantById(variantId)

    new OK({
      message: 'Lấy thông tin biến thể sản phẩm thành công',
      metadata: result
    }).send(res)
  })

  // Cập nhật biến thể sản phẩm
  updateProductVariant = asyncHandler(async (req, res, next) => {
    const { variantId } = req.params
    const result = await ProductVariantService.updateProductVariant(variantId, req.body)

    new OK({
      message: 'Cập nhật biến thể sản phẩm thành công',
      metadata: result
    }).send(res)
  })

  // Xóa biến thể sản phẩm
  deleteProductVariant = asyncHandler(async (req, res, next) => {
    const { variantId } = req.params
    const result = await ProductVariantService.deleteProductVariant(variantId)

    new OK({
      message: 'Xóa biến thể sản phẩm thành công',
      metadata: result
    }).send(res)
  })
}

export default new ProductVariantController()
