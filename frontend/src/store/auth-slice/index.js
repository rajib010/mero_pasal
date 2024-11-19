import { createSlice } from "@reduxjs/toolkit"

//check if the user exists in localstorage

const loaduserfromLocalstorage = () => {
    try {
        const user = localStorage.getItem('authenticated-user')
        return user ? JSON.parse(user) : null
    } catch (error) {
        console.log('Error loading user from localstorage', error);
        return null
    }
}

const initialState = {
    isAuthenticated: !!loaduserfromLocalstorage(),
    isLoading: false,
    user: loaduserfromLocalstorage()
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.isAuthenticated = true,
            state.user = action.payload
            localStorage.setItem('authenticated-user', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.isAuthenticated = false,
            state.user = null
            localStorage.removeItem('authenticated-user')
        }
    }
})

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer