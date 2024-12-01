import { Product } from "../models/product.js";
import { User } from "../models/user.js";

const getProductsCount = async (req, res) => {
    try {
        const count = await Product.countDocuments()
        return res.status(200).json({
            success: true,
            data: count
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'failed getting products count'
        })
    }
}

const getUsersCount = async (req, res) => {
    try {
        const count = await User.countDocuments();
        return res.status(200).json({
            success: true,
            data: count
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'failed getting products count'
        })
    }
}

export { getProductsCount, getUsersCount }