import { isValidObjectId } from "mongoose";
import { Cart } from "../models/cart.js";
import { Product } from "../models/product.js";

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!isValidObjectId(userId) || !isValidObjectId(productId) || quantity < 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided'
            })
        }

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        let cart = await Cart.findOne({ userId })
        if (!cart) {
            cart = new Cart({ userId, items: [] })
        }

        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)
        if (findCurrentProductIndex === -1) {
            cart.items.push({ productId, quantity })
        } else {
            cart.items[findCurrentProductIndex].quantity += quantity
        }

        await cart.save()

        return res.status(200).json({
            success: true,
            message: 'Added to cart successfully',
            data: cart
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error?.message || 'Error adding to the cart'
        })
    }
}
const fetchFromCart = async (req, res) => {
    try {
        const { userId } = req.params
        if (!isValidObjectId(userId)) {
            return res.status(500).json({
                success: false,
                message: 'Not a valid user'
            })
        }
        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: "image title price salePrice"
        })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            })
        }

        const validItems = cart.items.filter(productItem => productItem.productId)

        if (validItems.length < cart.items.length) {
            cart.items = validItems
            await cart.save()
        }

        const populateCartItems = validItems.map(item => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity,
        }))

        return res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error?.message || 'Error fetching from the cart'
        })
    }
}
const deleteFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params
        if (!isValidObjectId(userId) || !isValidObjectId(productId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided'
            })
        }
        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: 'image title price salePrice'
        })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart doesnot exist'
            })
        }

        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId)

        await cart.save();

        await Cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice'
        });

        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : null,
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity
        }))

        return res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error?.message || 'Error deleting from the cart'
        })
    }
}

const updateCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!isValidObjectId(userId) || !isValidObjectId(productId) || !quantity) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided'
            })
        }

        const cart = await Cart.findOne({ userId })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            })
        }

        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)
        if (findCurrentProductIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            })
        }

        cart.items[findCurrentProductIndex].quantity = quantity
        await cart.save()

        await cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice'
        })

        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : null,
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity
        }))

        return res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error?.message || 'Error updating the cart'
        })
    }
}


export { addToCart, deleteFromCart, updateCart, fetchFromCart }