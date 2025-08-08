'use strict'

import express from 'express'
import instructionController from '../../controllers/instruction.controller.js'

const router = express.Router()

// Tạo hướng dẫn mới
router.post('/', instructionController.createInstruction)

// Lấy tất cả hướng dẫn
router.get('/', instructionController.getAllInstructions)

// Lấy hướng dẫn theo ID
router.get('/:instructionId', instructionController.getInstructionById)

// Cập nhật hướng dẫn
router.patch('/:instructionId', instructionController.updateInstruction)

// Xóa hướng dẫn
router.delete('/:instructionId', instructionController.deleteInstruction)

export default router