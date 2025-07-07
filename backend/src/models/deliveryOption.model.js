import mongoose from 'mongoose';

const deliveryOptionSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  method: {
    type: String,
    required: true,
    trim: true
  },
  fee: {
    type: Number,
    required: true
  },
  estimated_days: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const DeliveryOption = mongoose.model('DeliveryOption', deliveryOptionSchema);
export default DeliveryOption;
