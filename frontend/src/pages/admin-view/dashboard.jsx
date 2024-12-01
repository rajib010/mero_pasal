import { Card } from '@/components/ui/card'
import { getProductsCount, getUsersCount } from '@/store/admin-slice/dashboard'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function AdminDashboard() {

  const { isLoading, usersCount, productsCount } = useSelector((state) => state.adminDashboard)
  const dispatch = useDispatch()

  const cardItems = [
    {
      id: 'users',
      label: 'Users',
      count: usersCount
    },
    {
      id: 'products',
      label: 'Products',
      count: productsCount
    },
    {
      id: 'brands',
      label: 'Brands',
      count: 8
    },
    {
      id: 'categories',
      label: 'Categories',
      count: 10
    },
    {
      id: 'sales',
      label: 'Sales',
      count: '100k+'
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
              <span className='font-bold text-xl'>Total {item.label}: {item.count}</span>
            </Card>
          ))
        }
      </div>
    </main>
  )
}

export default AdminDashboard