import express from 'express';
import { createCoupons, deleteCoupons, getAllCoupons, updateCoupons } from '../controllers/coupons.controller.js';

const couponsRouter = express.Router();

couponsRouter.get('/',getAllCoupons)
couponsRouter.post('/',createCoupons)
couponsRouter.put('/:id',updateCoupons)
couponsRouter.delete('/:id',deleteCoupons)

export default couponsRouter;