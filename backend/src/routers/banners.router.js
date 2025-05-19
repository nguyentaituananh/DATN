import express from "express";
import { createBanner, deleteBanner, updateBanner } from '../controllers/banners.controller.js';

const bannersRouter = express.Router();
bannersRouter.post('/',createBanner);
bannersRouter.put('/:id',updateBanner);
bannersRouter.delete('/:id',deleteBanner);


export default bannersRouter;