import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Tạo token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "SECRET_KEY", { expiresIn: "7d" }); // thay thế SECRET_KEY bằng biến môi trường thực tế
};

// Đăng ký
export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Tài khoản đã tồn tại." });

    const newUser = new User({ username, password });
    await newUser.save();

    const token = generateToken(newUser._id);
    res.status(201).json({ user: newUser.username, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Đăng nhập
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    const token = generateToken(user._id);
    res.status(200).json({ user: user.username, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
