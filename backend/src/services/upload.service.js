'use strict'

import { cloudinaryDeleteImage, cloudinaryUploadImage } from '../utils/cloudinary.js'
import fs from 'fs'

class UploadService {
	// Upload single image
	static uploadImage = async (fileUpload) => {
		try {
			const uploader = (path) => cloudinaryUploadImage(path, 'images')
			const urls = []
			const files = fileUpload
			for (const file of files) {
				const { path } = file
				const newpath = await uploader(path)
				urls.push(newpath)
				fs.unlinkSync(path)
			}
			const images = urls.map((file) => {
				return file
			})
			return images
		} catch (error) {
			throw new Error(error)
		}
	}

	// Upload multiple images
	static deleteImages = async (id) => {
		try {
			const deleted = await cloudinaryDeleteImage(id)
			return { message: 'Đã xóa hình ảnh!', deleted }
		} catch (error) {
			throw new Error(error)
		}
	}
}

export default UploadService
