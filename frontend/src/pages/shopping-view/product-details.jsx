import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { StarIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getCartItems } from '@/store/shop-slice/cart'
import { toast } from '@/hooks/use-toast'
import { setProductDetails } from '@/store/shop-slice/product'

function ProductDetailsDialog({ open, setOpen, productDetails }) {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

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
    function handleDialogClose() {
        setOpen(false)
        dispatch(setProductDetails())
    }

    return (
        <Dialog className="" open={open} onOpenChange={handleDialogClose}>
            <DialogTitle className='text-3xl font-extrabold'>{productDetails?.title ?? ""}</DialogTitle>
            <DialogContent className='grid grid-cols-2 gap-8 max-h-[90vh] overflow-scroll sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]'>
                <div className='relative overflow-hidden rounded-lg'>
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        width={600}
                        height={600}
                        className='aspect-square w-full object-cover'
                    />
                </div>

                <div className=''>
                    <div>
                        <h1 className='text-3xl font-extrabold'>{productDetails?.title}</h1>
                        <p className='text-muted-foreground'>{productDetails?.description}</p>
                    </div>
                    <div className='flex justify-between  mb-2'>
                        <span className={`${productDetails?.salePrice > 0 ? ' line-through text-red-600 ' : ''}text-lg font-semibold text-primary`}>
                            Rs.{productDetails?.price}</span>
                        {
                            productDetails?.salePrice > 0 ? <span className='text-lg text-green-600 font-semibold'>Rs. {productDetails?.salePrice}</span> : null
                        }

                    </div>

                    <div className='flex items-center gap-1.5 mt-2'>
                        <StarIcon className='w-5 h-5 fill-primary' />
                        <StarIcon className='w-5 h-5 fill-primary' />
                        <StarIcon className='w-5 h-5 fill-primary' />
                        <StarIcon className='w-5 h-5 fill-primary' />
                        <StarIcon className='w-5 h-5 fill-primary' />
                        <span className='text-muted-foreground'>4.7</span>
                    </div>
                    <div className='mt-5'>
                        <Button
                            onClick={() => handleAddtoCart(productDetails?._id)}
                            className='w-full'>
                            Add to Cart
                        </Button>
                    </div>
                    <Separator />
                    <div className='max-h-[300px] overflow-auto mt-5'>
                        <h2 className='text-xl font-bold mb-4'>Reviews</h2>
                        <div className='grid gap-6'>
                            <div className='flex gap-4'>
                                <Avatar className='w-10 h-10 border'>
                                    <AvatarFallback>RJ</AvatarFallback>
                                </Avatar>
                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-bold'>Rajib Pokhrel</h3>
                                    </div>
                                    <div className='flex items-center gap-0.5 mt-2'>
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                    </div>
                                    <p className='text-muted-foreground'>Review of the product.</p>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailsDialog