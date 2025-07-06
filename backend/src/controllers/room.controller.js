import Room from "../models/room.model.js";
import { roomSchema, roomUpdateSchema } from "../validates/rooms.validate.js";

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi lấy danh sách không gian.", error: error.message });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Không tìm thấy không gian." });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi lấy không gian.", error: error.message });
  }
};

export const createRoom = async (req, res) => {
  try {
    const { error } = roomSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const newRoom = new Room(req.body);
    const saved = await newRoom.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Tạo không gian thất bại.", error: error.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const { error } = roomUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updated = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Không tìm thấy không gian để cập nhật." });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Cập nhật không gian thất bại.", error: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const deleted = await Room.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy không gian để xóa." });

    res.status(200).json({ message: "Xóa không gian thành công." });
  } catch (error) {
    res.status(500).json({ message: "Xóa không gian thất bại.", error: error.message });
  }
};
