import express from "express";
import upload from "../middlewares/upload.js";
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
product_variants.post("/" ,upload.array("images"), createVariant);
product_variants.put("/:id", updateVariant);
product_variants.delete("/:id", deleteVariant);

export default product_variants;
