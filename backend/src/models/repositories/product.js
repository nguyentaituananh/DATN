import Product from '../product.model.js'
import { Types } from 'mongoose'
import { getSelectData, unGetSelectData, convertToObjectMongoId } from '../../utils/index.js'

const queryProduct = async ({ query, limit, skip }) => {
	return await Product.find(query)
		.populate('category_id', 'name description _id')
		.sort({ updatedAt: -1 })
		.skip(skip)
		.limit(limit)
		.lean()
		.exec()
}

const findAllDraftsShop = async ({ query, limit, skip }) => {
	return await queryProduct({ query, limit, skip })
}

const findAllPublishShop = async ({ query, limit, skip }) => {
	return await queryProduct({ query, limit, skip })
}

const searchProductByUser = async ({ keySearch }) => {
	const regexSearch = new RegExp(keySearch, 'i')
	return await Product.find({
		$or: [{ name: { $regex: regexSearch } }, { description: { $regex: regexSearch } }],
		isPublish: true
	})
		.populate('category_id', 'name description _id')
		.lean()
}

const publicProductByShop = async ({ product_id }) => {
	const updatedShop = await Product.findOneAndUpdate(
		{
			_id: new Types.ObjectId(product_id)
		},
		{
			isDraft: false,
			isPublish: true
		},
		{ new: true }
	)

	return updatedShop ? true : false
}

const unPublicProductByShop = async ({ product_id }) => {
	const updatedShop = await Product.findOneAndUpdate(
		{
			_id: new Types.ObjectId(product_id)
		},
		{
			isDraft: true,
			isPublish: false
		},
		{ new: true }
	)

	return updatedShop ? true : false
}

const findAllProducts = async ({ limit, sort, page, filter, select }) => {
	const skip = (page - 1) * limit
	const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }

	const products = await Product.find(filter)
		.populate('category_id', 'name description _id')
		.sort(sortBy)
		.skip(skip)
		.limit(limit)
		.select(getSelectData(select))
		.lean()

	return products
}

const findProduct = async ({ product_id, unSelect }) => {
	return await Product.findById(product_id).populate('category_id', 'name description _id').select(unGetSelectData(unSelect)).lean()
}

const updateProductById = async ({ productId, bodyUpdate, model, isNew = true }) => {
	return await model.findByIdAndUpdate(productId, bodyUpdate, { new: isNew })
}

const getProductById = async (productId) => {
	return await Product.findOne({ _id: convertToObjectMongoId(productId) })
		.populate('category_id', 'name description _id')
		.lean()
}

const checkProductByServer = async (products = []) => {
	return await Promise.all(
		products.map(async (product) => {
			const foundProduct = await getProductById(product.productId)
			if (foundProduct)
				return {
					price: foundProduct.price,
					quantity: product.quantity,
					productId: product.productId
				}
		})
	)
}

export {
	findAllDraftsShop,
	findAllPublishShop,
	searchProductByUser,
	publicProductByShop,
	unPublicProductByShop,
	findAllProducts,
	findProduct,
	updateProductById,
	getProductById,
	checkProductByServer
}
