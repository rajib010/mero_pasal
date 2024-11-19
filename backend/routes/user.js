import { login, register, logout } from "../controllers/user.js";
import { Router } from 'express'
import verifyUser from "../middleware/verifyuser.js"

const userRouter = Router()

userRouter.route('/login').post(login)
userRouter.route('/register').post(register)
userRouter.route('/logout').post(logout)
userRouter.get('/check-auth', verifyUser, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: 'Authenticated user',
        user,
    })
})

export default userRouter