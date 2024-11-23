import React, { useEffect, useState } from 'react'
import img1 from '../../assets/banner1.webp'
import img3 from '../../assets/banner2.webp'
import img4 from '../../assets/banner3.webp'
import { Button } from '@/components/ui/button'
import {
  Airplay, BabyIcon, ChevronLeftIcon, ChevronRightIcon, Check, Heater, Images,
  User, ShoppingBasket, Footprints, WashingMachine, WatchIcon, ChartNoAxesColumnIncreasing
} from "lucide-react";
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts } from '@/store/shop-slice/product'
import { ShoppingProductTile } from '@/components/shopping-view/product-tile'
import { getProductDetail } from '@/store/shop-slice/product'
import { useNavigate } from 'react-router-dom'
import { toast } from '@/hooks/use-toast'
import { addToCart, getCartItems } from '@/store/shop-slice/cart'
import ProductDetailsDialog from './product-details'


const categoriesWithIcon = [
  { id: "men", label: "Men", icon: User },
  { id: "women", label: "Women", icon: User },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: Footprints },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Check },
  { id: "adidas", label: "Adidas", icon: ChartNoAxesColumnIncreasing },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

const Home = () => {

  const slides = [img1, img3, img4];
  const [currentSlide, setCurrentSlide] = useState(0)
  const { productList, productDetails } = useSelector(state => state.shopProducts)
  const { user } = useSelector(state => state.auth)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleNavigateToListing(getCurrentItem, section) {
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section]: [getCurrentItem.id]
    }
    sessionStorage.setItem('filters', JSON.stringify(currentFilter))
    navigate(`/shop/listing`)
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(getProductDetail(getCurrentProductId))
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true)
  }, [productDetails])

  function handleAddtoCart(productId) {
    const userId = user?._id
    dispatch(addToCart({ userId, productId, quantity: 1 }))
      .then((data) => {
        if (data.payload?.success) {
          toast({
            title: "Item added to Cart"
          })
          dispatch(getCartItems(userId))
        }
      })
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }))
  }, [dispatch])

  return (
    <div className='flex flex-col min-h-screen'>
      <div className="w-full relative h-[600px] overflow-hidden">
        {
          slides.map((slide, i) => (
            <img
              src={slide}
              alt={`image${i}`}
              key={i}
              className={`${i === currentSlide ? 'opacity-100 ' : 'opacity-0 '}
                  absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
            />
          ))}
        <Button variant='outline'
          size='icon'
          className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80'
          onClick={() => setCurrentSlide(prevSlide => (prevSlide - 1 + slides.length) % slides.length)}
        >
          <ChevronLeftIcon className='w-4 h-4' />
        </Button>

        <Button variant='outline'
          size='icon'
          className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80'
          onClick={() => setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length)}
        >
          <ChevronRightIcon className='w-4 h-4' />
        </Button>
      </div>

      <section className='py-12 bg-gray-50'>
        <div className="container mx-auto px-4">
          <h2 className='text-3xl font-bold text-center mb-8'>Shop By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {
              categoriesWithIcon.map(categoryItem => (
                <Card
                  onClick={() => handleNavigateToListing(categoryItem, 'Category')}
                  key={categoryItem.id}
                  className='cursor-pointer hover:shadow-lg transition-shadow'>
                  <CardContent className='flex flex-col items-center justify-center p-6'>
                    <categoryItem.icon className={`${categoryItem.id === 'women' ? ' text-pink-500 ' : ' text-primary '} w-12 h-12 mb-4 `} />
                    <span className='font-bold'>{categoryItem.label}</span>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </section>

      <section className='py-12 bg-gray-50'>
        <div className="container mx-auto px-4">
          <h2 className='text-3xl font-bold text-center mb-8'>Brand with Icons</h2>
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {
              brandsWithIcon.map(brandItem => (
                <Card
                  key={brandItem.id}
                  className='cursor-pointer hover:shadow-lg transition-shadow'
                  onClick={() => handleNavigateToListing(brandItem, 'Brand')}
                >
                  <CardContent className='flex flex-col items-center justify-center p-6'>
                    <brandItem.icon className='w-12 h-12 mb-4 text-primary' />
                    <span className='font-bold'>{brandItem.label}</span>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </section>

      <section className='py-12 bg-gray-50'>
        <div className="container mx-auto px-4">
          <h2 className='text-3xl font-bold text-center mb-8'>Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
              productList && productList.length > 0 ?
                productList.map(productItem => (
                  <ShoppingProductTile
                    key={productItem?._id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                )) : null
            }
          </div>
        </div>
        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}

        />
      </section>
    </div>
  )
}

export default Home