import express from "express";
import {
  createMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
} from "../controllers/materials.controller.js";

const router = express.Router();

router.post("/", createMaterial);
router.get("/", getAllMaterials);
router.get("/:id", getMaterialById);
router.put("/:id", updateMaterial);
router.delete("/:id", deleteMaterial);

export default router;
