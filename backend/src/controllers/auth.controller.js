import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Tạo token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "SECRET_KEY", { expiresIn: "7d" }); // Thay "SECRET_KEY" bằng biến môi trường thực tế
};

// Đăng ký
export const register = async (req, res) => {
  const { name, email, password, address, phone_number, role } = req.body;

  try {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email đã tồn tại." });

    // Tạo người dùng mới
    const newUser = new User({
      name,
      email,
      password,
      address,
      phone_number,
      role,
    });

    // Mã hóa mật khẩu trước khi lưu vào DB
    await newUser.save();

    // Tạo JWT token
    const token = generateToken(newUser._id);
    res.status(201).json({ user: newUser.name, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Đăng nhập
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm người dùng theo email
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    // Kiểm tra trạng thái người dùng (is_active)
    if (!user.is_active) {
      return res.status(403).json({ message: "Tài khoản đã bị vô hiệu hóa." });
    }

    // Tạo JWT token
    const token = generateToken(user._id);
    res.status(200).json({ user: user.name, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy tất cả người dùng
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy người dùng theo ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) res.json(user);
    else res.status(404).json({ message: "Không tìm thấy người dùng" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật người dùng
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedUser) res.json(updatedUser);
    else
      res
        .status(404)
        .json({ message: "Không tìm thấy người dùng để cập nhật" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa người dùng
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) res.json({ message: "Người dùng đã bị xóa" });
    else res.status(404).json({ message: "Không tìm thấy người dùng để xóa" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
