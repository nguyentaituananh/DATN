import { Types } from 'mongoose'
import _ from 'lodash'

const convertToObjectMongoId = (id) => new Types.ObjectId(id)

const getInfoData = ({ fides = [], object = {} }) => {
	return _.pick(object, fides)
}

const getSelectData = (select = []) => {
	return Object.fromEntries(select.map((item) => [item, 1]))
}

const unGetSelectData = (select = []) => {
	return Object.fromEntries(select.map((item) => [item, 0]))
}

const removeUndefinedObject = (obj) => {
	Object.keys(obj).forEach((key) => {
		if (obj[key] === null) delete obj[key]
	})

	return obj
}

const updateNestedObjectParser = (obj) => {
	const final = {}
	Object.keys(obj).forEach((key) => {
		if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
			const response = updateNestedObjectParser(obj[key])
			Object.keys(response).forEach((a) => {
				final[`${key}.${a}`] = response[a]
			})
		} else {
			final[key] = obj[key]
		}
	})

	return final
}

export {
	getInfoData,
	getSelectData,
	unGetSelectData,
	removeUndefinedObject,
	updateNestedObjectParser,
	convertToObjectMongoId
}
