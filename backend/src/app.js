import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'

import instanceMongodb from './dbs/init.mongoose.js'
import router from './routers/index.js'

const app = express()

// init middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(cors())
app.use(express.json())
app.use(
	express.urlencoded({
		extended: true
	})
)

// init db
instanceMongodb.connect()

// init routes
app.use('/', router)

// handle errors
app.use((req, res, next) => {
	const error = new Error('Không tìm thấy')
	error.status = 404
	next(error)
})

app.use((error, req, res, next) => {
	const statusCode = error.status || 500

	return res.status(statusCode).json({
		status: 'error',
		code: statusCode,
		message: error.message || 'Lỗi máy chủ nội bộ'
	})
})
export default app
