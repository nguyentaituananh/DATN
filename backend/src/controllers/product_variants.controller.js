'use strict'

import ProductVariantService from '../services/product_variants.service.js'
import { SuccessResponse, CREATED } from '../core/success.response.js'

class ProductVariantController {
  // Tạo biến thể sản phẩm mới
  createProductVariant = async (req, res, next) => {
    try {
      const result = await ProductVariantService.createProductVariant(req.body)

      new CREATED({
        message: 'Tạo biến thể sản phẩm thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }

  // Lấy tất cả biến thể sản phẩm
  getAllProductVariants = async (req, res, next) => {
    try {
      const result = await ProductVariantService.getAllProductVariants(req.query)

      new SuccessResponse({
        message: 'Lấy danh sách biến thể sản phẩm thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }

  // Lấy biến thể sản phẩm theo ID
  getProductVariantById = async (req, res, next) => {
    try {
      const { variantId } = req.params
      const result = await ProductVariantService.getProductVariantById(variantId)

      new SuccessResponse({
        message: 'Lấy biến thể sản phẩm thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }

  // Cập nhật biến thể sản phẩm
  updateProductVariant = async (req, res, next) => {
    try {
      const { variantId } = req.params
      const result = await ProductVariantService.updateProductVariant(variantId, req.body)

      new SuccessResponse({
        message: 'Cập nhật biến thể sản phẩm thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }

  // Xóa biến thể sản phẩm
  deleteProductVariant = async (req, res, next) => {
    try {
      const { variantId } = req.params
      const result = await ProductVariantService.deleteProductVariant(variantId)

      new SuccessResponse({
        message: 'Xóa biến thể sản phẩm thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }
}

export default new ProductVariantController()