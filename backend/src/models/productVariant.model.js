import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
  {
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    sku: { type: String, required: true },
    attributes: { type: Object, required: true },
    material_id: { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
    style_id: { type: mongoose.Schema.Types.ObjectId, ref: "Style" },
    room_id: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    price: { type: Number, required: true },
    discount_price: { type: Number, default: null },
    stock_quantity: { type: Number, required: true },
    images: [{ type: String }],
    is_active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("ProductVariant", productVariantSchema);
