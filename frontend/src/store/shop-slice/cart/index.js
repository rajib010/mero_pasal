import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading: false,
    cartItems: []
}

export const addToCart = createAsyncThunk(
    '/products/cart-add',
    async ({ userId, productId, quantity }) => {
        const res = await axios.post(
            `http://localhost:3000/api/shop/cart/add-cart`,
            {
                userId, productId, quantity
            }
        )

        return res?.data
    }
)
export const getCartItems = createAsyncThunk(
    '/products/cart-get',
    async (userId) => {
        const res = await axios.get(
            `http://localhost:3000/api/shop/cart/get-cart/${userId}`
        )

        return res?.data
    }
)
export const updateCartItems = createAsyncThunk(
    '/products/cart-update',
    async ({ userId, productId, quantity }) => {
        const res = await axios.put(
            `http://localhost:3000/api/shop/cart/update-cart`,
            {
                userId, productId, quantity
            }
        )

        return res?.data
    }
)
export const deleteCartItems = createAsyncThunk(
    '/products/cart-delete',
    async ({ userId, productId }) => {
        // console.log(`http://localhost:3000/api/shop/cart/delete-cart/${userId}/${productId}`);
        const res = await axios.delete(
            `http://localhost:3000/api/shop/cart/delete-cart/${userId}/${productId}`
        )
        return res?.data
    }
)


const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state, action) => {
            state.isLoading = true
        })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.cartItems = action.payload?.data
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false
                state.cartItems = []
            })
            .addCase(getCartItems.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.isLoading = false
                state.cartItems = action.payload?.data
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.isLoading = false
                state.cartItems = []
            })
            .addCase(updateCartItems.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(updateCartItems.fulfilled, (state, action) => {
                state.isLoading = false
                state.cartItems = action.payload?.data
            })
            .addCase(updateCartItems.rejected, (state, action) => {
                state.isLoading = false
                state.cartItems = []
            })
            .addCase(deleteCartItems.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deleteCartItems.fulfilled, (state, action) => {
                state.isLoading = false
                state.cartItems = action.payload?.data
            })
            .addCase(deleteCartItems.rejected, (state, action) => {
                state.isLoading = false
                state.cartItems = []
            })
    }
})


export default shoppingCartSlice.reducer