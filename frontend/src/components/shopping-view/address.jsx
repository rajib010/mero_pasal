import React, { useEffect, useState } from 'react';
import { addressFormControls } from '@/config';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import CommonForm from '../common/form';
import { useDispatch, useSelector } from 'react-redux';
import AddressCard from './addressCard';
import { addNewAddress, getUserAddress, deleteAddress, updateAddress } from '@/store/shop-slice/address';
import { toast } from '@/hooks/use-toast';

const initialAddressFormData = {
    address: '',
    city: '',
    phone: '',
    pincode: '',
    notes: ''
};

function Address({ customClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ' }) {
    const [formData, setFormData] = useState(initialAddressFormData);
    const { addressList } = useSelector(state => state.useraddress);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [currentEditedId, setCurrentEditedId] = useState(null);

    function handleManageAddress(e) {
        e.preventDefault();

        if (!currentEditedId && addressList.length >= 3) {
            toast({
                title: "At most 3 addresses are allowed for a user",
                variant: 'destructive'
            });
            return;
        }

        if (!currentEditedId) {
            dispatch(addNewAddress({
                ...formData,
                userId: user._id
            })).then((data) => {
                if (data.payload?.success) {
                    toast({
                        title: 'Address added successfully'
                    })
                    dispatch(getUserAddress({ userId: user?._id }));
                    setFormData(initialAddressFormData);
                }
            });
        } else {
            dispatch(updateAddress({
                userId: user?._id,
                addressId: currentEditedId,
                formData
            })).then((data) => {
                if (data.payload?.success) {
                    toast({
                        title: 'Post Updated Successfully.'
                    });
                    dispatch(getUserAddress({ userId: user?._id }));
                    setFormData(initialAddressFormData);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setCurrentEditedId(null);
                }
            });
        }
    }

    function handleUpdateAddress(getCurrentAddress) {
        window.scrollTo({ top: 1000, behavior: 'smooth' });
        setCurrentEditedId(getCurrentAddress._id);
        setFormData({
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            phone: getCurrentAddress?.phone,
            pincode: getCurrentAddress?.pincode,
            notes: getCurrentAddress?.notes
        });
    }

    function handleDeleteAddress(addressId) {
        dispatch(deleteAddress({
            addressId,
            userId: user?._id
        })).then((data) => {
            if (data.payload.success) {
                toast({
                    title: 'Address info deleted',
                    variant: 'destructive'
                });
                dispatch(getUserAddress({ userId: user?._id }));
            }
        });
    }

    function isFormValid() {
        return Object.values(formData).every(value => value.trim() !== '');
    }

    useEffect(() => {
        if (user?._id) {
            dispatch(getUserAddress({ userId: user._id }));
        }
    }, [dispatch, user?._id]);

    return (
        <Card>
            <div className={`m-5 p-3 grid gap-3 ${customClass}`}>
                {addressList?.length > 0 &&
                    addressList.map((item) => (
                        <AddressCard
                            addressInfo={item}
                            key={item?._id}
                            handleUpdateAddress={handleUpdateAddress}
                            handleDeleteAddress={handleDeleteAddress}
                        />
                    ))
                }
            </div>
            {(addressList.length < 3 || currentEditedId !== null) ? (
                <>
                    <CardHeader>
                        <CardTitle className='text-center font-bold text-3xl'>
                            {currentEditedId ? 'Update Address' : 'Add Address'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-3'>
                        <CommonForm
                            formControls={addressFormControls}
                            formData={formData}
                            setFormData={setFormData}
                            onSubmit={handleManageAddress}
                            buttonText={currentEditedId ? 'Update Address' : 'Add Address'}
                            isBtnDisabled={!isFormValid()}
                        />
                    </CardContent>
                </>
            ) : null}
        </Card>
    );
}

export default Address;
