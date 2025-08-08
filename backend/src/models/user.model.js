import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'users'

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		customer_code: { type: String, required: true, unique: true },
		email: { type: String, required: true, trim: true, unique: true, lowercase: true },
		password: { type: String, required: true, private: true },
		phone_number: { type: String, required: false },
		is_active: { type: Boolean, default: true },
		verify: { type: Boolean, default: false },
		role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
		refreshToken: { type: String },
		lastLogin: { type: Date }
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME
	}
)

// Hash password trước khi save
userSchema.pre('save', async function (next) {
	const user = this
	const salt = await bcrypt.genSalt(10)
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, salt)
	}

	next()
})

// So sánh password
userSchema.methods.matchPassword = async function (enteredPassword) {
	const user = this
	return bcrypt.compare(enteredPassword, user.password)
}

const User = mongoose.model(DOCUMENT_NAME, userSchema)
export default User
