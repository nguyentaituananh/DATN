import express from "express";
import {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUsersByCustomerCode,
} from "../../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/", getAllUsers);
authRouter.get("/search", searchUsersByCustomerCode);
authRouter.get("/:id", getUserById);
authRouter.put("/:id", updateUser);
authRouter.delete("/:id", deleteUser);

export default authRouter;
