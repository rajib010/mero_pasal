import { Router } from "express";
import {getAllOrders, getOrderById, updateOrderstatus, getOrderByUserId} from "../controllers/order.js"

const router = Router()

router.get('/orders', getAllOrders)
router.get('/orders/:id', getOrderById)
router.get('/orders/users/:userId', getOrderByUserId)
router.get('/orders/:id/status', updateOrderstatus)


export default router