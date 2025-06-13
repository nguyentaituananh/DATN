import express from "express";
import {
  createProductVariant,
  getAllProductVariants,
  getProductVariantById,
  updateProductVariant,
  deleteProductVariant
} from "../controllers/productVariant.controller.js";

const router = express.Router();

router.post("/", createProductVariant);
router.get("/", getAllProductVariants);
router.get("/:id", getProductVariantById);
router.put("/:id", updateProductVariant);
router.delete("/:id", deleteProductVariant);

export default router;
