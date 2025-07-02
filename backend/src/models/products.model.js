import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: [0, "Giá phải lớn hơn hoặc bằng 0"],
    },

    discount_price: {
      type: Number,
      min: [0, "Giá khuyến mãi phải lớn hơn hoặc bằng 0"],
    },

    images: {
      type: [String],
      default: [],
    },

    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    related_products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.virtual("variants", {
  ref: "ProductVariant", // model liên kết
  localField: "_id", // khóa ở bảng này
  foreignField: "product_id", // khóa ở bảng ProductVariant
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
