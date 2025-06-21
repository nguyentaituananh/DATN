// src/routers/styles.router.js
import express from "express";
import {
  createStyle,
  getAllStyles,
  getStyleById,
  updateStyle,
  deleteStyle,
} from "../controllers/styles.controller.js";

const router = express.Router();

router.post("/", createStyle);
router.get("/", getAllStyles);
router.get("/:id", getStyleById);
router.put("/:id", updateStyle);
router.delete("/:id", deleteStyle);

export default router;
