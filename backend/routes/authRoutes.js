import express from 'express'
import { signUp, login, logout, verifyEmail, forgotpassword, resetPassword, checkAuth } from '../controllers/authControllers.js'
import { verifyToken } from '../middlewares/verifyToken.js'
const authRoutes = express.Router()

authRoutes.get("/check-auth", verifyToken, checkAuth )

authRoutes.post('/signup', signUp)
authRoutes.post('/login', login)
authRoutes.post('/logout', logout)

authRoutes.post('/verify-email', verifyEmail)
authRoutes.post('/forgot-password', forgotpassword)
authRoutes.post('/reset-password/:token', resetPassword)

export default authRoutes