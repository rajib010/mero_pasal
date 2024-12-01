import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth-slice/index.js"
import adminProductsSlice from './admin-slice/product/index.js'
import shopProductsSlice from "./shop-slice/product/index.js"
import shoppingCartSlice from './shop-slice/cart/index.js'
import addressSlice from './shop-slice/address/index.js'
import shoppingOrderSlice from './shop-slice/order/index.js'
import adminDashboardSlice from './admin-slice/dashboard/index.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsSlice,
        shopProducts: shopProductsSlice,
        shopCart: shoppingCartSlice,
        useraddress: addressSlice,
        shopOrder: shoppingOrderSlice,
        adminDashboard: adminDashboardSlice
    }
})

export default store
