import { client, sender } from "./mailtrap.js"
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplate.js"
export const sendVerificationEmail = async (email, verificationToken) => {

    try {
        const response = await client.sendMail({
            from: sender,
            to: email,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
        console.log("Verification Email Sent Successfully")
    } catch (error) {
        throw Error(`Error Sending Verification Email ${error}`)
    }
}

export const sendWelcomeEmail = async (email, firstname) => {
    try {
        const response = await client.sendMail({
            from: sender,
            to: email,
            subject: "Welcome to Bilel Sturtup",
            html: WELCOME_EMAIL.replace('{{username}}', firstname)
        })
        console.log("Welcome Email Sent Successfully!")
    } catch (error) {
        throw Error(`Error Sending Welcome Email ${error}`)
    }
}

export const sendResetPswEmail = async (email, resetUrl) =>{
    try {
        const response = await client.sendMail({
            from: sender,
            to: email,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
            category: "Password Reset"
        })
    } catch (error) {
        console.error("Error Password reset", error)
        throw new error(`Error Password reset: ${error}`)
    }
}

export const sendResetSuccessEmail = async (email) => {
    try {
        const response = await client.sendMail({
            from: sender,
            to: email,
            subject: "Password reset successfully!",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE
        })
    } catch (error) {
        console.error("Error sending changing psw success", error)
        throw new error(`Error sending changing psw success: ${error}`)
    }
}