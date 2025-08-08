'use strict'

import ProductVariant from '../models/product_variant.model.js'
import Product from '../models/product.model.js'
import { BadRequestError, NotFoundError, ConflictRequestError } from '../core/error.response.js'
import { getInfoData } from '../utils/index.js'

class ProductVariantService {
  // Tạo biến thể sản phẩm mới
  static createProductVariant = async ({ product_id, sku, attributes, price, discount_price, stock_quantity, in_stock, images }) => {
    try {
      // Kiểm tra product_id có tồn tại không
      const productExists = await Product.findById(product_id)
      if (!productExists) {
        throw new NotFoundError('Sản phẩm không tồn tại')
      }

      // Kiểm tra sku có tồn tại không
      const existingVariant = await ProductVariant.findOne({ sku })
      if (existingVariant) {
        throw new ConflictRequestError('Mã SKU đã tồn tại')
      }

      // Kiểm tra các trường bắt buộc
      if (!sku || sku.trim() === '') {
        throw new BadRequestError('Mã SKU không được để trống')
      }
      if (!attributes || Object.keys(attributes).length === 0) {
        throw new BadRequestError('Thuộc tính biến thể không được để trống')
      }
      if (!price || price <= 0) {
        throw new BadRequestError('Giá phải lớn hơn 0')
      }
      if (discount_price !== undefined && discount_price < 0) {
        throw new BadRequestError('Giá khuyến mãi không được nhỏ hơn 0')
      }
      if (stock_quantity === undefined || stock_quantity < 0) {
        throw new BadRequestError('Số lượng tồn kho không được nhỏ hơn 0')
      }
      if (in_stock === undefined) {
        throw new BadRequestError('Trạng thái còn hàng là bắt buộc')
      }

      // Tạo biến thể sản phẩm mới
      const newProductVariant = await ProductVariant.create({
        product_id,
        sku: sku.trim(),
        attributes,
        price,
        discount_price: discount_price || null,
        stock_quantity,
        in_stock,
        images: images || [],
        is_active: true
      })

      return {
        product_variant: getInfoData({
          fides: [
            '_id',
            'product_id',
            'sku',
            'attributes',
            'price',
            'discount_price',
            'stock_quantity',
            'in_stock',
            'images',
            'is_active',
            'date_created',
            'updated_at'
          ],
          object: newProductVariant
        })
      }
    } catch (error) {
      throw error
    }
  }

  // Lấy tất cả biến thể sản phẩm
  static getAllProductVariants = async (query = {}) => {
    try {
      const { page = 1, limit = 10, product_id, search } = query
      const filter = {}

      // Filter theo product_id
      if (product_id) {
        filter.product_id = product_id
      }

      // Search theo sku
      if (search) {
        filter.sku = { $regex: search, $options: 'i' }
      }

      const productVariants = await ProductVariant.find(filter)
        .populate('product_id', 'name')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ date_created: -1 })

      const total = await ProductVariant.countDocuments(filter)

      return {
        product_variants: productVariants.map((variant) =>
          getInfoData({
            fides: [
              '_id',
              'product_id',
              'sku',
              'attributes',
              'price',
              'discount_price',
              'stock_quantity',
              'in_stock',
              'images',
              'is_active',
              'date_created',
              'updated_at'
            ],
            object: variant
          })
        ),
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    } catch (error) {
      throw error
    }
  }

  // Lấy biến thể sản phẩm theo ID
  static getProductVariantById = async (variantId) => {
    try {
      const productVariant = await ProductVariant.findById(variantId)
        .populate('product_id', 'name')

      if (!productVariant) {
        throw new NotFoundError('Biến thể sản phẩm không tồn tại')
      }

      return {
        product_variant: getInfoData({
          fides: [
            '_id',
            'product_id',
            'sku',
            'attributes',
            'price',
            'discount_price',
            'stock_quantity',
            'in_stock',
            'images',
            'is_active',
            'date_created',
            'updated_at'
          ],
          object: productVariant
        })
      }
    } catch (error) {
      throw error
    }
  }

  // Cập nhật biến thể sản phẩm
  static updateProductVariant = async (variantId, updateData) => {
    try {
      const { sku, attributes, price, discount_price, stock_quantity, in_stock, images, is_active } = updateData

      const productVariant = await ProductVariant.findById(variantId)
      if (!productVariant) {
        throw new NotFoundError('Biến thể sản phẩm không tồn tại')
      }

      // Kiểm tra sku nếu có cập nhật
      if (sku && sku.trim() !== productVariant.sku) {
        const existingVariant = await ProductVariant.findOne({ sku: sku.trim(), _id: { $ne: variantId } })
        if (existingVariant) {
          throw new ConflictRequestError('Mã SKU đã tồn tại')
        }
      }

      // Kiểm tra các trường nếu có cập nhật
      if (sku && sku.trim() === '') {
        throw new BadRequestError('Mã SKU không được để trống')
      }
      if (attributes && Object.keys(attributes).length === 0) {
        throw new BadRequestError('Thuộc tính biến thể không được để trống')
      }
      if (price !== undefined && price <= 0) {
        throw new BadRequestError('Giá phải lớn hơn 0')
      }
      if (discount_price !== undefined && discount_price < 0) {
        throw new BadRequestError('Giá khuyến mãi không được nhỏ hơn 0')
      }
      if (stock_quantity !== undefined && stock_quantity < 0) {
        throw new BadRequestError('Số lượng tồn kho không được nhỏ hơn 0')
      }

      // Cập nhật biến thể sản phẩm
      const updatedProductVariant = await ProductVariant.findByIdAndUpdate(
        variantId,
        {
          ...(sku && { sku: sku.trim() }),
          ...(attributes && { attributes }),
          ...(price !== undefined && { price }),
          ...(discount_price !== undefined && { discount_price: discount_price || null }),
          ...(stock_quantity !== undefined && { stock_quantity }),
          ...(in_stock !== undefined && { in_stock }),
          ...(images !== undefined && { images: images || [] }),
          ...(is_active !== undefined && { is_active })
        },
        { new: true }
      ).populate('product_id', 'name')

      return {
        product_variant: getInfoData({
          fides: [
            '_id',
            'product_id',
            'sku',
            'attributes',
            'price',
            'discount_price',
            'stock_quantity',
            'in_stock',
            'images',
            'is_active',
            'date_created',
            'updated_at'
          ],
          object: updatedProductVariant
        })
      }
    } catch (error) {
      throw error
    }
  }

  // Xóa biến thể sản phẩm
  static deleteProductVariant = async (variantId) => {
    try {
      const productVariant = await ProductVariant.findById(variantId)
      if (!productVariant) {
        throw new NotFoundError('Biến thể sản phẩm không tồn tại')
      }

      await ProductVariant.findByIdAndDelete(variantId)

      return { message: 'Xóa biến thể sản phẩm thành công' }
    } catch (error) {
      throw error
    }
  }
}

export default ProductVariantService