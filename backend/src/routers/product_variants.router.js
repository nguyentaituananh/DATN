import express from "express";
import {
  createVariant,
  deleteVariant,
  getAllVariants,
  getVariantById,
  updateVariant,
} from "../controllers/product_variants.controller.js";

const product_variants = express.Router();

product_variants.get("/", getAllVariants);
product_variants.get("/:id", getVariantById);
product_variants.post("/", createVariant);
product_variants.put("/:id", updateVariant);
product_variants.delete("/:id", deleteVariant);

export default product_variants;
