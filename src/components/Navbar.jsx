export default function Navbar({
  inputRef,
  cart,
  selectedProduct,
  onOpenCart,
  onOpenMobileSearch,
  searchQuery,
  onSearchChange,
  onSearchResult,
  onClose,
}) {
  return (
    <div className="sticky top-0 left-0 z-40 w-full border-b border-slate-200 bg-white px-[5%]">
      <div className="flex h-16 w-full items-center justify-between">
        {selectedProduct ? <ButtonBack onClose={onClose} /> : <Logo />}
        <SearchBox
          inputRef={inputRef}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onSearchResult={onSearchResult}
        />
        <NavbarAction
          cart={cart}
          onOpenCart={onOpenCart}
          onOpenMobileSearch={onOpenMobileSearch}
        />
      </div>
    </div>
  );
}
function ButtonBack({ onClose }) {
  return (
    <button
      type="button"
      onClick={onClose}
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
  );
}
function Logo() {
  return (
    <a
      href="#"
      className="group flex items-center gap-2 transition-transform active:scale-95"
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
    </a>
  );
}

function SearchBox({ inputRef, searchQuery, onSearchChange, onSearchResult }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        inputRef.current?.blur();
        onSearchResult(searchQuery);
      }}
      className="hidden w-96 items-center overflow-hidden rounded-lg border border-slate-300 shadow-sm transition-all focus-within:ring-2 focus-within:ring-green-600 sm:flex"
    >
      <button
        type="submit"
        aria-label="Search"
        className="cursor-pointer p-2 text-slate-400 transition-colors hover:text-green-700"
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
        ref={inputRef}
        id="search"
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Cari..."
        autoComplete="off"
        className="h-full w-full px-2 py-1.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
      />
      {searchQuery.length === 0 ? (
        <button
          type="button"
          aria-label="Voice Search"
          className="cursor-pointer p-2 text-slate-400 transition-colors hover:text-green-700"
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
      ) : (
        <button
          type="button"
          onClick={() => {
            onSearchChange("");
            onSearchResult("");
          }}
          aria-label="Clear Query"
          className="cursor-pointer p-2 text-slate-400 transition-colors hover:text-red-700"
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </form>
  );
}

function NavbarAction({ cart, onOpenCart, onOpenMobileSearch }) {
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onOpenMobileSearch}
        aria-label="Open Search"
        className="cursor-pointer p-2 text-black transition-colors hover:text-green-700 active:text-green-700 sm:hidden"
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
        onClick={onOpenCart}
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
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {totalCartItems}
          </span>
        )}
      </button>
    </div>
  );
}
