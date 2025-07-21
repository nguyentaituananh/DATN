import FavoriteService from '../services/favorites.service.js'
import { OK, CREATED } from '../core/success.response.js'
import asyncHandler from '../helpers/asyncHandler.js'

class FavoriteController {
  // Thêm sản phẩm vào danh sách yêu thích
  addFavorite = asyncHandler(async (req, res) => {
    const newFavorite = await FavoriteService.addFavorite(req.body)

    new CREATED({
      message: 'Thêm sản phẩm yêu thích thành công',
      metadata: newFavorite,
    }).send(res)
  })

  // Lấy tất cả sản phẩm yêu thích
  getAllFavorites = asyncHandler(async (req, res) => {
    const { limit = 50, skip = 0 } = req.query
    const favorites = await FavoriteService.getAllFavorites({
      limit: parseInt(limit),
      skip: parseInt(skip),
    })

    new OK({
      message: 'Lấy danh sách sản phẩm yêu thích thành công',
      metadata: favorites,
    }).send(res)
  })

  // Lấy sản phẩm yêu thích theo ID
  getFavoriteById = asyncHandler(async (req, res) => {
    const { favoriteId } = req.params
    const favorite = await FavoriteService.getFavoriteById(favoriteId)

    new OK({
      message: 'Lấy thông tin sản phẩm yêu thích thành công',
      metadata: favorite,
    }).send(res)
  })

  // Xóa sản phẩm yêu thích
  deleteFavorite = asyncHandler(async (req, res) => {
    const { favoriteId } = req.params
    const result = await FavoriteService.deleteFavorite(favoriteId)

    new OK({
      message: 'Xóa sản phẩm yêu thích thành công',
      metadata: result,
    }).send(res)
  })

  // Lấy sản phẩm yêu thích theo user_id
  getFavoritesByUser = asyncHandler(async (req, res) => {
    const { userId } = req.params
    const { limit = 50, skip = 0 } = req.query
    const favorites = await FavoriteService.getFavoritesByUser({
      user_id: userId,
      limit: parseInt(limit),
      skip: parseInt(skip),
    })

    new OK({
      message: 'Lấy danh sách sản phẩm yêu thích của người dùng thành công',
      metadata: favorites,
    }).send(res)
  })
}

export default new FavoriteController()