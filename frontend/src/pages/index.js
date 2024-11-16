import AdminLayout from "@/components/admin-view/layout";
import AdminDashboard from "./admin-view/dashboard";
import AdminFeatures from "./admin-view/features";
import AdminOrders from "./admin-view/orders";
import AdminProducts from "./admin-view/products";

import Login from "./auth/login";
import Register from "./auth/register";
import AuthLayout from "@/components/auth/layout";

import NotFound from "./not-found";

import ShoppingLayout from "@/components/shopping-view/layout";
import Account from "./shopping-view/account";
import Checkout from "./shopping-view/checkout";
import Home from "./shopping-view/home";
import Listings from "./shopping-view/listings";

import UnauthPage from "./unauth-page/index.jsx"


export {    AdminDashboard, AdminFeatures, AdminLayout, AdminOrders, AdminProducts ,
            Login, Register,AuthLayout,
            ShoppingLayout, Account, Checkout, Home, Listings,
            NotFound, UnauthPage
}