
import { careInstructionSchema, careInstructionUpdateSchema } from "../validates/careInstructions.validate.js";

export const getAllCareInstructions = async (req, res) => {
  try {
    const careInstructions = await CareInstructions.find().populate("product_id");
    res.status(200).json(careInstructions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCareInstruction = async (req, res) => {
  try {
    const { error } = careInstructionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newCareInstruction = new CareInstructions(req.body);
    const saved = await newCareInstruction.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCareInstruction = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = careInstructionUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updated = await CareInstructions.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy hướng dẫn chăm sóc." });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCareInstruction = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await CareInstructions.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy hướng dẫn chăm sóc." });
    }

    res.status(200).json({ message: "Hướng dẫn chăm sóc đã được xóa thành công." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
