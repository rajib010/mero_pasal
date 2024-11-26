import React, { useEffect, useState } from 'react'
import { addressFormControls } from '@/config'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '../common/form'
import { useDispatch, useSelector } from 'react-redux'
import AddressCard from './addressCard'
import { addNewAddress, getUserAddress, deleteAddress, updateAddress } from '@/store/shop-slice/address'
import { toast } from '@/hooks/use-toast'

const intialAddressFormData = {
    address: '',
    city: '',
    phone: '',
    pincode: '',
    notes: ''
}

function Address() {

    const [formData, setFormData] = useState(intialAddressFormData)
    const { addressList } = useSelector(state => state.useraddress)
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const [currentEditedId, setCurrentEditedId] = useState(null)

    function handleManageAddress(e) {
        e.preventDefault()
        if (!currentEditedId) {
            dispatch(addNewAddress({
                ...formData,
                userId: user._id
            })).then((data) => {
                if (data.payload?.success) {
                    dispatch(getUserAddress({ userId: user?._id }))
                    setFormData(intialAddressFormData)
                }
            })
        } else {
            dispatch(updateAddress({
                userId: user?._id,
                addressId: currentEditedId,
                formData
            })).then((data) => {
                if (data.payload?.success) {
                    toast({
                        title: 'Post Updated Successfully.'
                    })
                    dispatch(getUserAddress({ userId: user?._id }))
                    setFormData(intialAddressFormData)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    setCurrentEditedId(null)
                }
            })
        }
    }

    function handleUpdateAddress(getCurrentAddress) {
        window.scrollTo({ top: 1000, behavior: 'smooth' })
        setCurrentEditedId(getCurrentAddress._id)
        setFormData({
            ...formData,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            phone: getCurrentAddress?.phone,
            pincode: getCurrentAddress?.pincode,
            notes: getCurrentAddress?.notes
        })
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
                dispatch(getUserAddress({ userId: user?._id }))
            }
        })
    }

    function isFormValid() {
        return Object.values(formData).every(value => value.trim() !== '');
    }

    useEffect(() => {
        dispatch(getUserAddress({ userId: user?._id }))
    }, [dispatch])

    return (
        <Card>
            <div className='m-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
                {
                    addressList && addressList.length > 0 ?
                        addressList.map((item) =>
                            <AddressCard
                                addressInfo={item}
                                key={item?._id}
                                handleUpdateAddress={handleUpdateAddress}
                                handleDeleteAddress={handleDeleteAddress}
                            />
                        ) : null
                }
            </div>
            <CardHeader>
                <CardTitle className='text-center font-bold text-3xl'>{currentEditedId ? 'Update address' : 'Add Address'}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
                <CommonForm
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleManageAddress}
                    buttonText={currentEditedId ? 'Update address' : 'Add Address'}
                    isBtnDisabled={!isFormValid()}
                />
            </CardContent>
        </Card>
    )
}

export default Address