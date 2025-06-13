import Room from '../models/room.model.js'; 

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách ' });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Không tìm thấy ' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server ' });
  }
};

export const createRoom = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newRoom = new Room({ name, description });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: 'Tạo  thất bại', error });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!updatedRoom) {
      return res.status(404).json({ message: 'Không tìm thấy  để cập nhật' });
    }
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: 'Cập nhật  thất bại', error });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return res.status(404).json({ message: 'Không tìm thấy  để xóa' });
    }
    res.status(200).json({ message: 'Xóa  thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Xóa  thất bại', error });
  }
};
