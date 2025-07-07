import express from 'express';
import { createCareInstruction, deleteCareInstruction, getAllCareInstructions, updateCareInstruction } from '../controllers/careInstructions.controller.js';

const careInstructionsRouter = express.Router();

careInstructionsRouter.get('/',getAllCareInstructions)
careInstructionsRouter.post('/', createCareInstruction)
careInstructionsRouter.put('/:id', updateCareInstruction)
careInstructionsRouter.delete('/:id',deleteCareInstruction)

export default careInstructionsRouter;