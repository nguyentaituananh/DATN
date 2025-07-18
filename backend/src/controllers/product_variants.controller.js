import ProductVariant from "../models/product_variants.model.js";
import cloudinary from "../config/cloudinary.config.js";
import fs from "fs";

// Thêm variant
export const createVariant = async (req, res) => {
  try {
    let {
      product_id,
      sku,
      price,
      stock_quantity,
      discount_price,
      attributes,
    } = req.body;

    // Kiểm tra bắt buộc
    if (!product_id || !sku || !price || !stock_quantity) {
      return res.status(400).json({ message: "Thiếu trường bắt buộc" });
    }

    // Chuyển đổi kiểu dữ liệu
    price = Number(price);
    stock_quantity = Number(stock_quantity);
    if (discount_price) discount_price = Number(discount_price);

    // Upload ảnh nếu có
    const images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "product_variants",
        });
        images.push(result.secure_url);
        fs.unlinkSync(file.path); // Xoá ảnh tạm
      }
    }

    const newVariant = new ProductVariant({
      product_id,
      sku,
      price,
      stock_quantity,
      discount_price,
      attributes,
      images,
    });

    const savedVariant = await newVariant.save();
    res.status(201).json(savedVariant);
  } catch (error) {
    console.error("Lỗi khi tạo variant:", error);
    res.status(500).json({ message: "Lỗi khi tạo variant" });
  }
};

// Lấy tất cả variant
export const getAllVariants = async (req, res) => {
  try {
    const variants = await ProductVariant.find()
    .populate("product_id", "name");
    res.status(200).json(variants);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách variant" });
  }
};

// Lấy variant theo ID
export const getVariantById = async (req, res) => {
  try {
    const variant = await ProductVariant.findById(req.params.id);
    if (!variant)
      return res.status(404).json({ message: "Không tìm thấy variant" });
    res.status(200).json(variant);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy variant" });
  }
};

// Cập nhật variant
export const updateVariant = async (req, res) => {
  try {
    const updatedVariant = await ProductVariant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedVariant)
      return res
        .status(404)
        .json({ message: "Không tìm thấy variant để cập nhật" });
    res.status(200).json(updatedVariant);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật variant" });
  }
};

// Xóa variant
export const deleteVariant = async (req, res) => {
  try {
    const deletedVariant = await ProductVariant.findByIdAndDelete(
      req.params.id
    );
    if (!deletedVariant)
      return res.status(404).json({ message: "Không tìm thấy variant để xóa" });
    res.status(200).json({ message: "Đã xóa variant thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa variant" });
  }
};
