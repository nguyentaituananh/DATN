import express from "express";
<<<<<<< HEAD
import { register, login } from "../controllers/auth.controller.js";
=======
import { register, login, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/auth.controller.js";
>>>>>>> 55d107a72aa0df79e9a549e316f81d2abd82a840

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
<<<<<<< HEAD
=======
authRouter.get("/", getAllUsers); // Lấy tất cả người dùng
authRouter.get("/:id", getUserById); // Lấy người dùng theo ID
authRouter.put("/:id",updateUser); // Cập nhật người dùng
authRouter.delete("/:id", deleteUser); // Xóa người dùng
>>>>>>> 55d107a72aa0df79e9a549e316f81d2abd82a840

export default authRouter;
