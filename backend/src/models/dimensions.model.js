import mongoose from 'mongoose';

const dimensionSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  depth: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Dimension = mongoose.model('Dimension', dimensionSchema);
export default Dimension;
