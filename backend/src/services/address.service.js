import mongoose from 'mongoose';
import Address from '../models/addresses.model.js'; 

class AddressService {
  // Tạo địa chỉ mới
  async createAddress(data) {
    const { user_id, province, ward, street, is_default } = data;

    // Nếu đặt là địa chỉ mặc định, xóa trạng thái mặc định của các địa chỉ khác của user
    if (is_default) {
      await Address.updateMany({ user_id, is_default: true }, { is_default: false });
    }

    const address = new Address({
      user_id,
      province,
      ward,
      street,
      is_default,
    });

    return await address.save();
  }

  // Lấy danh sách địa chỉ của một người dùng
  async getAddressesByUser(user_id) {
    return await Address.find({ user_id }).lean();
  }

  // Lấy chi tiết một địa chỉ
  async getAddressById(id) {
    const address = await Address.findById(id).lean();
    if (!address) {
      throw new Error('Địa chỉ không tồn tại');
    }
    return address;
  }

  // Cập nhật địa chỉ
  async updateAddress(id, data) {
    const { province, ward, street, is_default } = data;

    // Nếu cập nhật thành địa chỉ mặc định, xóa trạng thái mặc định của các địa chỉ khác
    if (is_default) {
      await Address.updateMany(
        { user_id: data.user_id, is_default: true, _id: { $ne: id } },
        { is_default: false }
      );
    }

    const address = await Address.findByIdAndUpdate(
      id,
      { province, ward, street, is_default, updated_at: new Date() },
      { new: true, runValidators: true }
    );

    if (!address) {
      throw new Error('Địa chỉ không tồn tại');
    }

    return address;
  }

  // Xóa địa chỉ
  async deleteAddress(id) {
    const address = await Address.findByIdAndDelete(id);
    if (!address) {
      throw new Error('Địa chỉ không tồn tại');
    }
    return { _id: id };
  }

  // Đặt địa chỉ làm mặc định
  async setDefaultAddress(id, user_id) {
    // Xóa trạng thái mặc định của các địa chỉ khác
    await Address.updateMany({ user_id, is_default: true }, { is_default: false });

    // Cập nhật địa chỉ được chọn thành mặc định
    const address = await Address.findByIdAndUpdate(
      id,
      { is_default: true, updated_at: new Date() },
      { new: true, runValidators: true }
    );

    if (!address) {
      throw new Error('Địa chỉ không tồn tại');
    }

    return address;
  }
}

export default new AddressService();