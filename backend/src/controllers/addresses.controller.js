'use strict'

import mongoose from 'mongoose';
import AddressService from '../services/address.service.js';
import { SuccessResponse, CREATED } from '../core/success.response.js';

class AddressController {
  // Tạo địa chỉ mới
  createAddress = async (req, res, next) => {
    try {
      const { user_id, province, ward, street, is_default } = req.body;

      // Kiểm tra user_id hợp lệ
      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        throw new Error('Invalid user_id');
      }

      const result = await AddressService.createAddress(req.body);

      new CREATED({
        message: 'Tạo địa chỉ thành công',
        metadata: result
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  // Lấy danh sách địa chỉ của một người dùng
  getAddressesByUser = async (req, res, next) => {
    try {
      const { user_id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        throw new Error('Invalid user_id');
      }

      const result = await AddressService.getAddressesByUser(user_id);

      new SuccessResponse({
        message: 'Lấy danh sách địa chỉ thành công',
        metadata: result
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  // Lấy chi tiết một địa chỉ
  getAddressById = async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid address ID');
      }

      const result = await AddressService.getAddressById(id);

      new SuccessResponse({
        message: 'Lấy địa chỉ thành công',
        metadata: result
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  // Cập nhật địa chỉ
  updateAddress = async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid address ID');
      }

      const result = await AddressService.updateAddress(id, req.body);

      new SuccessResponse({
        message: 'Cập nhật địa chỉ thành công',
        metadata: result
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  // Xóa địa chỉ
  deleteAddress = async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid address ID');
      }

      const result = await AddressService.deleteAddress(id);

      new SuccessResponse({
        message: 'Xóa địa chỉ thành công',
        metadata: result
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  // Đặt địa chỉ làm mặc định
  setDefaultAddress = async (req, res, next) => {
    try {
      const { id, user_id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(user_id)) {
        throw new Error('Invalid address ID or user_id');
      }

      const result = await AddressService.setDefaultAddress(id, user_id);

      new SuccessResponse({
        message: 'Đặt địa chỉ mặc định thành công',
        metadata: result
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}

export default new AddressController();