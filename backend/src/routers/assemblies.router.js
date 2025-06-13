import express from 'express';
import { createAssembly, deleteAssembly, getAssemblies, updateAssembly } from '../controllers/assemblies.controller.js';

const assembliesRouter = express.Router();

assembliesRouter.get('/',getAssemblies)
assembliesRouter.post('/',createAssembly)
assembliesRouter.put('/:id',updateAssembly)
assembliesRouter.delete('/:id',deleteAssembly)

export default assembliesRouter