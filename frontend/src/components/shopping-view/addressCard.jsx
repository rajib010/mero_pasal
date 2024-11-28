import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'


function AddressCard({ addressInfo, handleUpdateAddress, handleDeleteAddress , setCurrentSelectedAddress, currentSelectedAddress}) {
    return (
        <Card
            onClick={
                setCurrentSelectedAddress
                    ? () => setCurrentSelectedAddress(addressInfo)
                    : null
            }
            className={` pt-5 cursor-pointer border-red-700 ${currentSelectedAddress?._id === addressInfo?._id
                ? "border-red-900 border-[4px]"
                : "border-black"
                }`}>
            <CardContent className='grid gap-4'>
                <Label>Address: {addressInfo?.address}</Label>
                <Label>City: {addressInfo?.city}</Label>
                <Label>Pincode: {addressInfo?.pincode}</Label>
                <Label>Phone: {addressInfo?.phone}</Label>
                <Label>Notes: {addressInfo?.notes}</Label>
            </CardContent>
            <CardFooter className='grid grid-cols-3 gap-4'>
                <Button onClick={() => handleUpdateAddress(addressInfo)}>Edit</Button>
                <Button variant='destructive' onClick={() => handleDeleteAddress(addressInfo._id)}>Delete</Button>
            </CardFooter>
        </Card>
    )
}

export default AddressCard