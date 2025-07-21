'use strict'

import Instruction from '../models/instructions.model.js'
import Product from '../models/product.model.js'
import { BadRequestError, NotFoundError, ConflictRequestError } from '../core/error.response.js'
import { getInfoData } from '../utils/index.js'

class InstructionService {
  // Tạo hướng dẫn mới
  static createInstruction = async ({ product_id, content, instructions }) => {
    try {
      // Kiểm tra product_id có tồn tại không
      const productExists = await Product.findById(product_id)
      if (!productExists) {
        throw new NotFoundError('Sản phẩm không tồn tại')
      }

      // Kiểm tra nội dung và chi tiết hướng dẫn
      if (!content || content.trim() === '') {
        throw new BadRequestError('Nội dung hướng dẫn không được để trống')
      }
      if (!instructions || instructions.trim() === '') {
        throw new BadRequestError('Chi tiết hướng dẫn không được để trống')
      }

      // Kiểm tra xem sản phẩm đã có hướng dẫn chưa
      const existingInstruction = await Instruction.findOne({ product_id })
      if (existingInstruction) {
        throw new ConflictRequestError('Sản phẩm đã có hướng dẫn')
      }

      // Tạo hướng dẫn mới
      const newInstruction = await Instruction.create({
        product_id,
        content: content.trim(),
        instructions: instructions.trim()
      })

      return {
        instruction: getInfoData({
          fides: ['_id', 'product_id', 'content', 'instructions', 'created_at', 'updated_at'],
          object: newInstruction
        })
      }
    } catch (error) {
      throw error
    }
  }

  // Lấy tất cả hướng dẫn
  static getAllInstructions = async (query = {}) => {
    try {
      const { page = 1, limit = 10, product_id, search } = query
      const filter = {}

      // Filter theo product_id
      if (product_id) {
        filter.product_id = product_id
      }

      // Search theo nội dung hoặc chi tiết hướng dẫn
      if (search) {
        filter.$or = [
          { content: { $regex: search, $options: 'i' } },
          { instructions: { $regex: search, $options: 'i' } }
        ]
      }

      const instructions = await Instruction.find(filter)
        .populate('product_id', 'name')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ created_at: -1 })

      const total = await Instruction.countDocuments(filter)

      return {
        instructions: instructions.map((instruction) =>
          getInfoData({
            fides: ['_id', 'product_id', 'content', 'instructions', 'created_at', 'updated_at'],
            object: instruction
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

  // Lấy hướng dẫn theo ID
  static getInstructionById = async (instructionId) => {
    try {
      const instruction = await Instruction.findById(instructionId)
        .populate('product_id', 'name')

      if (!instruction) {
        throw new NotFoundError('Hướng dẫn không tồn tại')
      }

      return {
        instruction: getInfoData({
          fides: ['_id', 'product_id', 'content', 'instructions', 'created_at', 'updated_at'],
          object: instruction
        })
      }
    } catch (error) {
      throw error
    }
  }

  // Cập nhật hướng dẫn
  static updateInstruction = async (instructionId, updateData) => {
    try {
      const { content, instructions } = updateData

      const instruction = await Instruction.findById(instructionId)
      if (!instruction) {
        throw new NotFoundError('Hướng dẫn không tồn tại')
      }

      // Kiểm tra nội dung nếu có cập nhật
      if (content && content.trim() === '') {
        throw new BadRequestError('Nội dung hướng dẫn không được để trống')
      }

      // Kiểm tra chi tiết hướng dẫn nếu có cập nhật
      if (instructions && instructions.trim() === '') {
        throw new BadRequestError('Chi tiết hướng dẫn không được để trống')
      }

      // Cập nhật hướng dẫn
      const updatedInstruction = await Instruction.findByIdAndUpdate(
        instructionId,
        {
          ...(content && { content: content.trim() }),
          ...(instructions && { instructions: instructions.trim() })
        },
        { new: true }
      ).populate('product_id', 'name')

      return {
        instruction: getInfoData({
          fides: ['_id', 'product_id', 'content', 'instructions', 'created_at', 'updated_at'],
          object: updatedInstruction
        })
      }
    } catch (error) {
      throw error
    }
  }

  // Xóa hướng dẫn
  static deleteInstruction = async (instructionId) => {
    try {
      const instruction = await Instruction.findById(instructionId)
      if (!instruction) {
        throw new NotFoundError('Hướng dẫn không tồn tại')
      }

      await Instruction.findByIdAndDelete(instructionId)

      return { message: 'Xóa hướng dẫn thành công' }
    } catch (error) {
      throw error
    }
  }
}

export default InstructionService