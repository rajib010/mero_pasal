import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    usersCount: null,
    productsCount: null,
    salesCount:null
}

export const getUsersCount = createAsyncThunk(
    'dashboard/getUsersCount',
    async () => {
        const res = await axios.get('http://localhost:3000/api/dashboard/users-count')
        return res?.data
    }
)

export const getProductsCount = createAsyncThunk(
    'dashboard/getProductsCount',
    async () => {
        const res = await axios.get('http://localhost:3000/api/dashboard/products-count')
        return res?.data
    }
)
export const getSalesCount = createAsyncThunk(
    'dashboard/getSalesCount',
    async () => {
        const res = await axios.get('http://localhost:3000/api/dashboard/sales-count')
        return res?.data
    }
)

const adminDashboardSlice = createSlice({
    name: 'adminDashboard',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsersCount.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getUsersCount.fulfilled, (state, action) => {
                state.isLoading = false
                state.usersCount = action.payload?.data
            })
            .addCase(getUsersCount.rejected, (state, action) => {
                state.isLoading = false
                state.usersCount = null
            })
            .addCase(getProductsCount.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getProductsCount.fulfilled, (state, action) => {
                state.isLoading = false
                state.productsCount = action.payload?.data
            })
            .addCase(getProductsCount.rejected, (state, action) => {
                state.isLoading = false
                state.productsCount = null
            })
            .addCase(getSalesCount.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getSalesCount.fulfilled, (state, action) => {
                state.isLoading = false
                state.salesCount = action.payload?.data
            })
            .addCase(getSalesCount.rejected, (state, action) => {
                state.isLoading = false
                state.salesCount = null
            })
    }
})


export default adminDashboardSlice.reducer