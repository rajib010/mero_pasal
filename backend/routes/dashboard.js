import { Router } from 'express'
import { getProductsCount, getUsersCount } from '../controllers/dashboard.js'

const router = Router();

router.get('/users-count', getUsersCount)
router.get('/products-count', getProductsCount)

export default router