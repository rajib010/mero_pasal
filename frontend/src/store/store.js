import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth-slice/index.js"
import adminProductsSlice from './admin-slice/product/index.js'

const store = configureStore({
    reducer:{
        auth: authReducer,
        adminProducts: adminProductsSlice,
    }
})

export default store
