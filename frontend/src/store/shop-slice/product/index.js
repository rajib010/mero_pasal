import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: []
}

export const fetchAllFilteredProducts = createAsyncThunk(
    '/products/fetchAllFilteredProducts',
    async () => {
        const result = await axios.get('http://localhost:3000/api/shop/products/get')
        return result?.data;
    }
)

const shopProductsSlice = createSlice({
    name: 'shopProducts',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllFilteredProducts.pending, (state, action) => {
            state.isLoading = true
        })
            .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.productList = action.payload?.data
            })
            .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
                state.isLoading = false
                state.productList = []
            })

    }
})


export default shopProductsSlice.reducer