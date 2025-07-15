
import React,{useState} from 'react'
import { DialogContent, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import CommonForm from '../common/form'
import { useDispatch, useSelector } from 'react-redux'

const initialValue = {
    status: " "
}

export const AdminOrdersDetailView = () => {
    const [formData, setFormData] = useState(initialValue)

    function handleUpdateStatus(e) {
        e.preventDefault();

    }

    return (
        <DialogContent className='sm:max-w-[600px] max-h-[95vh]'>
            <DialogTitle>Order Detail</DialogTitle>
            <div className="grid gap-4">
                <div className="grid gap-1">
                    <div className="flex mt-6 items-center justify-between">
                        <p className='font-medium'>Order ID</p>
                        <Label>123456</Label>
                    </div>
                    <div className="flex mt-1 items-center justify-between">
                        <p className='font-medium'>Order Date</p>
                        <Label>19/12/2001</Label>
                    </div>
                    <div className="flex mt-1 items-center justify-between">
                        <p className='font-medium'>Order Status</p>
                        <Label>In process</Label>
                    </div>
                    <div className="flex mt-1 items-center justify-between">
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
                <div>
                    <CommonForm
                        formControls={[
                            {
                                label: 'Order Status',
                                name: "Status",
                                componentType: "select",
                                options: [
                                    { id: "inPending", label: "In Pending" },
                                    { id: "inProcess", label: "In Process" },
                                    { id: "inShipping", label: "In Shipping" },
                                    { id: "rejected", label: "Rejected" },
                                    { id: "delivered", label: "Delivered" },
                                ]
                            }
                        ]}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={'Update Order Status'}
                        onSubmit={handleUpdateStatus}
                    />
                </div>
            </div>
        </DialogContent>
    )
}
