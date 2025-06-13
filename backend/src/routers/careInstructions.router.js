import express from 'express';
import { creatCareInstruction, deleteCareInstruction, getAllCareInstructions, updateCartIntruction } from '../controllers/careInstructions.controller.js';

const careInstructionsRouter = express.Router();

careInstructionsRouter.get('/',getAllCareInstructions)
careInstructionsRouter.post('/', creatCareInstruction)
careInstructionsRouter.put('/:id', updateCartIntruction)
careInstructionsRouter.delete('/:id',deleteCareInstruction)

export default careInstructionsRouter;