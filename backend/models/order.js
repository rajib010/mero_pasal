import mongoose,{ Schema } from "mongoose";

const orderSchema = new Schema({
    userId: { type: String, required: true },
    cartItems: [
        {
            productId: { type: String, required: true },
            title: { type: String, required: true },
            image: String,
            price: { type: String, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    addressInfo: {
        addressId: String,
        address: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: String, required: true },
        phone: { type: String, required: true },
        notes: String
    },
    orderStatus: { type: String, default: 'Pending' },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, default: 'Unpaid' },
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    orderUpdateDate: { type: Date, default: Date.now },
    paymentId: String,
    payerId: String
});

export const Order = mongoose.model('order', orderSchema);
