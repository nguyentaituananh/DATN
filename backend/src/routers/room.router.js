import express from 'express';
import { createRoom, deleteRoom, getAllRooms, getRoomById, updateRoom } from '../controllers/room.controller.js';


const roomRouter = express.Router();

roomRouter.get('/', getAllRooms);
roomRouter.get('/:id', getRoomById);
roomRouter.post('/', createRoom);
roomRouter.put('/:id', updateRoom);
roomRouter.delete('/:id', deleteRoom);

export default roomRouter;
