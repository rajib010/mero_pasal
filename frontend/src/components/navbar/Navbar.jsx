import React from 'react'
import Logout from '../auth/logout'
import { useSelector } from 'react-redux'

const Navbar = () => {

  const { isAuthenticated, loading } = useSelector((state) => state.auth)
  return (
    <div>
      {isAuthenticated ? <Logout /> : ''}
    </div>
  )
}

export default Navbar