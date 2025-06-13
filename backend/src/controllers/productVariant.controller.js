import ProductVariant from "../models/productVariant.model.js";

// Create
export const createProductVariant = async (req, res) => {
  try {
    const newVariant = new ProductVariant(req.body);
    const savedVariant = await newVariant.save();
    res.status(201).json(savedVariant);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo biến thể sản phẩm", error });
  }
};

// Get all
export const getAllProductVariants = async (req, res) => {
  try {
    const variants = await ProductVariant.find()
      .populate("product_id")
      .populate("material_id")
      .populate("style_id")
      .populate("room_id");
    res.status(200).json(variants);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách biến thể", error });
  }
};

// Get by ID
export const getProductVariantById = async (req, res) => {
  try {
    const variant = await ProductVariant.findById(req.params.id)
      .populate("product_id")
      .populate("material_id")
      .populate("style_id")
      .populate("room_id");
    if (!variant) return res.status(404).json({ message: "Không tìm thấy biến thể" });
    res.status(200).json(variant);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy biến thể", error });
  }
};

// Update
export const updateProductVariant = async (req, res) => {
  try {
    const updated = await ProductVariant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Không tìm thấy biến thể để cập nhật" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật biến thể", error });
  }
};

// Delete
export const deleteProductVariant = async (req, res) => {
  try {
    const deleted = await ProductVariant.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy biến thể để xoá" });
    res.status(200).json({ message: "Xoá biến thể thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xoá biến thể", error });
  }
};
