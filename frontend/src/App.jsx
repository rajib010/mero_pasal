import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import CheckAuth from './components/common/check-auth'
import { Navbar } from './components'
import { useDispatch, useSelector } from 'react-redux'
import { Skeleton } from "@/components/ui/skeleton"
import {
  AdminDashboard, AdminFeatures, AdminLayout, AdminOrders, AdminProducts,
  Register, Login, AuthLayout,
  ShoppingLayout, Account, Listings, Checkout, Home,
  NotFound,
  UnauthPage

} from './pages'
import { checkAuth } from './store/auth-slice'
import { Loader } from 'lucide-react'

function App() {

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (loading) return <Skeleton className="w-[100vw] h-[100vh] bg-black" />


  return (
    <div className='flex flex-col overflow-hidden bg-white'>

      {/* if logged in show navbar else not */}
      {/* <Navbar /> */}
      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='features' element={<AdminFeatures />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='products' element={<AdminProducts />} />
        </Route>

        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path='home' element={<Home />} />
          <Route path='listing' element={<Listings />} />
          <Route path='account' element={<Account />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>

        <Route path='/unauth-page' element={<UnauthPage />} />
        <Route path="*" element={<NotFound />}>

        </Route>
      </Routes>
    </div>
  )
}

export default App