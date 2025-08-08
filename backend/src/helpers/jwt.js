import jwt from 'jsonwebtoken'

const verifyJWT = (token, keySecret) => {
	return jwt.verify(token, keySecret)
}

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' })
}

const generateRefreshToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' })
}

export { verifyJWT, generateToken, generateRefreshToken }
