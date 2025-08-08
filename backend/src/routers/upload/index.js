'use strict'

import express from 'express'
import { uploadPhoto, uploadImage } from '../../middlewares/uploadImage.js'
import { authentication } from '../../middlewares/authMiddleware.js'
import uploadController from '../../controllers/upload.controller.js'

const Router = express.Router()

Router.post('/', authentication, uploadPhoto.array('images', 10), uploadImage, uploadController.uploadImages)
Router.delete('/:id', authentication, uploadController.deleteImage)

export default Router
