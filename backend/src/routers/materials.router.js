import express from "express";
import {
  createMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
} from "../controllers/materials.controller.js";

const materialsRouter = express.Router();

materialsRouter.post("/", createMaterial);
materialsRouter.get("/", getAllMaterials);
materialsRouter.get("/:id", getMaterialById);
materialsRouter.put("/:id", updateMaterial);
materialsRouter.delete("/:id", deleteMaterial);

export default materialsRouter;
