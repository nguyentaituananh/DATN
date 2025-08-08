import mongoose from 'mongoose';

const DOCUMENT_NAME = 'Address';
const COLLECTION_NAME = 'addresses';

const addressSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, 
    user_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    province: { type: String, required: true }, 
    ward: { type: String, required: true }, 
    street: { type: String, required: true }, 
    is_default: { type: Boolean, default: false }, 
  },
  {
    collection: COLLECTION_NAME, 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, 
  }
);

const Address = mongoose.model(DOCUMENT_NAME, addressSchema);

export default Address;