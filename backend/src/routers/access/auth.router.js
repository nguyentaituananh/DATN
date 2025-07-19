import express from "express";
import {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/", getAllUsers); // Lấy tất cả người dùng
authRouter.get("/:id", getUserById); // Lấy người dùng theo ID
authRouter.put("/:id", updateUser); // Cập nhật người dùng
authRouter.delete("/:id", deleteUser); // Xóa người dùng

export default authRouter;
