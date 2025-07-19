import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Hàm tạo mã KH
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getNextPrefix(current) {
  const [firstChar, secondChar] = current;
  const firstIndex = LETTERS.indexOf(firstChar);
  const secondIndex = LETTERS.indexOf(secondChar);

  if (secondIndex < LETTERS.length - 1) {
    return firstChar + LETTERS[secondIndex + 1];
  }

  if (firstIndex < LETTERS.length - 1) {
    return LETTERS[firstIndex + 1] + "A";
  }

  throw new Error("Đã đạt giới hạn mã khách hàng (ZZ99999)");
}

export const generateCustomerCode = async () => {
  const latestUser = await User.findOne({ customer_code: { $exists: true } })
    .sort({ customer_code: -1 })
    .lean();

  if (!latestUser || !latestUser.customer_code) {
    return "AA00000";
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

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "SECRET_KEY", {
    expiresIn: "7d",
  });
};

export const register = async (req, res) => {
  const { name, email, password, address, phone_number, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email đã tồn tại." });

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

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    if (!user.is_active) {
      return res.status(403).json({ message: "Tài khoản đã bị vô hiệu hóa." });
    }

    const token = generateToken(user._id);
    res.status(200).json({ user: user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) res.json(user);
    else res.status(404).json({ message: "Không tìm thấy người dùng" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) res.json({ message: "Người dùng đã bị xóa" });
    else res.status(404).json({ message: "Không tìm thấy người dùng để xóa" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
