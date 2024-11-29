import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    orderId: null,
    orderList: [],
    orderDetails: null
}

export const createOrder = createAsyncThunk(
    '/products/createOrder',
    async (orderData) => {
        const res = await axios.post('http://localhost:3000/api/shop/order/create',
            orderData
        )
        return res?.data
    }
)

export const getAllOrders = createAsyncThunk(
    'products/getAllOrders',
    async (userId) => {
        const res = await axios.get(
            `http://localhost:3000/api/shop/order/user-orders/${userId}`
        )
        return res?.data
    }
)

export const getOrderDetails = createAsyncThunk(
    'products/getOrderDetails',
    async (orderId) => {
        const res = await axios.get(
            `http://localhost:3000/api/shop/order/order-details/${orderId}`
        )
        return res?.data
    }
)

const shoppingOrderSlice = createSlice({
    name: 'shopOrder',
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            state.orderDetails = null
            state.orderId = null;
            state.orderList = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false
            })
            .addCase(getAllOrders.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderList = action.payload?.data
                
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.isLoading = false
                state.orderId = null
                state.orderList = []
                state.orderDetails = null
            })
            .addCase(getOrderDetails.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false
                orderId = action.payload?.data?._id
                orderDetails = action.payload?.data
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.isLoading = false
                state.orderId = null
                state.orderList = []
                state.orderDetails = null
            })
    }
})

export default shoppingOrderSlice.reducer