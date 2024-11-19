import { login, register, logout } from "../controllers/user.js";
import { Router } from 'express'

const userRouter = Router()

userRouter.route('/login').post(login)
userRouter.route('/register').post(register)
userRouter.route('/logout').post(logout)

export default userRouter