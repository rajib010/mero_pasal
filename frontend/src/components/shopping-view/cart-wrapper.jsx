import { Button } from "../ui/button"
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import UserCartContents from "./cart-content"


function UserCartWrapper({ cartItems }) {
    return (
        <SheetContent className='sm:max-w-md'>
            <SheetHeader>
                <SheetTitle className='text-center font-bold text-3xl'>Your Cart</SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-4">
                {
                    cartItems && cartItems.length > 0 ?
                        cartItems.map(cartItem =>
                            (<UserCartContents cartItem={cartItem}/>))
                        : null

                }
            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">Rs.10000</span>
                </div>
            </div>

            <Button className='w-full mt-5'>
                Checkout
            </Button>
        </SheetContent>
    )
}

export default UserCartWrapper