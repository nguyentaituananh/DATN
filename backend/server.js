import app from './src/app.js'

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
	console.log(`WSV eCommerce start with ${PORT}`)
})
