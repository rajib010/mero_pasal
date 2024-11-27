import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import UserCartContents from "./cart-content"


function UserCartWrapper({ cartItems, setOpenCartSheet }) {

    const navigate = useNavigate();
    let totalAmount = cartItems && cartItems.length > 0 ?
        cartItems.reduce((sum, currentItem) => sum + (
            currentItem.salePrice > 0 ? currentItem.salePrice : currentItem.price
        ) * currentItem?.quantity, 0)
        : 0

    return (
        <SheetContent className='sm:max-w-md'>
            <SheetHeader>
                <SheetTitle className='text-center font-bold text-3xl'>Your Cart</SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-4">
                {
                    cartItems && cartItems.length > 0 ?
                        cartItems.map(cartItem =>
                            (<UserCartContents key={cartItem?.productId} cartItem={cartItem} />))
                        : null

                }
            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">Rs.{totalAmount}</span>
                </div>
            </div>
            <Button onClick={() => {
                setOpenCartSheet(false);
                navigate('/shop/checkout')
            }}
                className='w-full mt-5'>
                Checkout
            </Button>
        </SheetContent>
    )
}

export default UserCartWrapper