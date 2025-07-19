import fs from 'fs'
import sharp from 'sharp'
import path from 'path'
import multer from 'multer'
import { fileURLToPath } from 'url'

// Get __dirname equivalent in ES6 modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../public/images/'))
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg')
	}
})

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true)
	} else {
		cb({ message: 'Unsupported file format' }, false)
	}
}

const uploadPhoto = multer({
	storage: storage,
	fileFilter: multerFilter,
	limits: { fileSize: 1500000 }
})

const uploadImage = async (req, res, next) => {
	if (!req.files) return next()

	await Promise.all(
		req.files.map(async (file) => {
			const tempOutputPath = path.join(__dirname, '../public/images/', `temp-${file.filename}`)

			try {
				await sharp(file.path).toFormat('jpeg').jpeg({ quality: 90 }).toFile(tempOutputPath)

				fs.unlinkSync(file.path)
				fs.renameSync(tempOutputPath, path.join(__dirname, '../public/images/', file.filename))
			} catch (error) {
				throw new Error(error)
			}
		})
	)

	next()
}

export { uploadPhoto, uploadImage }
