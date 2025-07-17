import { Card } from '@/components/ui/card'
import { getProductsCount, getUsersCount } from '@/store/admin-slice/dashboard'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserIcon, ShoppingBasketIcon, ShirtIcon, TypeIcon, ShoppingBag } from 'lucide-react'

function AdminDashboard() {

  const { isLoading, usersCount, productsCount } = useSelector((state) => state.adminDashboard)
  const dispatch = useDispatch()

  const cardItems = [
    {
      id: 'users',
      label: 'Users',
      count: usersCount,
      icon:UserIcon
    },
    {
      id: 'products',
      label: 'Products',
      count: productsCount,
      icon:ShoppingBasketIcon
    },
    {
      id: 'brands',
      label: 'Brands',
      count: 8,
      icon:ShirtIcon
    },
    {
      id: 'categories',
      label: 'Categories',
      count: 10,
      icon:TypeIcon
    },
    {
      id: 'sales',
      label: 'Sales',
      count: '20',
      icon:ShoppingBag
    },
  ]

  useEffect(() => {
    dispatch(getUsersCount())
    dispatch(getProductsCount())
  }, [dispatch])



  return (
    <main className="center">
      <div className='w-full grid gap-4 sm:grid-cols-2 md:grid-cols-3'>
        {
          cardItems && cardItems.map((item) => (
            <Card className='landing-card' key={item.id}>
              <div className='flex flex-col gap-4 items-center justify-center'>
                <item.icon  className='size-10'/>
              <span className='font-bold text-xl'>Total {item.label}: {item.count}</span>
              </div>
            </Card>
          ))
        }
      </div>
    </main>
  )
}

export default AdminDashboard