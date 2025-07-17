import React from 'react'
import { DialogContent, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { useSelector } from 'react-redux'

export const ShoppingOrdersDetailView = ({ orderItem }) => {
  const { user } = useSelector((state) => state.auth)

  const formattedDate = orderItem?.orderDate
    ? new Date(orderItem.orderDate).toLocaleDateString()
    : 'N/A'

  return (
    <DialogContent className='sm:max-w-[600px]'>
      <DialogTitle>Order Detail</DialogTitle>
      <div className="grid gap-6">
        {/* Basic Order Info */}
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className='font-medium'>Order ID</p>
            <Label>{orderItem?._id || 'N/A'}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className='font-medium'>Order Date</p>
            <Label>{formattedDate}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className='font-medium'>Order Status</p>
            <Label>{orderItem?.orderStatus || 'N/A'}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className='font-medium'>Total Amount</p>
            <Label>Rs. {orderItem?.totalAmount?.toFixed(2) || '0.00'}</Label>
          </div>
        </div>

        <Separator />

        {/* Cart Items */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className='font-medium'>Order Details</div>
            {orderItem?.cartItems?.length > 0 ? (
              <ul className='grid gap-3'>
                {orderItem.cartItems.map((item, index) => (
                  <li
                    key={item.productId || index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between text-sm"
                  >
                    <span><strong>Title:</strong> {item?.title || 'N/A'}</span>
                    <span><strong>Quantity:</strong> {item?.quantity || 0}</span>
                    <span><strong>Price:</strong> Rs. {item?.price || '0.00'}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No items in this order.</p>
            )}
          </div>
        </div>

        <Separator />

        {/* Shipping Info */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className='grid gap-0.5 text-muted-foreground text-sm'>
              <span>{user?.username || 'N/A'}</span>
              <span>{orderItem?.addressInfo?.address || 'N/A'}</span>
              <span>{orderItem?.addressInfo?.city || 'N/A'}</span>
              <span>{orderItem?.addressInfo?.pincode || 'N/A'}</span>
              <span>{orderItem?.addressInfo?.phone || 'N/A'}</span>
              {orderItem?.addressInfo?.notes && (
                <span><em>Note:</em> {orderItem.addressInfo.notes}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  )
}
