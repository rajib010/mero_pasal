import { createOrder, getAllOrdersByUser, getOrderDetails } from "../controllers/shopOrder.js";
import { Router } from "express";

const router = new Router()

router.post('/create', createOrder);
router.get('/user-orders/:userId', getAllOrdersByUser);
router.get('/order-details/:orderId', getOrderDetails)


export default router