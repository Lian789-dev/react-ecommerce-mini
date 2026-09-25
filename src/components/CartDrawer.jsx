import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useModalStore } from "../store/useModalStore";

export default function CartDrawer() {
  const cart = useCartStore((state) => state.cart);
  const activeModal = useModalStore((state) => state.activeModal);
  const onCloseModal = useModalStore((state) => state.onCloseModal);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
  if (activeModal !== "cart-drawer") return null;
  return (
    <div className="fixed inset-0 right-0 z-40 flex justify-end">
      <div
        onClick={onCloseModal}
        role="button"
        aria-label="Close Modal"
        className="hidden flex-1 bg-slate-900/40 backdrop-blur-xs transition-opacity sm:block"
      />
      <div className="flex h-full w-full flex-col border-l border-slate-200 bg-slate-50 shadow-2xl sm:max-w-md">
        <CartHeader />
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length > 0 ? <CartList /> : <CartEmptyState />}
        </div>
        {cart.length > 0 && <CartFooter />}
      </div>
    </div>
  );
}

function CartHeader() {
  const cart = useCartStore((state) => state.cart);
  const onCloseModal = useModalStore((state) => state.onCloseModal);
  return (
    <div className="w-full flex-none border-b border-slate-200 bg-white px-4">
      <div className="flex h-16 w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCloseModal}
            aria-label="Back"
            className="cursor-pointer rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <p className="text-base font-bold text-slate-800">My Cart</p>
        </div>
        <p className="p-2 text-sm">
          {cart.length} {cart.length > 1 ? "products" : "product"}
        </p>
      </div>
    </div>
  );
}
function CartList() {
  const cart = useCartStore((state) => state.cart);
  return (
    <ul className="flex flex-col gap-3">
      {cart.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

function CartItem({ item }) {
  const onChangeChecked = useCartStore((state) => state.onChangeChecked);
  const isInvalidQty = item.quantity === "" || Number(item.quantity) < 1;
  return (
    <li
      className={`rounded-xl bg-white pt-4 shadow-xs transition-all hover:shadow-md ${isInvalidQty ? "border-2 border-red-500 " : "border border-slate-200 hover:border-green-700"}`}
    >
      <div className="flex gap-3">
        <div className="flex items-center justify-center pl-3">
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => onChangeChecked(item.id, item.checked)}
            className="h-5 w-5 accent-green-700"
          />
        </div>
        <div className="w-24 overflow-hidden bg-slate-100">
          <img
            src={item.image}
            alt={item.name}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <p className="text-md truncate font-semibold text-slate-800">
            {item.name}
          </p>
          <p className="mt-0.5 truncate text-xs font-bold text-green-700">
            Rp{item.price.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
      <CartItemActions item={item} />
    </li>
  );
}

function CartItemActions({ item }) {
  const onIncreaseQuantity = useCartStore((state) => state.onIncreaseQuantity);
  const onDecreaseQuantity = useCartStore((state) => state.onDecreaseQuantity);
  const onInputChange = useCartStore((state) => state.onInputChange);
  const removeToCart = useCartStore((state) => state.removeToCart);
  const currentQty = Number(item.quantity) || 0;

  function handleIncreaseQuantity() {
    if (currentQty >= item.stock)
      return toast.error(`You can purchase a maximum of ${item.stock} items.`);
    onIncreaseQuantity(item.id);
  }
  function handleDecreaseQuantity() {
    if (currentQty <= 1) {
      const validate = window.confirm("remove product");
      return validate ? removeToCart(item.id) : null;
    }
    onDecreaseQuantity(item.id);
  }
  function handleInputChange(e) {
    const val = e.target.value;
    if (val === "") return onInputChange(item.id, "");
    const num = Number(val);
    if (!isNaN(num)) {
      if (num > item.stock) {
        toast.error(`You can purchase a maximum of ${item.stock} items.`);
        onInputChange(item.id, item.stock);
      } else {
        onInputChange(item.id, num);
      }
    }
  }

  const isInvalidQty = item.quantity === "" || Number(item.quantity) < 1;
  return (
    <div className="mt-4 border-t border-slate-300 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleDecreaseQuantity}
            aria-label="Reduce Quantity"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-slate-200 shadow-sm hover:bg-slate-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-3 w-3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </button>

          <input
            type="number"
            min="1"
            max={item.stock}
            value={item.quantity}
            onChange={handleInputChange}
            className={`h-7 w-10 [appearance:textfield] rounded-md text-center text-sm outline-none focus:ring-2 focus:ring-green-600 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${isInvalidQty && "focus:ring-red-500"}`}
          />
          <button
            type="button"
            onClick={handleIncreaseQuantity}
            aria-label="Increase Quantity"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-slate-200 shadow-sm hover:bg-slate-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-3 w-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Add To Wishlist"
            className="cursor-pointer text-slate-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => removeToCart(item.id)}
            aria-label="Remove product from cart"
            className="cursor-pointer p-1 text-slate-800 transition-colors hover:text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
      {isInvalidQty && (
        <p className="mt-1 text-[11px] font-medium text-red-500">
          *Quantity cannot be empty.
        </p>
      )}
    </div>
  );
}

function CartFooter() {
  const cart = useCartStore((state) => state.cart);
  const itemChecked = cart.filter((item) => item.checked === true);
  const totalItems = itemChecked.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = itemChecked
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toLocaleString("id-ID");
  const navigate = useNavigate();

  const hasInvalidQty = itemChecked.some(
    (item) => item.quantity === "" || Number(item.quantity) < 1
  );
  return (
    <div
      className={`flex flex-none flex-col gap-3 border-t border-slate-200 bg-slate-50 p-4 ${totalItems !== 0 ? "visible" : "invisible"}`}
    >
      <div className="flex items-center justify-between text-sm text-slate-600">
        <p>
          Total ({Number(totalItems)}{" "}
          {totalItems > 1 ? "selected items" : "selected item"}):
        </p>
        <p className="text-base font-bold text-green-700">Rp{totalPrice}</p>
      </div>
      <button
        type="button"
        disabled={hasInvalidQty}
        onClick={() => {
          navigate("/checkout");
        }}
        aria-label="Checkout"
        className="w-full cursor-pointer rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-green-800 active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed disabled:bg-slate-200"
      >
        Checkout
      </button>
    </div>
  );
}

function CartEmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center py-12 text-slate-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="mb-3 h-12 w-12 text-slate-300"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
      <p className="text-sm font-medium">Shopping cart is empty.</p>
    </div>
  );
}
