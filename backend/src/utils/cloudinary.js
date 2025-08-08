import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})

const cloudinaryUploadImage = (fileToUpload) => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload(fileToUpload, { resource_type: 'auto' }, (error, result) => {
			if (error) {
				reject(error)
			} else {
				resolve({
					url: result.secure_url,
					asset_id: result.asset_id,
					public_id: result.public_id
				})
			}
		})
	})
}

const cloudinaryDeleteImage = (fileToDelete) => {
	return new Promise((resolve) => {
		cloudinary.uploader.destroy(fileToDelete, (result) => {
			resolve(
				{ url: result?.secure_url, asset_id: result?.asset_id, public_id: result?.public_id },
				{ resource_type: 'auto' }
			)
		})
	})
}

export { cloudinaryUploadImage, cloudinaryDeleteImage }
