import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { capitalizeFirstWord } from '@/lib/utils'


export function ShoppingProductTile({ product, handleGetProductDetails }) {

    return (
        <Card className='w-full max-w-sm mx-auto'>
            <div onClick={() => handleGetProductDetails(product?._id)}>
                <div className='relative'>
                    <img src={product?.image}
                        alt={product?.title}
                        className='w-full h-[300px] object-cover rounded-t-lg'
                    />
                    {
                        product?.salePrice > 0 ? (
                            <Badge className='absolute top-2 left-2 bg-red-600 hover:bg-red-700'>Sale</Badge>
                        ) : null
                    }
                </div>

                <CardContent className='p-4'>
                    <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
                    <div className='flex justify-between items-center mb-2'>
                        <span className='text-sm text-muted-foreground'>{capitalizeFirstWord(product?.category)}</span>
                        <span className='text-sm text-muted-foreground'>{capitalizeFirstWord(product?.brand)}</span>
                    </div>
                    <div className='flex justify-between items-center mb-2'>
                        <span className={`${product?.salePrice > 0 ? ' line-through text-red-600 ' : ''}text-lg font-semibold text-primary`}>
                            Rs. {product?.price}</span>
                        {
                            product?.salePrice > 0 ? <span className='text-lg text-green-600 font-semibold'>Rs. {product?.salePrice}</span> : null
                        }

                    </div>
                </CardContent>
                <CardFooter>
                    <Button className='w-full'>Add to Cart</Button>
                </CardFooter>
            </div>
        </Card>
    )
}
