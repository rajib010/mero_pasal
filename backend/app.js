import express from 'express'
import cookieParser from 'cookie-parser';
import cors from "cors"
import { configDotenv } from 'dotenv';

const app = new express();

configDotenv()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: '16kb' }))

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}))

app.use(express.static("public"))

app.use(cookieParser())

// import and implement routers here

import userRouter from './routes/user.js';
import adminProductRouter from './routes/adminproducts.js';
import shopProductRouter from './routes/shopproducts.js';

app.use('/api/user', userRouter)
app.use('/api/admin/products', adminProductRouter)
app.use('/api/shop/products', shopProductRouter)


export default app;