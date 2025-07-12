import express from "express";
<<<<<<< HEAD
=======

>>>>>>> 4972f81020297a60c800d3060049d31b85e1d23b
import {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
<<<<<<< HEAD
  changePassword
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
=======
  searchUsersByCustomerCode,
} from "../controllers/auth.controller.js";
>>>>>>> 4972f81020297a60c800d3060049d31b85e1d23b

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

authRouter.put("/change-password", authMiddleware, changePassword); 

authRouter.get("/", getAllUsers); // Lấy tất cả người dùng
authRouter.get("/search", searchUsersByCustomerCode);
authRouter.get("/:id", getUserById); // Lấy người dùng theo ID
authRouter.put("/:id", updateUser); // Cập nhật người dùng
authRouter.delete("/:id", deleteUser); // Xóa người dùng

export default authRouter;
