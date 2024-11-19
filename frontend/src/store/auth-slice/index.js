import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null
}

export const registerUser = createAsyncThunk(
    '/auth/register',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/user/register',
                formData,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Error during registere.';
            return rejectWithValue({ message: errorMessage });
        }
    }
);

export const loginUser = createAsyncThunk(
    '/auth/login',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/user/login',
                formData,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Error during Login';
            return rejectWithValue({ message: errorMessage });
        }
    }
);

export const logoutUser = createAsyncThunk(
    '/auth/logout',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/user/logout',
                {},
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Error during logout';
            return rejectWithValue({ message: errorMessage });
        }
    }
);

export const checkAuth = createAsyncThunk(
    '/auth/checkauth',
    async () => {
        const response = await axios.get('http://localhost:3000/api/user/check-auth', {
            withCredentials: true,
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
            }
        })
        return response.data
    }

)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => { }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false
            })
            .addCase(checkAuth.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer