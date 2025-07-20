'use strict'

import mongoose from 'mongoose'

const DOCUMENT_NAME = 'Instruction'
const COLLECTION_NAME = 'instructions'

const instructionSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      description: 'ID của sản phẩm'
    },
    content: {
      type: String,
      required: true,
      description: 'Nội dung hướng dẫn'
    },
    instructions: {
      type: String,
      required: true,
      description: 'Chi tiết hướng dẫn'
    }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)

// Tạo index để tối ưu tìm kiếm theo product_id
instructionSchema.index({ product_id: 1 })

const Instruction = mongoose.model(DOCUMENT_NAME, instructionSchema)

export default Instruction