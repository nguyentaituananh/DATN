import mongoose from 'mongoose'

const DOCUMENT_NAME = 'Message'
const COLLECTION_NAME = 'messages'

const messageSchema = new mongoose.Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      description: 'ID người gửi',
    },
    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      description: 'ID người nhận',
    },
    content: {
      type: String,
      required: true,
      description: 'Nội dung tin nhắn',
    },
    is_read: {
      type: Boolean,
      default: false,
      description: 'Tin nhắn đã đọc hay chưa',
    },
    sent_at: {
      type: Date,
      default: Date.now,
      description: 'Thời gian gửi',
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
)

// Tạo index để tối ưu tìm kiếm theo sender_id và receiver_id
messageSchema.index({ sender_id: 1, receiver_id: 1 })

const Message = mongoose.model(DOCUMENT_NAME, messageSchema)

export default Message