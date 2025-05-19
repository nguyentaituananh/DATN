import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true 
  },
  description: {
    type: String,
    required: true 
  },
  price: {
    type: Number, 
    required: true 
  },
  discount_price: {
    type:Number
  },
  images: [String],
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  related_products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product' }],
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
