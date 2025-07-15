import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { registerSchema } from "../validates/user.validate.js";



// Hàm tạo mã KH
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getNextPrefix(current) {
  const [firstChar, secondChar] = current;
  const firstIndex = LETTERS.indexOf(firstChar);
  const secondIndex = LETTERS.indexOf(secondChar);

  if (secondIndex < LETTERS.length - 1) {
    // Tăng ký tự thứ 2 (B -> C)
    return firstChar + LETTERS[secondIndex + 1];
  }

  if (firstIndex < LETTERS.length - 1) {
    // Tăng ký tự thứ 1 (A -> B), reset ký tự 2 về A
    return LETTERS[firstIndex + 1] + "A";
  }

  throw new Error("Đã đạt giới hạn mã khách hàng (ZZ99999)");
}

export const generateCustomerCode = async () => {
  const latestUser = await User.findOne({ customer_code: { $exists: true } })
    .sort({ customer_code: -1 })
    .lean();

  if (!latestUser || !latestUser.customer_code) {
    return "AA00000"; // Khởi tạo ban đầu
  }

  const prevCode = latestUser.customer_code;
  const prefix = prevCode.slice(0, 2);
  const number = parseInt(prevCode.slice(2));
  let newPrefix = prefix;
  let newNumber = number + 1;

  if (newNumber >= 100000) {
    newPrefix = getNextPrefix(prefix);
    newNumber = 0;
  }

  const paddedNumber = String(newNumber).padStart(5, "0");
  return `${newPrefix}${paddedNumber}`;
};

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
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại." });
    }
=========
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email đã tồn tại." });

    // Thêm dòng này để sinh mã tự động
    const customer_code = await generateCustomerCode();

    const newUser = new User({
      name,
      customer_code,
      email,
      password,
      address,
      phone_number,
      role,
    });

    await newUser.save();

    const token = generateToken(newUser._id);
    res.status(201).json({ user: newUser, token }); 
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
<<<<<<<<< Temporary merge branch 1
    res.status(200).json({ user: user.name, token ,id :user.id});
=========
    res.status(200).json({ user: user, token });
>>>>>>>>> Temporary merge branch 2
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

<<<<<<<<< Temporary merge branch 1

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng." });

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu hiện tại không đúng." });
    }

    user.password = newPassword; // sẽ được mã hóa bởi pre-save
    await user.save();

    res.json({ message: "Đổi mật khẩu thành công." });
  } catch (err) {
    console.error("Lỗi khi đổi mật khẩu:", err);
    res.status(500).json({ message: "Lỗi server khi đổi mật khẩu.", error: err.message });
  }
};

=========
// Tìm kiếm theo mã khách hàng (autocomplete)
export const searchUsersByCustomerCode = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 1) {
      return res.status(400).json({ message: "Thiếu tham số tìm kiếm" });
    }

    const users = await User.find({
      customer_code: { $regex: `^${q}`, $options: "i" },
    })
      .limit(10)
      .select("name customer_code _id");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
>>>>>>>>> Temporary merge branch 2
