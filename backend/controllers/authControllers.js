import { User } from "../models/user.model.js"
import { generateTokenAndSetCookies } from "../utils/generateTokenAndSetCookies.js"
import { sendVerificationEmail, sendWelcomeEmail, sendResetPswEmail, sendResetSuccessEmail } from "../mailtrap/emails.js"
import bcrypt from "bcryptjs"
import crypto from "crypto"
export const signUp = async (req, res) => {
    const { firstname, lastname, email, password } = req.body
    try {
        if (!firstname || !lastname || !email || !password) {
            throw new Error("All fields are required!")
        }
        
        const userAlreadyExist = await User.findOne({email});
        if (userAlreadyExist) {
            return res.status(400).json({ success: false, message: "User Already Exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
        const user = new User({
            firstname: firstname,
            lastname: lastname,
            email: email.toLowerCase(),
            password: hashedPassword,
            verificationToken: verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })
        
        await user.save()
        generateTokenAndSetCookies(res, user._id)
        await sendVerificationEmail(user.email, verificationToken)
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body
    try {
        if (!code) {
            return res.status(400).json({ success: false, message: "Verification code is required" });
        }
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or Expired Verification code" })

        }
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        await user.save()


        await sendWelcomeEmail(user.email, user.firstname);


        res.status(200).json({
            success: true,
            message: "Email Verified Successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.error("Error during email verification:", error);
        res.status(500).json({ success: false, message: "An error occurred during verification" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = generateTokenAndSetCookies(res, user._id);
        user.lastLogin = new Date();
        await user.save();
        res.status(200).json({
            success: true,
            message: "Logged in Successfully",
            token, 
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.log("Error Login", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const logout = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ success: true, message: "Logged Out Successfully" })

}

export const forgotpassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ success: false, message: "User not found!" })

        }

        const resetToken = crypto.randomBytes(20).toString('hex')
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000
        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpiresAt
        await user.save()
        await sendResetPswEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)
        res.status(200).json({ success: true, message: "Password reset link sent to your email" })
    } catch (error) {
        console.log("Error Sending Reset password email!", error)
    }
}

export const resetPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: {$gt: Date.now()}
        })
        if (!user) {
            res.status(400).json({ success: false, message: "Invalide or expired token!" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
        user.resetPasswordExpiresAt = undefined
        user.resetPasswordToken = undefined
        await user.save()
        sendResetSuccessEmail(user.email)
        res.status(200).json({success: true, message: "Password reset successfully!"})

    } catch (error) {
        console.Console("Error in resetPassword", error)
        res.status(400).json({success: false, message: error.message})
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if(!user){
            return res.status(400).json({
                success: false,
                message:"User not found"
            })
        }
        res.status(200).json({
            success: true,
            user:{
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log("Error in checkAuth", error)
        res.status(400).json({success: false, message: error.message})
    }
}