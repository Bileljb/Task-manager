import express from 'express'
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDB from './config/connectDB.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoute.js';
import adminRoutes from './routes/adminRoutes.js';


const port = process.env.PORT || 5000
const app = express()
dotenv.config()
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/admin', adminRoutes)

connectDB()
app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })