import { Router } from 'express'
import { getProductsCount, getUsersCount, getTotalSales } from '../controllers/dashboard.js'

const router = Router();

router.get('/users-count', getUsersCount)
router.get('/products-count', getProductsCount)
router.get('/sales-count', getTotalSales)

export default router