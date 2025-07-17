import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Dialog, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { AdminOrdersDetailView } from './order-details';
import { getAllOrders, getOrderDetails, clearOrderDetails } from "../../store/admin-slice/order/index";

const AdminOrders = () => {
    const dispatch = useDispatch();
    const { orders, isLoading, error, pagination } = useSelector(state => state.adminOrders);
    
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        orderStatus: '',
        paymentStatus: ''
    });

    useEffect(() => {
        dispatch(getAllOrders({ 
            page: currentPage, 
            limit: 10,
            ...filters 
        }));
    }, [dispatch, currentPage, filters]);

    const handleViewDetails = (orderId) => {
        setSelectedOrderId(orderId);
        dispatch(getOrderDetails(orderId));
        setOpenDetailsDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDetailsDialog(false);
        setSelectedOrderId(null);
        dispatch(clearOrderDetails());
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const getStatusBadgeVariant = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'secondary';
            case 'confirmed':
                return 'default';
            case 'processing':
                return 'default';
            case 'shipped':
                return 'default';
            case 'delivered':
                return 'success';
            case 'cancelled':
                return 'destructive';
            case 'returned':
                return 'destructive';
            default:
                return 'secondary';
        }
    };

    const getPaymentStatusBadgeVariant = (status) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return 'success';
            case 'pending':
                return 'secondary';
            case 'failed':
                return 'destructive';
            case 'refunded':
                return 'outline';
            default:
                return 'secondary';
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

    if (error) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center h-48">
                    <div className="text-center">
                        <p className="text-red-500 mb-2">Error loading orders</p>
                        <p className="text-sm text-gray-600">{error}</p>
                        <Button 
                            onClick={() => dispatch(getAllOrders({ page: 1, limit: 10 }))}
                            className="mt-4"
                        >
                            Try Again
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>All Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Filters */}
                    <div className="mb-4 flex gap-4">
                        <select 
                            value={filters.orderStatus} 
                            onChange={(e) => setFilters({...filters, orderStatus: e.target.value})}
                            className="px-3 py-2 border rounded-md"
                        >
                            <option value="">All Order Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Returned">Returned</option>
                        </select>
                        
                        <select 
                            value={filters.paymentStatus} 
                            onChange={(e) => setFilters({...filters, paymentStatus: e.target.value})}
                            className="px-3 py-2 border rounded-md"
                        >
                            <option value="">All Payment Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Failed">Failed</option>
                            <option value="Refunded">Refunded</option>
                        </select>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center h-48">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Order Date</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Order Status</TableHead>
                                        <TableHead>Payment Status</TableHead>
                                        <TableHead>Total Amount</TableHead>
                                        <TableHead>
                                            <span className='sr-only'>Actions</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8">
                                                No orders found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        orders.map((order) => (
                                            <TableRow key={order._id}>
                                                <TableCell className="font-medium">
                                                    {order._id.slice(-8).toUpperCase()}
                                                </TableCell>
                                                <TableCell>
                                                    {formatDate(order.orderDate)}
                                                </TableCell>
                                                <TableCell>
                                                    {order.addressInfo?.phone || 'N/A'}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={getStatusBadgeVariant(order.orderStatus)}>
                                                        {order.orderStatus}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={getPaymentStatusBadgeVariant(order.paymentStatus)}>
                                                        {order.paymentStatus}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {formatCurrency(order.totalAmount)}
                                                </TableCell>
                                                <TableCell>
                                                    <Button 
                                                        onClick={() => handleViewDetails(order._id)}
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        View Details
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="flex items-center justify-between mt-4">
                                    <div className="text-sm text-gray-600">
                                        Showing {orders.length} of {pagination.totalOrders} orders
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={!pagination.hasPrevPage}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                            Previous
                                        </Button>
                                        <span className="text-sm">
                                            Page {pagination.currentPage} of {pagination.totalPages}
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={!pagination.hasNextPage}
                                        >
                                            Next
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Order Details Dialog */}
            <Dialog open={openDetailsDialog} onOpenChange={handleCloseDialog}>
                <DialogTitle className='sr-only'>Order Details</DialogTitle>
                <AdminOrdersDetailView orderId={selectedOrderId} />
            </Dialog>
        </div>
    );
};

export default AdminOrders;