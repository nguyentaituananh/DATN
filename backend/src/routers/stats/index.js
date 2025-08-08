'use strict'

import express from 'express'
import { authentication, isAdmin } from '../../middlewares/authMiddleware.js'
import statsController from '../../controllers/stats.controller.js'

const statsRouter = express.Router()

statsRouter.use(authentication, isAdmin)

statsRouter.get('/best-selling-products', statsController.getBestSellingProducts)
statsRouter.get('/customer-overview', statsController.getCustomerOverviewStats)
statsRouter.get('/new-customers-by-time', statsController.getNewCustomersByTime)
statsRouter.get('/verification-status-distribution', statsController.getVerificationStatusDistribution)
statsRouter.get('/login-counts-by-time', statsController.getLoginCountsByTime)
statsRouter.get('/role-distribution', statsController.getRoleDistribution)

export default statsRouter
