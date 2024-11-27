import React from 'react'
import { DialogContent, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'

export const ShoppingOrdersDetailView = () => {

    return (
        <DialogContent className='sm:max-w-[600px]'>
            <DialogTitle>Order Detail</DialogTitle>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex mt-6 items-center justify-between">
                        <p className='font-medium'>Order ID</p>
                        <Label>123456</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className='font-medium'>Order Date</p>
                        <Label>19/12/2001</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className='font-medium'>Order Status</p>
                        <Label>In process</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className='font-medium'>Price</p>
                        <Label>Rs. 50000</Label>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className='font-medium'>Order Details</div>
                        <ul className='grid gap-3'>
                            <li className='flex items-center justify-between'>
                                <span>Product One</span>
                                <span>Rs. 1000</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Shipping Info</div>
                        <div className='grid gap-0.5 text-muted-foreground'>
                            <span>Name</span>
                            <span>Address</span>
                            <span>City</span>
                            <span>Pincode</span>
                            <span>Phone Number</span>
                            <span>Notes</span>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
    )
}
