// src/routers/styles.router.js
import express from "express";
import {
  createStyle,
  getAllStyles,
  getStyleById,
  updateStyle,
  deleteStyle,
} from "../controllers/styles.controller.js";

<<<<<<< HEAD
const router = express.Router();

router.post("/", createStyle);
router.get("/", getAllStyles);
router.get("/:id", getStyleById);
router.put("/:id", updateStyle);
router.delete("/:id", deleteStyle);

export default router;
=======
const stylesRouter = express.Router();

stylesRouter.post("/", createStyle);
stylesRouter.get("/", getAllStyles);
stylesRouter.get("/:id", getStyleById);
stylesRouter.put("/:id", updateStyle);
stylesRouter.delete("/:id", deleteStyle);

export default stylesRouter;
>>>>>>> 55d107a72aa0df79e9a549e316f81d2abd82a840
