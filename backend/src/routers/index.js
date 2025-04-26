import { Router } from "express";
import authRouter from "./auth.router.js";
import productRouter from "./product.router.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/api/products", productRouter);

export default router;
