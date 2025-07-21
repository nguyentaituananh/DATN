import mongoose from 'mongoose'

const DOCUMENT_NAME = 'Category'
const COLLECTION_NAME = 'categories'

const categorySchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String },
		parent_category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
		images: { type: String, default: null }
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true
	}
)

const Category = mongoose.model(DOCUMENT_NAME, categorySchema)

export default Category
