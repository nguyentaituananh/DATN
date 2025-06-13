import CareInstructions from "../models/careInstructions.model.js"

export const getAllCareInstructions = async (req, res) => {
  try {
    const CareInstructions = await C.find().populate("product_id");
    res.status(200).json(CareInstructions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const creatCareInstruction = async (req, res) => {
  try {
    const { product_id, content } = req.body;
    if (!product_id || !content) {
      return res.status(400).json({ message: "ID sản phẩm và nội dung là bắt buộc." });
    }

    const newCareInstruction = new CareInstructions({
      product_id,
      content
    });

    const savedCareInstruction = await newCareInstruction.save();
    res.status(201).json(savedCareInstruction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateCartIntruction = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Nội dung là bắt buộc" });
    }

    const updatedCareInstruction = await CareInstructions.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    if (!updatedCareInstruction) {
      return res.status(404).json({ message: "Không tìm thấy hướng dẫn chăm sóc." });
    }

    res.status(200).json(updatedCareInstruction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteCareInstruction = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCareInstruction = await CareInstructions.findByIdAndDelete(id);

    if (!deletedCareInstruction) {
      return res.status(404).json({ message: "Không tìm thấy hướng dẫn chăm sóc." });
    }

    res.status(200).json({ message: "Hướng dẫn chăm sóc đã được xóa thành công." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}