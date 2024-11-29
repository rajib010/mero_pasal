import React from 'react'
import { DialogContent, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { useSelector } from 'react-redux'

export const ShoppingOrdersDetailView = ({ orderItem }) => {

    const { user } = useSelector(state => state.auth)

    return (
        <DialogContent className='sm:max-w-[600px]'>
            <DialogTitle>Order Detail</DialogTitle>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex mt-6 items-center justify-between">
                        <p className='font-medium'>Order ID</p>
                        <Label>{orderItem?._id}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className='font-medium'>Order Date</p>
                        <Label>{orderItem?.orderDate.split("T")[0]}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className='font-medium'>Order Status</p>
                        <Label>{orderItem?.orderStatus}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className='font-medium'>Price</p>
                        <Label>{orderItem?.totalAmount}</Label>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className='font-medium'>Order Details</div>
                        <ul className='grid gap-3'>
                            {orderItem?.cartItems && orderItem?.cartItems.length > 0
                                ? orderItem?.cartItems.map((item) => (
                                    <li key={item?._id} className="flex items-center justify-between">
                                        <span>Title: {item.title}</span>
                                        <span>Quantity: {item.quantity}</span>
                                        <span>Price: ${item.price}</span>
                                    </li>
                                ))
                                : null}
                        </ul>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Shipping Info</div>
                        <div className='grid gap-0.5 text-muted-foreground'>
                            <span>{user?.username}</span>
                            <span>{orderItem?.addressInfo?.address}</span>
                            <span>{orderItem?.addressInfo?.city}</span>
                            <span>{orderItem?.addressInfo?.pincode}</span>
                            <span>{orderItem?.addressInfo?.phone}</span>
                            <span>{orderItem?.addressInfo?.notes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
    )
}
