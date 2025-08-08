'use strict'

import mongoose from 'mongoose'

const connectString = `mongodb+srv://kaisa13102004:2lFSfOQYuJsdXd2X@cluster0.uxkc9mx.mongodb.net/make_money`

class Database {
	constructor() {
		this.connect()
	}

	connect(type = 'mongodb') {
		if (1 === 1) {
			mongoose.set('debug', true)
			mongoose.set('debug', { color: true })
		}

		mongoose
			.connect(connectString, {
				maxPoolSize: 50
			})
			.then((_) => {
				console.log('Connected mongodb success', `Number of connections count`)
			})
			.catch((err) => console.log('Error connect mongodb'))
	}

	static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database()
		}

		return Database.instance
	}
}

const instanceMongodb = Database.getInstance()

export default instanceMongodb
