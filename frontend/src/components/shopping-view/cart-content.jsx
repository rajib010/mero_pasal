import { useEffect, useState } from "react";
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItems, updateCartItems } from "@/store/shop-slice/cart";
import { toast } from "@/hooks/use-toast";

function UserCartContents({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // local state for immediate feedback
  const [localQuantity, setLocalQuantity] = useState(cartItem.quantity);

  useEffect(() => {
    // Keep local quantity in sync with global state (in case it changes externally)
    setLocalQuantity(cartItem.quantity);
  }, [cartItem.quantity]);

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    const newQuantity =
      typeOfAction === "plus" ? localQuantity + 1 : localQuantity - 1;

    // update local state first for instant UI
    setLocalQuantity(newQuantity);

    dispatch(
      updateCartItems({
        userId: user?._id,
        productId: getCartItem?.productId,
        quantity: newQuantity,
      })
    ).then((data) => {
      if (data.payload?.success) {
        toast({
          title: "Cart item updated",
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItems({
        userId: user?._id,
        productId: getCartItem?.productId,
      })
    ).then((data) => {
      if (data.payload?.success) {
        toast({
          title: "Cart item removed",
          variant: "destructive",
        });
      }
    });
  }

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
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={localQuantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{localQuantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
          
        </div>
        
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          Rs.
          {(
            (cartItem.salePrice > 0 ? cartItem.salePrice : cartItem?.price) *
            localQuantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartContents;
