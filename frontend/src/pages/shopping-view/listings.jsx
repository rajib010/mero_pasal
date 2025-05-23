import ProductFilter from '@/components/shopping-view/filter'
import { ShoppingProductTile } from '@/components/shopping-view/product-tile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { fetchAllFilteredProducts, getProductDetail } from '@/store/shop-slice/product'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import ProductDetailsDialog from './product-details'
import { addToCart, getCartItems } from '@/store/shop-slice/cart'
import { toast } from '@/hooks/use-toast'


function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}

function Listings() {

  const { isLoading, productList, productDetails } = useSelector((state) => state.shopProducts)
  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch();
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

  function handleSort(value) {
    setSort(value)
  }


  function handleFilters(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }


  function handleGetProductDetails(getCurrentProductId) {
    dispatch(getProductDetail(getCurrentProductId))
  }

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
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters)
      setSearchParams(new URLSearchParams(createQueryString))
    }
  }, [filters])


  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
  }, [])


  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }))
  }, [dispatch, sort, filters])


  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true)
  }, [productDetails])


  return (
    <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6'>
      <ProductFilter filters={filters} handleFilters={handleFilters} />
      <div className='bg-background w-full rounded-lg shadow-sm'>
        <div className='p-4 border-b flex items-center justify-between'>
          <h2 className='text-lg font-extrabold'>All Products</h2>
          <div className='flex items-center gap-3'>
            <span className='text-muted-foreground'>{productList?.length}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='flex items-center gap-1'>
                  <ArrowUpDownIcon className='h-4 w-4' />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-[200px]'>
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {
                    sortOptions.map((option) => (
                      <DropdownMenuRadioItem value={option.id} key={option.id}>
                        {option?.label}
                      </DropdownMenuRadioItem>
                    ))
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
          {
            productList && productList.length > 0 &&
            productList.map((product) => (
              <ShoppingProductTile
                product={product}
                key={product?._id}
                handleGetProductDetails={handleGetProductDetails}
                handleAddtoCart={handleAddtoCart}
              />
            ))
          }
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  )
}

export default Listings