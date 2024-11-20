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
import productRouter from './routes/products.js';

app.use('/api/user', userRouter)
app.use('/api/admin/products', productRouter)


export default app;