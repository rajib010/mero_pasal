import mongoose, { Schema } from 'mongoose'

const addressSchema = new Schema({
    userId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
}, {
    timestamps: true
})

export const Address = mongoose.model('address', addressSchema)