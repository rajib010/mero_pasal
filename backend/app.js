import express from 'express'
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = new express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
}))

app.use(express.json({ limit: '16kb' }))

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}))

app.use(express.static("public"))

app.use(cookieParser())

// import and implement routers here

export default app;