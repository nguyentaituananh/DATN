import express from 'express';
import addressesController from '../../controllers/addresses.controller.js';
const router = express.Router();

router.post('/', addressesController.createAddress);
router.get('/user/:user_id', addressesController.getAddressesByUser);
router.get('/:id', addressesController.getAddressById);
router.put('/:id', addressesController.updateAddress);
router.delete('/:id', addressesController.deleteAddress);
router.put('/:id/default/:user_id', addressesController.setDefaultAddress);

export default router;