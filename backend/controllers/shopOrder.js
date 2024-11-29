import { isValidObjectId } from 'mongoose';
import { Order } from '../models/order.js'

const createOrder = async (req, res) => {
    try {
        const {
            userId, cartItems, addressInfo, orderStatus, paymentMethod,
            paymentStatus, totalAmount,orderDate,orderUpdateDate, paymentId, payerId
        } = req.body;

        //validate fields
        if (
            !userId || !cartItems || !addressInfo || !paymentMethod ||
            totalAmount === undefined || cartItems.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields or empty cart items',
            });
        }

        if (!addressInfo.address || !addressInfo.city || !addressInfo.phone || !addressInfo.pincode) {
            return res.status(400).json({
                success: false,
                message: 'Invalid address information',
            });
        }

        for (const item of cartItems) {
            if (!item.productId || !item.title || !item.price || item.quantity === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid cart item structure',
                });
            }
        }

        // Create the order
        const newOrder = await Order.create({
            userId,
            cartItems,
            addressInfo,
            orderStatus: orderStatus || 'Pending',
            paymentMethod,
            paymentStatus: paymentStatus || 'Unpaid',
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId
        });

        if (!newOrder) {
            return res.status(500).json({
                success: false,
                message: 'Failed to create order',
            });
        }

        return res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: newOrder
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error while creating order',
            error: error.message
        });
    }
};


const getAllOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!isValidObjectId(userId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid User Id'
            })
        }

        const userOrders = await Order.find({ userId })

        return res.status(200).json({
            success: true,
            message: 'user order fetched successfully',
            data: userOrders
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error in getting the orders of customer'
        })
    }
}


const getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params;
        if (!isValidObjectId(orderId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid order Id'
            })
        }

        const orderDetails = await Order.findById(orderId)
        if (!orderDetails) {
            return res.status(404).json({
                success: true,
                message: 'Order info doesnnot exist'
            })
        }

        return res.status(200).json({
            success: false,
            message: 'user order fetched successfully',
            data: orderDetails
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error in getting the details of the order'
        })
    }

}


export { createOrder, getAllOrdersByUser, getOrderDetails }