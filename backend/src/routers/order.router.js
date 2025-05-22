// src/routers/order.router.js
import express from 'express';
import { createOrder, getAllOrders } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);

export default router;
