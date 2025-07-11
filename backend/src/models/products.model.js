import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: {
      type: Number,
      min: [0, "Giá phải lớn hơn hoặc bằng 0"],
      default: 0,
    },
    discount_price: { type: Number, min: [0, "Giá KM phải >= 0"] },
    images: { type: [String], default: [] },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    related_products: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: [] },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.virtual("variants", {
  ref: "ProductVariant",
  localField: "_id",
  foreignField: "product_id",
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
