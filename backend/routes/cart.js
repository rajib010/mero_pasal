import { Router } from 'express'
import { addToCart, deleteFromCart, fetchFromCart, updateCart } from '../controllers/cart.js'

const cartRouter = new Router()

cartRouter.post('/add-cart', addToCart)
cartRouter.get('/get-cart/:userId', fetchFromCart)
cartRouter.put('/update-cart', updateCart)
cartRouter.delete('/delete-cart/:userId/:productId', deleteFromCart)

export default cartRouter