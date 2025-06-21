import express from 'express';
import {
  createDeliveryOption,
  getAllDeliveryOptions,
  getDeliveryOptionById,
  updateDeliveryOption,
  deleteDeliveryOption
} from '../controllers/deliveryOption.controller.js';

const deliveryOptionRouter = express.Router();

deliveryOptionRouter.post('/', createDeliveryOption);
deliveryOptionRouter.get('/', getAllDeliveryOptions);
deliveryOptionRouter.get('/:id', getDeliveryOptionById);
deliveryOptionRouter.put('/:id', updateDeliveryOption);
deliveryOptionRouter.delete('/:id', deleteDeliveryOption);

export default deliveryOptionRouter;
