import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { useDispatch } from 'react-redux';
import { deleteProduct, fetchAllProducts } from '@/store/admin-slice/product/index';
import { Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function ProductDeleteButton({ productId }) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteProduct(productId))
            .then(data => {
                toast({
                    title:'Product deleted.'
                })
                if (data?.payload?.success) {
                    dispatch(fetchAllProducts());
                }
            });
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <button className="btn btn-danger">
                    <Trash2 color='red'/>
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. The product will be permanently deleted.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
