'use strict'

import mongoose from 'mongoose'

const DOCUMENT_NAME = 'Notification'
const COLLECTION_NAME = 'notifications'

const notificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      description: 'ID người nhận thông báo'
    },
    type: {
      type: String,
      enum: ['order', 'promotion', 'system', 'chat'],
      required: true,
      description: 'Loại thông báo'
    },
    message: {
      type: String,
      required: true,
      description: 'Nội dung thông báo'
    },
    link: {
      type: String,
      default: null,
      description: 'Đường dẫn đến nội dung liên quan'
    },
    is_read: {
      type: Boolean,
      default: false,
      description: 'Thông báo đã đọc hay chưa'
    }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)

// Tạo index để tối ưu tìm kiếm theo user_id và created_at
notificationSchema.index({ user_id: 1, created_at: -1 })

const Notification = mongoose.model(DOCUMENT_NAME, notificationSchema)

export default Notification