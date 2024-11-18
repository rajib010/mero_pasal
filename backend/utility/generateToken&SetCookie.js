import jwt from "jsonwebtoken"

const generateTokenSetCookie = async (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d'
        })
        await res.cookie("jwtToken", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        })
        return res.status(200).json({
            success: true,
            message: 'Token generated and cookie set successfully'
        })
    } catch (error) {
        console.log('Error in token generation', error);
        return res.status(500).json({
            success: false,
            message: "Error in token generation"
        })

    }
}

export default generateTokenSetCookie