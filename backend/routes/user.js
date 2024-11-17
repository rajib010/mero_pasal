import { login, register } from "../controllers/user.js";
import { Router } from 'express'

const userRouter = Router()

userRouter.route('/login').post(login)
userRouter.route('/register').post(register)

export default userRouter