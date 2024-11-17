import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true,
    },
    role: {
        type: 'string',
        default: 'user'
    },
})

export const User = mongoose.model('user', userSchema)