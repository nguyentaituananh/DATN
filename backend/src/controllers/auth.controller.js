import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { registerSchema } from "../validates/user.validate.js";
import { changePasswordSchema } from "../validates/user.validate.js"; // hoặc path tương ứng




// Tạo token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "SECRET_KEY", { expiresIn: "7d" }); // Thay "SECRET_KEY" bằng biến môi trường thực tế
};

// Đăng ký

export const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return res.status(400).json({ message: messages });
    }

    const { name, email, password, address, phone_number, role } = req.body;

    // Kiểm tra email đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại." });
    }

    // Tạo người dùng mới
    const newUser = new User({
      name,
      email,
      password,
      address,
      phone_number,
      role,
    });

    await newUser.save();

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
    res.status(200).json({ user: user.name, token ,id :user.id});
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
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedUser) res.json(updatedUser);
    else res.status(404).json({ message: "Không tìm thấy người dùng để cập nhật" });
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


export const changePassword = async (req, res) => {
  const { error } = changePasswordSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    return res.status(400).json({ message: "Dữ liệu không hợp lệ", errors: messages });
  }

  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng." });

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu hiện tại không đúng." });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ message: "Mật khẩu mới không được trùng với mật khẩu cũ." });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Đổi mật khẩu thành công." });
  } catch (err) {
    console.error("Lỗi khi đổi mật khẩu:", err);
    res.status(500).json({ message: "Lỗi server khi đổi mật khẩu.", error: err.message });
  }
};

