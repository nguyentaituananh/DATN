import express from "express";
import {
  getAllVouchers,
  createVoucher,
  deleteVoucher,
  getVoucherById,
  updateVoucher,
} from "../controllers/voucher.controller.js";

const voucherRouter = express.Router();

voucherRouter.get("/vouchers", getAllVouchers);
voucherRouter.post("/vouchers", createVoucher);
voucherRouter.delete("/vouchers/:id", deleteVoucher);
voucherRouter.get("/vouchers/:id", getVoucherById);
voucherRouter.put("/vouchers/:id", updateVoucher);

export default voucherRouter;
