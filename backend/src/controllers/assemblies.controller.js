import Assemblies from "../models/assemblies.model.js";
import { assemblySchema, assemblyUpdateSchema } from "../validates/assemblies.validate.js";

export const getAssemblies = async (req, res) => {
  try {
    const assemblies = await Assemblies.find().populate("product_id");
    res.status(200).json(assemblies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAssembly = async (req, res) => {
  try {
    const { error } = assemblySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newAssembly = new Assemblies(req.body);
    const savedAssembly = await newAssembly.save();

    res.status(201).json(savedAssembly);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAssembly = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = assemblyUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedAssembly = await Assemblies.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAssembly) {
      return res.status(404).json({ message: "Không tìm thấy dữ liệu lắp ráp." });
    }

    res.status(200).json(updatedAssembly);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAssembly = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAssembly = await Assemblies.findByIdAndDelete(id);
    if (!deletedAssembly) {
      return res.status(404).json({ message: "Không tìm thấy dữ liệu lắp ráp." });
    }

    res.status(200).json({ message: "Xóa dữ liệu lắp ráp thành công." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
