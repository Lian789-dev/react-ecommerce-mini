import { useEffect } from "react";

export default function MobileSearchDrawer({
  inputRef,
  searchQuery,
  onSearchChange,
  onSearchResult,
  onClose,
}) {
  return (
    <div className="fixed top-0 left-0 z-60 h-dvh w-full bg-slate-50 sm:hidden">
      <Navbar
        inputRef={inputRef}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSearchResult={onSearchResult}
        onClose={onClose}
      />
    </div>
  );
}

function Navbar({
  inputRef,
  searchQuery,
  onSearchChange,
  onSearchResult,
  onClose,
}) {
  return (
    <div className="sticky top-0 left-0 w-full border-b border-slate-200 bg-white px-4">
      <div className="flex h-16 w-full items-center justify-between gap-2">
        <ButtonBack onClose={onClose} />
        <SearchBox
          inputRef={inputRef}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onSearchResult={onSearchResult}
          onClose={onClose}
        />
        <ButtonVoiceSearch />
      </div>
    </div>
  );
}

function ButtonBack({ onClose }) {
  return (
    <button onClick={onClose} aria-label="Back" className="p-2">
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
function SearchBox({
  inputRef,
  searchQuery,
  onSearchChange,
  onSearchResult,
  onClose,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, [inputRef]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearchResult(searchQuery);
        inputRef.current?.blur();
        onClose();
      }}
      className="flex flex-1 rounded-lg border border-slate-300 shadow-sm transition-all focus-within:ring-2 focus-within:ring-green-600"
    >
      <button
        type="submit"
        aria-label="Search"
        className="cursor-pointer p-2 text-slate-400 transition-colors hover:text-slate-600"
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
        type="text"
        ref={inputRef}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Cari..."
        autoComplete="off"
        className="h-full w-full px-2 py-1.5 outline-none"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          aria-label="Reset"
          className="p-2 text-slate-400 hover:text-slate-600"
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

function ButtonVoiceSearch() {
  return (
    <button
      aria-label="Vioce Search"
      className="cursor-pointer p-2 text-slate-700 transition-colors hover:text-black"
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
  );
}
