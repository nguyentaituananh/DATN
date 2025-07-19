'use strict'

import { SuccessResponse } from '../core/success.response.js'
import { BadRequestError } from '../core/error.response.js'
import UploadService from '../services/upload.service.js'

class UploadController {
	// Upload single image
	uploadImages = async (req, res, next) => {
		try {
			const { files } = req
			const results = await UploadService.uploadImage(files)

			new SuccessResponse({
				message: 'Tải ảnh lên thành công',
				metadata: results
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	// Delete image
	deleteImage = async (req, res, next) => {
		try {
			const { id } = req.params

			if (!id) {
				throw new BadRequestError('')
			}

			await UploadService.deleteImages(id)

			new SuccessResponse({
				message: 'Xóa ảnh thành công'
			}).send(res)
		} catch (error) {
			next(error)
		}
	}
}

export default new UploadController()
