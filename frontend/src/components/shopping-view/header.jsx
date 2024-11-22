import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewMenuHeaderItems } from '@/config'
import { DropdownMenu, DropdownMenuItem } from '../ui/dropdown-menu'
import { DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from '@/store/auth-slice'
import UserCartWrapper from './cart-wrapper'
import { getCartItems } from '@/store/shop-slice/cart'


function MenuItems() {
  return (
    <nav className='flex flex-col mb-3 lg:mb-2 lg:items-center gap-6 lg:flex-row'>
      {
        shoppingViewMenuHeaderItems?.map((menuItem) => (
          <Link
            className='text-sm font-medium'
            key={menuItem?.id}
            to={menuItem.path}
          >
            {menuItem?.label}
          </Link>
        ))
      }
    </nav>
  )
}

function HeaderRightContent({ user }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [openCartSheet, setOpenCartSheet] = useState(false)
  const { cartItems } = useSelector(state => state.shopCart)


  function handleLogout() {
    dispatch(logoutUser())
  }

  useEffect(() => {
    dispatch(getCartItems(user?._id))
  }, [dispatch])

  return (
    <div className='flex lg:items-center flex-col md:flex-row gap-4'>
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() =>
            setOpenCartSheet(true)
          } variant='outline'
          size='icon'>
          <ShoppingCart className='w-6 h-6' />
          <span className='sr-only'>Cart Icon</span>
        </Button>
        <UserCartWrapper
          cartItems={cartItems &&
            cartItems.items &&
            cartItems.items.length > 0 ?
            cartItems.items :
            []} />
      </Sheet>
      <DropdownMenu className='mt-10'>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}


export default function ShoppingHeader() {

  const { isAuthenticated, user } = useSelector((state) => state.auth)
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to={'/shop/home'} className='flex items-center gap-2'>
          <HousePlug className='h-6 w-6' />
          <span className='font-bold'>Mero Pasal</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className='lg:hidden'>
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Toggle Header</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='w-full max-w-xs'>
            <MenuItems />
            <HeaderRightContent user={user} />
          </SheetContent>
        </Sheet>
        <div className='hidden lg:block'>
          <MenuItems />
        </div>
        <div className='hidden lg:block'>
          <HeaderRightContent user={user} />
        </div>
      </div>
    </header>
  )
}

