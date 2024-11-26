import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isLoading: false,
    addressList: []
}

export const addNewAddress = createAsyncThunk(
    '/address/addnew-address',
    async (formData) => {
        const response = await axios.post(
            `http://localhost:3000/api/user/address/add-address`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        return response.data
    }
)

export const getUserAddress = createAsyncThunk(
    `address/getuser-address`,
    async ({ userId }) => {
        const response = await axios.get(
            `http://localhost:3000/api/user/address/get-address/${userId}`
        )

        return response.data
    }
)

export const updateAddress = createAsyncThunk(
    `address/update-address`,
    async ({ userId, addressId, formData }) => {
        const response = await axios.put(
            `http://localhost:3000/api/user/address/update-address/${userId}/${addressId}`,
            formData
        )
        return response.data
    }
)
export const deleteAddress = createAsyncThunk(
    `address/delete-address`,
    async ({ userId, addressId }) => {
        const response = await axios.delete(
            `http://localhost:3000/api/user/address/delete-address/${userId}/${addressId}`
        )
        return response.data
    }
)


const addressSlice = createSlice({
    name: 'useraddress',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewAddress.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addNewAddress.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(addNewAddress.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(getUserAddress.pending, (state) => {
                state.isLoading = true
                state.addressList = []
            })
            .addCase(getUserAddress.fulfilled, (state, action) => {
                state.isLoading = false
                state.addressList = action.payload?.data
            })
            .addCase(getUserAddress.rejected, (state) => {
                state.isLoading = false
                state.addressList = []
            })
    }
})


export const { } = addressSlice.reducer
export default addressSlice.reducer