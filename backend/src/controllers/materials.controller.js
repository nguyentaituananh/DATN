import Material from "../models/materials.model.js";

// Tạo mới chất liệu
export const createMaterial = async (req, res) => {
  try {
    const newMaterial = new Material(req.body);
    const savedMaterial = await newMaterial.save();
    res.status(201).json(savedMaterial);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo chất liệu", error });
  }
};

// Lấy tất cả chất liệu
export const getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách chất liệu", error });
  }
};

// Lấy chất liệu theo ID
export const getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material)
      return res.status(404).json({ message: "Không tìm thấy chất liệu" });
    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy chất liệu", error });
  }
};

// Cập nhật chất liệu
export const updateMaterial = async (req, res) => {
  try {
    const updated = await Material.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Không tìm thấy chất liệu để cập nhật" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật chất liệu", error });
  }
};

// Xoá chất liệu
export const deleteMaterial = async (req, res) => {
  try {
    const deleted = await Material.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Không tìm thấy chất liệu để xoá" });
    res.status(200).json({ message: "Xoá chất liệu thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xoá chất liệu", error });
  }
};
