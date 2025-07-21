'use strict'

import InstructionService from '../services/instruction.service.js'
import { SuccessResponse, CREATED } from '../core/success.response.js'

class InstructionController {
  // Tạo hướng dẫn mới
  createInstruction = async (req, res, next) => {
    try {
      const result = await InstructionService.createInstruction(req.body)

      new CREATED({
        message: 'Tạo hướng dẫn thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }

  // Lấy tất cả hướng dẫn
  getAllInstructions = async (req, res, next) => {
    try {
      const result = await InstructionService.getAllInstructions(req.query)

      new SuccessResponse({
        message: 'Lấy danh sách hướng dẫn thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }

  // Lấy hướng dẫn theo ID
  getInstructionById = async (req, res, next) => {
    try {
      const { instructionId } = req.params
      const result = await InstructionService.getInstructionById(instructionId)

      new SuccessResponse({
        message: 'Lấy hướng dẫn thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }

  // Cập nhật hướng dẫn
  updateInstruction = async (req, res, next) => {
    try {
      const { instructionId } = req.params
      const result = await InstructionService.updateInstruction(instructionId, req.body)

      new SuccessResponse({
        message: 'Cập nhật hướng dẫn thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }

  // Xóa hướng dẫn
  deleteInstruction = async (req, res, next) => {
    try {
      const { instructionId } = req.params
      const result = await InstructionService.deleteInstruction(instructionId)

      new SuccessResponse({
        message: 'Xóa hướng dẫn thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }
}

export default new InstructionController()