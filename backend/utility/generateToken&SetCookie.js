import jwt from "jsonwebtoken";

const generateTokenSetCookie = (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d'
        });
        res.cookie("jwtToken", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        });
    } catch (error) {
        console.log('Error in token generation', error);
        throw new Error("Error in token generation");
    }
};

export default generateTokenSetCookie;
