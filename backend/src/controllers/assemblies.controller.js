import Assemblies from "../models/assemblies.model.js";

export const getAssemblies = async (req, res) => {
  try {
    const assemblies = await Assemblies.find().populate("product_id");
    res.status(200).json(assemblies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createAssembly = async (req, res) => {
  try {
    const { product_id, instructions } = req.body;
    if (!product_id || !instructions) {
      return res.status(400).json({ message: "Product ID and instructions are required." });
    }

    const newAssembly = new Assemblies({
      product_id,
      instructions
    });

    const savedAssembly = await newAssembly.save();
    res.status(201).json(savedAssembly);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateAssembly = async (req, res) => {
  try {
    const { id } = req.params;
    const { instructions } = req.body;

    if (!instructions) {
      return res.status(400).json({ message: "Instructions are required." });
    }

    const updatedAssembly = await Assemblies.findByIdAndUpdate(
      id,
      { instructions },
      { new: true }
    );

    if (!updatedAssembly) {
      return res.status(404).json({ message: "Assembly not found." });
    }

    res.status(200).json(updatedAssembly);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteAssembly = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAssembly = await Assemblies.findByIdAndDelete(id);
    if (!deletedAssembly) {
      return res.status(404).json({ message: "Assembly not found." });
    }

    res.status(200).json({ message: "Assembly deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
