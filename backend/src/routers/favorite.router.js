import express from "express";
import { addFavorite, getFavoritesByUser, removeFavorite } from "../controllers/favorite.controller.js";

const favoriteRouter = express.Router();

favoriteRouter.get("/:userId", getFavoritesByUser );
favoriteRouter.post("/", addFavorite);
favoriteRouter.delete("/:userId/:productId", removeFavorite);

export default favoriteRouter;
