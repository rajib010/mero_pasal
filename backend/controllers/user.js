import mongoose from "mongoose";
import { User } from "../models/user.js";
import checkEmptyFields from "../utility/checkEmpty.js";
import bcrypt from "bcryptjs"
import generateTokenSetCookie from "../utility/generateToken&SetCookie.js";

const register = async function (req, res) {
    const { username, email, password } = req.body;
    console.log(password);
    

    // check if any fields are empty
    const requiredFields = ['username', 'email', 'password']
    const { isValid, missingFields } = checkEmptyFields(req.body, requiredFields)
    if (!isValid) {
        return res.status(400).json({
            success: false,
            message: 'All the fields are required.',
            missingFields
        })
    }
    try {
        // check if user already exists
        const existingUsername = await User.findOne({ username })
        const existingEmail = await User.findOne({ email })
        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: 'Username already exists'
            })
        }
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists. Try logging in.'
            })
        }

        //hash the password
        let hashedPassword = await bcrypt.hash(password, 12);

        //create new user
        const newUser = new User({
            username, email, password: hashedPassword
        })
        const savedUser = await newUser.save()
        if (!savedUser) {
            return res.status(500).json({
                success: false,
                message: 'Error in registering the user.'
            })
        }

        //after successfull register
        return res.status(200).json({
            success: true,
            message: 'User registered Successfully'
        })

    } catch (error) {
        console.log('failed to register', error);
        return res.status(500).json({
            success: false,
            message: 'Error while registering the user.'
        })
    }
}

const login = async function (req, res) {
    console.log("login route hit");
    const { email, password } = req.body
    const requiredFields = ['email', 'password']

    const { isValid, missingFields } = checkEmptyFields(req.body, requiredFields)
    if (!isValid) {
        return res.status(400).json({
            success: false,
            message: `${missingFields} fields empty.`
        })
    }
    try {
        const user = await User.findOne({ email })

        //check for user
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User doesnot exist.'
            })
        }

        //check for password
        const isPasswordValid = await bcrypt.compare(password, user?.password)
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Password invalid.'
            })
        }

        generateTokenSetCookie(user?._id, res)
        //successfull login
        return res.status(200).json({
            success: true,
            message: `Welcome ${user?.username}`,
            user: { id: user?._id, username: user?.username, email: user?.email, role: user?.role}
            
        })

    } catch (error) {
        return res.status(501).json({
            success: false,
            message: 'Error logging in. Try again.'
        })
    }
}

const logout = async function (req, res) {
    console.log('logout route hit');
    
    await res.cookie("jwtToken", { maxAge: 0 })
    return res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    })
}

export { register, login, logout }