import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  sku: { type: String, required: true },
  attributes: { type: Object },
  price: { type: Number, required: true },
  stock_quantity: { type: Number, required: true },
  discount_price: { type: Number },
  images:{ type: [String], default: [] },
  is_active: { type: Boolean, default: true },
});

const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);
export default ProductVariant;
