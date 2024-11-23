import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: [],
    productDetails: null
}

export const fetchAllFilteredProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async ({ filterParams, sortParams }) => {
        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams,
        });
        const result = await axios.get(
            `http://localhost:3000/api/shop/products/get?${query}`
        );

        return result?.data;
    }
);

export const getProductDetail = createAsyncThunk(
    "/products/getProductDetail",
    async (productId) => {
        const result = await axios.get(
            `http://localhost:3000/api/shop/products/getproduct/${productId}`
        );
        return result?.data
    }
)


const shopProductsSlice = createSlice({
    name: 'shopProducts',
    initialState,
    reducers: {
        setProductDetails: (state, action) => {
            state.productDetails = null
        }
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
            .addCase(getProductDetail.pending, (state, action) => {
                state.isLoading = true
                state.productDetails = []
            })
            .addCase(getProductDetail.fulfilled, (state, action) => {
                state.isLoading = false
                state.productDetails = action.payload?.data
            })
            .addCase(getProductDetail.rejected, (state, action) => {
                state.isLoading = false
                state.productDetails = []
            })

    }
})

export const { setProductDetails } = shopProductsSlice.actions

export default shopProductsSlice.reducer