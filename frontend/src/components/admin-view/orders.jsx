import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import { AdminOrdersDetailView } from './order-details'


const AdminOrders = () => {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
    return (
        <Card>
            <CardHeader>
                <CardTitle>All Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className='sr-only'>Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>12345</TableCell>
                            <TableCell>12 nov</TableCell>
                            <TableCell>pending</TableCell>
                            <TableCell>$450.33</TableCell>
                            <TableCell>
                                <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                                    <Button onClick={() => setOpenDetailsDialog(true)}>View Details</Button>
                                    <AdminOrdersDetailView />
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>)
}

export default AdminOrders