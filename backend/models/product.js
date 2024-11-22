import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
}, {
    timestamps: true
})

export const Product = mongoose.model('product', productSchema)