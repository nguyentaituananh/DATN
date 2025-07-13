import express from "express";

import {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
<<<<<<<<< Temporary merge branch 1
  changePassword
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
=========
  searchUsersByCustomerCode,
} from "../controllers/auth.controller.js";
>>>>>>>>> Temporary merge branch 2

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/", getAllUsers); // Lấy tất cả người dùng
authRouter.get("/search", searchUsersByCustomerCode);
authRouter.get("/:id", getUserById); // Lấy người dùng theo ID
authRouter.put("/:id", updateUser); // Cập nhật người dùng
authRouter.delete("/:id", deleteUser); // Xóa người dùng

export default authRouter;