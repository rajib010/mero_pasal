import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    orders: [],
    orderDetails: null,
    isLoading: false,
    error: null,
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalOrders: 0,
        hasNextPage: false,
        hasPrevPage: false
    }
}

// Get all orders with pagination and filtering
export const getAllOrders = createAsyncThunk(
    'adminOrders/getAllOrders',
    async ({ page = 1, limit = 10, orderStatus, paymentStatus, userId } = {}) => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            sortBy: 'orderDate',
            sortOrder: 'desc'
        });

        if (orderStatus) params.append('orderStatus', orderStatus);
        if (paymentStatus) params.append('paymentStatus', paymentStatus);
        if (userId) params.append('userId', userId);

        const res = await axios.get(`http://localhost:3000/api/admin/orders?${params}`);
        return res.data;
    }
);

// Get order details by ID
export const getOrderDetails = createAsyncThunk(
    'adminOrders/getOrderDetails',
    async (orderId) => {
        const res = await axios.get(`http://localhost:3000/api/admin/orders/${orderId}`);
        return res.data;
    }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
    'adminOrders/updateOrderStatus',
    async ({ orderId, orderStatus, paymentStatus }) => {
        const updateData = {};
        if (orderStatus) updateData.orderStatus = orderStatus;
        if (paymentStatus) updateData.paymentStatus = paymentStatus;

        const res = await axios.put(`http://localhost:3000/api/admin/orders/${orderId}/status`, updateData);
        return res.data;
    }
);

// Get orders analytics
export const getOrdersAnalytics = createAsyncThunk(
    'adminOrders/getOrdersAnalytics',
    async ({ startDate, endDate, userId } = {}) => {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        if (userId) params.append('userId', userId);

        const res = await axios.get(`http://localhost:3000/api/admin/orders/analytics/summary?${params}`);
        return res.data;
    }
);

const adminOrderSlice = createSlice({
    name: 'adminOrders',
    initialState,
    reducers: {
        clearOrderDetails: (state) => {
            state.orderDetails = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetOrders: (state) => {
            state.orders = [];
            state.pagination = {
                currentPage: 1,
                totalPages: 1,
                totalOrders: 0,
                hasNextPage: false,
                hasPrevPage: false
            };
        }
    },
    extraReducers: (builder) => {
        builder
            // Get all orders
            .addCase(getAllOrders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload.data.orders;
                state.pagination = action.payload.data.pagination;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.orders = [];
            })
            
            // Get order details
            .addCase(getOrderDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderDetails = action.payload.data;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.orderDetails = null;
            })
            
            // Update order status
            .addCase(updateOrderStatus.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedOrder = action.payload.data;
                
                // Update the order in the orders array
                const orderIndex = state.orders.findIndex(order => order._id === updatedOrder._id);
                if (orderIndex !== -1) {
                    state.orders[orderIndex] = updatedOrder;
                }
                
                // Update order details if it's the same order
                if (state.orderDetails && state.orderDetails._id === updatedOrder._id) {
                    state.orderDetails = updatedOrder;
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            
            // Get orders analytics
            .addCase(getOrdersAnalytics.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOrdersAnalytics.fulfilled, (state, action) => {
                state.isLoading = false;
                state.analytics = action.payload.data;
            })
            .addCase(getOrdersAnalytics.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});

export const { clearOrderDetails, clearError, resetOrders } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;