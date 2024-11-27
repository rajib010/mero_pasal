import React from 'react'
import img from '@/assets/account.jpg'
import Address from '@/components/shopping-view/address'
import { useSelector } from 'react-redux'
import UserCartContents from '@/components/shopping-view/cart-content'
import { Button } from '@/components/ui/button'

function Checkout() {

  const { cartItems } = useSelector(state => state.shopCart)
  let totalAmount = cartItems && cartItems.items && cartItems.items.length > 0 ?
    cartItems.items.reduce((sum, currentItem) => sum + (
      currentItem.salePrice > 0 ? currentItem.salePrice : currentItem.price
    ) * currentItem?.quantity, 0)
    : 0

  return (
    <div className='flex flex-col'>
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt='account image'
          className='h-full w-full object-cover object-center'
        />
      </div>
      <div className='grid  grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5'>
        <Address customClass={' sm:grid-row-1 md:grid-row-2'} />
        <div className='flex flex-col gap-4'>
          {
            cartItems && cartItems.items && cartItems.items.length > 0 ? (
              cartItems.items.map(item => <UserCartContents cartItem={item} />)
            ) : null
          }
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">Rs.{totalAmount}</span>
            </div>
          </div>
          <div className='mt-5'>
          <Button
            className='w-full'
          >Checkout</Button>
        </div>
        </div>
        
      </div>
    </div>
  )
}

export default Checkout