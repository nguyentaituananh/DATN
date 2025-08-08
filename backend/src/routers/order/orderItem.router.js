import express from "express";
import {
  createOrderItem,
  deleteOrderItem,
  getAllOrderItems,
  updateOrderItem,
} from "../../controllers/orderItem.controller.js";

const orderItemRouter = express.Router();

orderItemRouter.get("/", getAllOrderItems);
orderItemRouter.post("/", createOrderItem);
orderItemRouter.put("/:id", updateOrderItem);
orderItemRouter.delete("/:id", deleteOrderItem);

export default orderItemRouter;
