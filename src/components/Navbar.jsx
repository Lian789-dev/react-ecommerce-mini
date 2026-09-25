import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../store/useModalStore";
import SearchBar from "./SearchBar";
export default function Navbar() {
  return (
    <div className="sticky top-0 left-0 z-40 w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="hidden w-96 md:flex">
          <SearchBar />
        </div>
        <NavbarAction />
      </div>
    </div>
  );
}

function Logo() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate("/")}
      aria-label="logo"
      className="group flex cursor-pointer items-center gap-2 transition-transform active:scale-95"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm transition-colors group-hover:bg-green-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>
      <span className="text-lg font-black tracking-tight text-slate-800">
        Shopping<span className="text-green-600">.</span>
      </span>
    </button>
  );
}

function NavbarAction() {
  const cart = useCartStore((state) => state.cart);
  const onOpenModal = useModalStore((state) => state.onOpenModal);
  const totalCartItems = cart.reduce(
    (sum, item) =>
      item.quantity === "" || isNaN(item.quantity) ? 0 : item.quantity + sum,
    0
  );
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => onOpenModal("mobile-search")}
        aria-label="Open Search"
        className="cursor-pointer text-black transition-colors hover:text-green-700 active:text-green-700 md:hidden"
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
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => onOpenModal("cart-drawer")}
        aria-label="Open Cart"
        className="relative cursor-pointer p-2 text-black transition-colors hover:text-green-700 active:text-green-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
        {totalCartItems > 0 && (
          <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {Number(totalCartItems)}
          </span>
        )}
      </button>
    </div>
  );
}
