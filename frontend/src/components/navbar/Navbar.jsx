import React from 'react'
import Logout from '../auth/logout'
import { useSelector } from 'react-redux'

const Navbar = () => {

  const { isAuthenticated } = useSelector((state) => state.auth)
  return (
    <div>
      {isAuthenticated ? <Logout /> : ''}
    </div>
  )
}

export default Navbar