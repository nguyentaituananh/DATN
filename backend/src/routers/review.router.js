// src/routers/review.router.js
import { Router } from "express";
import { createReview, getAllReviews } from "../controllers/review.controller.js";

const router = Router();

router.post("/", createReview);
router.get("/", getAllReviews);

export default router;
