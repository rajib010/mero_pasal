import { Minus, Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"


function UserCartContents({ cartItem }) {
    console.log(cartItem);

    return (
        <div className="flex items-center space-x-4">
            <img
                src={cartItem?.image}
                alt={cartItem?.title}
                className="w-20 h-20 rounded object-cover"
            />
            <div className="flex-1">
                <h3 className="font-extrabold">{cartItem?.title}</h3>
                <div className="flex items-center mt-1 gap-4">
                    <Button variant='outline' className='h-8 w-8 rounded-full' size='icon'>
                        <Minus className="w-4 h-4" />
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="font-semibold">{cartItem?.quantity}</span>
                    <Button variant='outline' className='h-8 w-8 rounded-full' size='icon'>
                        <Plus className="w-4 h-4" />
                        <span className="sr-only">Increase</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <p className="font-semibold">
                    Rs.{
                        ((cartItem.salePrice > 0 ? cartItem.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2)
                    }
                </p>
                <Trash className="cursor-pointer mt-1" size={20}/>
            </div>
        </div>
    )
}

export default UserCartContents