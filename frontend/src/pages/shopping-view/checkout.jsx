import React, { useState } from 'react';
import img from '@/assets/account.jpg';
import Address from '@/components/shopping-view/address';
import { useDispatch, useSelector } from 'react-redux';
import UserCartContents from '@/components/shopping-view/cart-content';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { createOrder } from '@/store/shop-slice/order';
import { useNavigate } from 'react-router-dom';
import { deleteAllCartItems } from '@/store/shop-slice/cart';

function Checkout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
        (sum, currentItem) =>
          sum +
          ((currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem.price) * currentItem.quantity),
        0
      )
      : 0;

  const handleCheckout = () => {
    if (currentSelectedAddress === null) {
      toast({
        title: 'Please select an address',
        variant: 'destructive',
      });
      return;
    }

    const orderData = {
      userId: user?._id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: 'pending',
      paymentMethod: 'esewa',
      paymentStatus: 'pending',
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: '12345',
      payerId: '56789',
    };

    dispatch(createOrder(orderData)).then((data) => {
      if (data.payload?.success) {
        toast({
          title: 'Checkout complete',
          message: 'Thank you for shopping with us',
        });
        dispatch(deleteAllCartItems(user?._id))
        navigate('/shop/account');
      }
    });
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt="account image"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          currentSelectedAddress={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
          customClass="sm:grid-row-1 md:grid-row-2"
        />
        <div className="flex flex-col gap-4">
          {cartItems &&
            cartItems.items &&
            cartItems.items.length > 0 &&
            cartItems.items.map((item) => (
              <UserCartContents key={item.productId} cartItem={item} />
            ))}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">Rs.{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-5">
            <Button className="w-full" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
