import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DialogContent, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Loader2 } from 'lucide-react';
import CommonForm from '../common/form';
import { updateOrderStatus } from "../../store/admin-slice/order"

const initialFormData = {
    orderStatus: '',
    paymentStatus: ''
};

export const AdminOrdersDetailView = ({ orderId }) => {
    const dispatch = useDispatch();
    const { orderDetails, isLoading } = useSelector(state => state.adminOrders);
    
    const [formData, setFormData] = useState(initialFormData);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (orderDetails) {
            setFormData({
                orderStatus: orderDetails.orderStatus || '',
                paymentStatus: orderDetails.paymentStatus || ''
            });
        }
    }, [orderDetails]);

    const handleUpdateStatus = async (e) => {
        e.preventDefault();
        if (!orderId) return;

        setIsUpdating(true);
        try {
            await dispatch(updateOrderStatus({
                orderId,
                orderStatus: formData.orderStatus,
                paymentStatus: formData.paymentStatus
            })).unwrap();
        } catch (error) {
            console.error('Error updating order status:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NPR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    if (isLoading || !orderDetails) {
        return (
            <DialogContent className='sm:max-w-[600px] max-h-[95vh]'>
                <div className="flex items-center justify-center h-48">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            </DialogContent>
        );
    }

    return (
        <DialogContent className='sm:max-w-[600px] max-h-[95vh] overflow-y-auto'>
            <DialogTitle>Order Details</DialogTitle>
            <div className="grid gap-4">
                {/* Order Information */}
                <div className="grid gap-2">
                    <div className="flex mt-6 items-center justify-between">
                        <p className='font-medium'>Order ID</p>
                        <Label className="font-mono text-sm">
                            {orderDetails._id.slice(-8).toUpperCase()}
                        </Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className='font-medium'>Order Date</p>
                        <Label>{formatDate(orderDetails.orderDate)}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className='font-medium'>Last Updated</p>
                        <Label>{formatDate(orderDetails.orderUpdateDate)}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className='font-medium'>Order Status</p>
                        <Badge variant={orderDetails.orderStatus === 'Delivered' ? 'success' : 'default'}>
                            {orderDetails.orderStatus}
                        </Badge>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className='font-medium'>Payment Status</p>
                        <Badge variant={orderDetails.paymentStatus === 'Paid' ? 'success' : 'secondary'}>
                            {orderDetails.paymentStatus}
                        </Badge>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className='font-medium'>Payment Method</p>
                        <Label>{orderDetails.paymentMethod}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className='font-medium'>Total Amount</p>
                        <Label className="font-semibold">
                            {formatCurrency(orderDetails.totalAmount)}
                        </Label>
                    </div>
                    {orderDetails.paymentId && (
                        <div className="flex mt-2 items-center justify-between">
                            <p className='font-medium'>Payment ID</p>
                            <Label className="font-mono text-sm">
                                {orderDetails.paymentId}
                            </Label>
                        </div>
                    )}
                </div>

                <Separator />

                {/* Order Items */}
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className='font-medium'>Order Items</div>
                        <div className='grid gap-3'>
                            {orderDetails.cartItems?.map((item, index) => (
                                <div key={item._id || index} className="flex items-center gap-4 p-3 border rounded-lg">
                                    {item.image && (
                                        <img 
                                            src={item.image} 
                                            alt={item.title}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-medium">{item.title}</p>
                                                <p className="text-sm text-gray-600">
                                                    Quantity: {item.quantity}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Price: {formatCurrency(item.price)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">
                                                    {formatCurrency(item.price * item.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Shipping Information */}
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Shipping Information</div>
                        <div className='grid gap-1 text-sm'>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Address:</span>
                                <span>{orderDetails.addressInfo?.address || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">City:</span>
                                <span>{orderDetails.addressInfo?.city || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Pincode:</span>
                                <span>{orderDetails.addressInfo?.pincode || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Phone:</span>
                                <span>{orderDetails.addressInfo?.phone || 'N/A'}</span>
                            </div>
                            {orderDetails.addressInfo?.notes && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Notes:</span>
                                    <span className="text-right max-w-xs">
                                        {orderDetails.addressInfo.notes}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Update Status Form */}
                <div>
                    <CommonForm
                        formControls={[
                            {
                                label: 'Order Status',
                                name: "orderStatus",
                                componentType: "select",
                                options: [
                                    { id: "Pending", label: "Pending" },
                                    { id: "Confirmed", label: "Confirmed" },
                                    { id: "Processing", label: "Processing" },
                                    { id: "Shipped", label: "Shipped" },
                                    { id: "Delivered", label: "Delivered" },
                                    { id: "Cancelled", label: "Cancelled" },
                                    { id: "Returned", label: "Returned" },
                                ]
                            },
                            {
                                label: 'Payment Status',
                                name: "paymentStatus",
                                componentType: "select",
                                options: [
                                    { id: "Pending", label: "Pending" },
                                    { id: "Paid", label: "Paid" },
                                    { id: "Failed", label: "Failed" },
                                    { id: "Refunded", label: "Refunded" },
                                ]
                            }
                        ]}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={isUpdating ? 'Updating...' : 'Update Order Status'}
                        onSubmit={handleUpdateStatus}
                        isButtonDisabled={isUpdating}
                    />
                </div>
            </div>
        </DialogContent>
    );
};