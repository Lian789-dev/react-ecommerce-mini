import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearchStore } from "../store/useSearchStore";
import { useModalStore } from "../store/useModalStore";
import { useEffect } from "react";
import { useRef } from "react";
export default function SearchBar({ autoFocus = false }) {
  const onCloseModal = useModalStore((state) => state.onCloseModal);
  const { keyword, setKeyword } = useSearchStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setKeyword(query);
    }
  }, [searchParams, setKeyword]);
  const handleSearch = (e) => {
    e.preventDefault();
    if (document.activeElement) {
      document.activeElement.blur();
    }
    if (keyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(keyword.trim())}`);
    }
    onCloseModal();
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full items-center overflow-hidden rounded-lg border border-slate-300 shadow-sm transition-all focus-within:ring-2 focus-within:ring-green-600"
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
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Cari..."
        autoComplete="off"
        className="h-full w-full px-2 py-1.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
      />
    </form>
  );
}
