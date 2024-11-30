import React from 'react'
import { Button } from '../ui/button'
import {
  HousePlug, Store, UserRoundCheck, Clock, BabyIcon, User, ShoppingBasket, Footprints, WatchIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../ui/card'

const chooseUsOption = [
  {
    id: 'brands',
    quantity: '20',
    image: Store
  }, {
    id: 'users',
    quantity: '10k',
    image: UserRoundCheck
  }, {
    id: 'products',
    quantity: '1m',
    image: ShoppingBasket
  }, {
    id: 'time',
    quantity: '1 week',
    image: Clock
  }
]

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: User },
  { id: "women", label: "Women", icon: User },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: Footprints },
];

function LandingPage() {
  return (
    <>
      {/* nav section */}
      <nav className='flex px-6 py-3 justify-between items-center border border-b-2'>
        <div className='flex gap-4'>
          <HousePlug />
          <span className='font-bold'>Mero Pasal</span>
        </div>
        <Button>
          <Link to={'/auth/login'}>Login</Link>
        </Button>
      </nav>
      <main className='bg-gray-50 grid grid-cols-1 gap-4'>
        {/* top section */}
        <section className='section-card'>
          <div>
            <h3 className='card-header'>Welcome to Mero Pasal</h3>
            <p className='italic text-center m-2'>"An online platform where you can trust and shop."</p>
          </div>
          <div className='w-full center'>
            <Button className='px-10 py-5 '>
              <Link to={'/auth/register'}>Join Us Now</Link>
            </Button>
          </div>
        </section>

        {/* feature section */}
        <section className='section-card'>
          <h3 className='card-header'>Our Features</h3>
          <div className='grid gap-3 m-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {
              chooseUsOption?.map(option => (
                <Card key={option.id} className='landing-card'>
                  <div className='center'>
                    <option.image className=' w-12 h-12 mb-4' />
                  </div>
                  <p className='center mt-2 font-bold text-lg'>
                    {option.id === 'time' ? 'Delivery with in ' : 'More than '}
                    {option.quantity} {option.id}
                  </p>
                </Card>
              ))
            }
          </div>
        </section>

        {/* categories section*/}

        <section className='section-card'>
          <h3 className='card-header'>Product Categories</h3>
          <div className='grid gap-3 m-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {
              categoriesWithIcon.map(item => (
                <Card key={item.id} className='landing-card'>
                  <div className='center'>
                    <item.icon className=' w-12 h-12 mb-4' />
                  </div>
                    <p className='center mt-2 font-bold text-lg'>
                      {item.label}
                    </p>

                </Card>
              ))
            }
          </div>
        </section>

        {/* footer */}
        <footer className='w-full bg-black'>
          <p className='text-white text-center text-sm py-5 italic'> @All rights reserved. Mero Pasal 2024. </p>
        </footer>
      </main >
    </>
  )
}

export default LandingPage