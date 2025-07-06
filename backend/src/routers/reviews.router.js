import express from "express"
import { createReview, deleteReview, getAllReviews, getReviewById, updateReview } from "../controllers/reviews.controller.js";


const reviewRouter = express.Router();

reviewRouter.get("/", getAllReviews);
reviewRouter.get("/:id", getReviewById);
reviewRouter.post("/", createReview);
reviewRouter.put("/:id", updateReview);
reviewRouter.delete("/:id", deleteReview);

export default reviewRouter;