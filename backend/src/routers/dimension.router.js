import express from 'express';
import {
  createDimension,
  getAllDimensions,
  getDimensionById,
  updateDimension,
  deleteDimension
} from '../controllers/dimension.controller.js';

const dimensionRouter = express.Router();

dimensionRouter.post('/', createDimension);
dimensionRouter.get('/', getAllDimensions);
dimensionRouter.get('/:id', getDimensionById);
dimensionRouter.put('/:id', updateDimension);
dimensionRouter.delete('/:id', deleteDimension);

export default dimensionRouter;
