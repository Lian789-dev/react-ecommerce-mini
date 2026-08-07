export default function Navbar({ cart, onToggleCart }) {
  return (
    <div className="sticky top-0 left-0 z-40 w-full border-b border-slate-200 bg-white px-[5%]">
      <div className="flex h-20 w-full items-center justify-between sm:h-16">
        <Logo />
        <SearchBox />
        <NavbarAction cart={cart} onToggleCart={onToggleCart} />
      </div>
    </div>
  );
}
function Logo() {
  return (
    <a
      href="#"
      className="block text-xl font-bold tracking-tight text-slate-900 transition-opacity hover:opacity-80"
    >
      Logo
    </a>
  );
}

function SearchBox() {
  return (
    <form className="hidden w-96 items-center overflow-hidden rounded-lg border border-slate-300 shadow-sm transition-all focus-within:ring-2 focus-within:ring-green-600 sm:flex">
      <button
        type="submit"
        className="cursor-pointer p-2 text-slate-400 transition-colors hover:text-slate-600"
        aria-label="Search"
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
      <input
        id="search"
        type="text"
        className="h-full w-full px-2 py-1.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
        placeholder="Cari..."
        autoComplete="off"
      />
      <button
        type="button"
        className="cursor-pointer p-2 text-slate-400 transition-colors hover:text-slate-600"
        aria-label="Voice Search"
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
            d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
          />
        </svg>
      </button>
    </form>
  );
}

function NavbarAction({ cart, onToggleCart }) {
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        className="cursor-pointer p-2 text-slate-700 transition-colors hover:text-black sm:hidden"
        aria-label="Open Search"
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
        className="relative cursor-pointer p-2 text-slate-700 transition-colors hover:text-black"
        onClick={onToggleCart}
        aria-label="Open Cart"
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
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {totalCartItems}
          </span>
        )}
      </button>
    </div>
  );
}
