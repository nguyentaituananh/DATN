// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Không có token xác thực." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "SECRET_KEY"); // Sử dụng biến env thật sự ở production
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "Người dùng không tồn tại." });

    next();
  } catch (err) {
    res.status(401).json({ message: "Token không hợp lệ." });
  }
};
