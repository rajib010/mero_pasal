
import { Card, CardContent, CardFooter } from '../ui/card'

import { Button } from '../ui/button'
import { ProductDeleteButton } from './deleteConfirmation'

export function AdminProductTile({ product, setOpenCreateProductsDialog, setFormData, setCurrentEditedId, handleDelete }) {

    return (
        <Card className='w-full max-w-sm mx-auto cursor-pointer'>
            <div>
                <div className='relative'>
                    <img src={product?.image}
                        alt={product?.title}
                        className='w-full h-[200px] object-cover rounded-t-lg'
                    />
                </div>
                <CardContent>
                    <h2 className='text-xl font-bold my-3 line-clamp-1'>{product?.title}</h2>
                    <div className='flex justify-between items-center mb-2'>
                        <span
                            className={`text-lg font-semibold ${product?.salePrice > 0 ? ' line-through text-red-600 ' : ' text-primary '}`}>
                            Rs. {product?.price}
                        </span>
                        {
                            product?.salePrice > 0 ? (
                                <span className='text-lg font-bold text-green-600'>Rs. {product?.salePrice}</span>
                            ) : null
                        }
                    </div>
                </CardContent>
                <CardFooter className='flex justify-between items-center'>
                    <Button onClick={() => {
                        setOpenCreateProductsDialog(true)
                        setCurrentEditedId(product?._id)
                        setFormData(product)
                    }}>Edit</Button>
                <ProductDeleteButton productId={product?._id} />
                </CardFooter>
            </div>
        </Card>
    )
}
