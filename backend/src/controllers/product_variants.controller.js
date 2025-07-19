import ProductVariant from "../models/repositories/product_variants.model.js";

// Thêm variant
export const createVariant = async (req, res) => {
  try {
    const { product_id, sku, price, stock_quantity, attributes } = req.body;
    if (!product_id || !sku || !price || !stock_quantity) {
      return res.status(400).json({ message: "Thiếu trường bắt buộc" });
    }

    const newVariant = new ProductVariant({
      product_id,
      sku,
      price,
      stock_quantity,
      attributes,
    });

    await newVariant.save();
    res.status(201).json(newVariant);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo variant" });
  }
};

// Lấy tất cả variant
export const getAllVariants = async (req, res) => {
  try {
    const variants = await ProductVariant.find();
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
