import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { StarIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

function ProductDetailsDialog({ open, setOpen, productDetails }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTitle className='text-3xl font-extrabold'>{productDetails?.title}</DialogTitle>
            <DialogContent className='grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]'>
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
                            Rs. {productDetails?.price}</span>
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
                        <Button className='w-full'>
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
                        <div className='mt-6 flex gap-2'>
                            <Input
                                placeholder="Leave a review"
                                className='border-black'
                            />
                            <Button> Submit </Button>
                        </div>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailsDialog