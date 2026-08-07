export default function CartDrawer({ cart, isOpenCart, onChangeQuantity }) {
  if (!isOpenCart) return null;

  return (
    <div className="fixed inset-0 top-20 z-40 flex justify-end sm:top-16">
      <div className="hidden flex-1 bg-slate-900/40 backdrop-blur-xs transition-opacity sm:block" />
      <div className="flex h-full w-full flex-col border-l border-slate-200 bg-white shadow-2xl sm:max-w-md">
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length > 0 ? (
            <CartList cart={cart} onChangeQuantity={onChangeQuantity} />
          ) : (
            <CartEmptyState />
          )}
        </div>

        {cart.length > 0 && <CartFooter cart={cart} />}
      </div>
    </div>
  );
}

function CartList({ cart, onChangeQuantity }) {
  return (
    <ul className="flex flex-col gap-3">
      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onChangeQuantity={onChangeQuantity}
        />
      ))}
    </ul>
  );
}

function CartItem({ item, onChangeQuantity }) {
  return (
    <li className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
      <div className="h-20 w-20 flex-none overflow-hidden rounded-lg border border-slate-100 bg-slate-100">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex h-20 min-w-0 flex-1 flex-col justify-between py-0.5">
        <div>
          <p className="truncate text-sm font-semibold text-slate-800">
            {item.name}
          </p>
          <p className="truncate text-xs font-bold text-green-700">
            Rp{(item.price * item.quantity).toLocaleString("id-ID")}
          </p>
        </div>
        <CartItemActions item={item} onChangeQuantity={onChangeQuantity} />
      </div>
    </li>
  );
}

function CartItemActions({ item, onChangeQuantity }) {
  return (
    <div className="mt-2 flex items-center gap-3">
      <input
        type="number"
        className="w-16 rounded-md border border-slate-300 px-2 py-1 text-center font-semibold outline-none focus:ring-2 focus:ring-green-600"
        value={item.quantity}
        onChange={(e) => onChangeQuantity(item.id, e.target.value)}
      />
      <button
        type="button"
        className="cursor-pointer p-1 text-slate-400 transition-colors hover:text-red-500"
        onClick={() => onChangeQuantity(item.id, 0)}
        aria-label="Remove product from cart"
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
  );
}

function CartFooter({ cart }) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toLocaleString("id-ID");

  return (
    <div className="flex flex-none flex-col gap-3 border-t border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>Total ({totalItems} products):</span>
        <span className="text-base font-bold text-green-700">
          Rp{totalPrice}
        </span>
      </div>
      <button
        type="button"
        className="w-full cursor-pointer rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-green-800"
        aria-label="Checkout"
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
