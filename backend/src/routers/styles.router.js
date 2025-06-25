// src/routers/styles.router.js
import express from "express";
import {
  createStyle,
  getAllStyles,
  getStyleById,
  updateStyle,
  deleteStyle,
} from "../controllers/styles.controller.js";

const stylesRouter = express.Router();

stylesRouter.post("/", createStyle);
stylesRouter.get("/", getAllStyles);
stylesRouter.get("/:id", getStyleById);
stylesRouter.put("/:id", updateStyle);
stylesRouter.delete("/:id", deleteStyle);

export default stylesRouter;
