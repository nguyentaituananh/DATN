import mongoose from 'mongoose'

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'products'

const ProductSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		quantity: { type: Number, required: true },
		images: { type: Array, default: [] },
		category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
		related_products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: [] }],
		isDraft: { type: Boolean, default: true, index: true },
		isPublish: { type: Boolean, default: false, index: true },
		rating_average: {
			type: Number,
			default: 4.5,
			min: [1, 'Rating must be above 1.0'],
			max: [5, 'Rating must be above 5.0'],
			set: (val) => Math.round(val * 10) / 10
		}
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME
	}
)

// ProductSchema.index({ name: 'text', description: 'text' })

const Product = mongoose.model(DOCUMENT_NAME, ProductSchema)
export default Product
