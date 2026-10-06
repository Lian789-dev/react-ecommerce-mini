import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearchStore } from "../store/useSearchStore";
import { useModalStore } from "../store/useModalStore";
import AutoComplete from "./AutoComplete";

export default function SearchBar() {
  const inputValue = useSearchStore((state) => state.keyword);
  const setInputValue = useSearchStore((state) => state.setKeyword);
  const autoComplete = useSearchStore((state) => state.autoComplete);
  const selectedIndex = useSearchStore((state) => state.selectedIndex);
  const setSelectedIndex = useSearchStore((state) => state.setSelectedIndex);
  const onCloseModal = useModalStore((state) => state.onCloseModal);
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setInputValue("");
    }
    setInputValue(searchQuery);
  }, [searchQuery, setInputValue]);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      inputRef.current?.blur();
    }, 0);
    if (selectedIndex >= 0 && autoComplete[selectedIndex]) {
      navigate(
        `/search?q=${encodeURIComponent(autoComplete[selectedIndex].name.trim())}&sortBy=favorite`
      );
      onCloseModal();
      setSelectedIndex(-1);
      inputRef.current.blur();
      return;
    }

    const cleanQuery = inputValue.trim();
    if (cleanQuery) {
      navigate(`/search?q=${encodeURIComponent(cleanQuery)}&sortBy=favorite`);
      onCloseModal();
    }
  };
  const handleKeyDown = (e) => {
    if (autoComplete.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(
        selectedIndex < autoComplete.length - 1 ? selectedIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        selectedIndex > 0 ? selectedIndex - 1 : autoComplete.length - 1
      );
    } else if (e.key === "Escape") {
      setSelectedIndex(-1);
    }
  };

  return (
    <div ref={containerRef} className="relative hidden w-96 md:block">
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative w-full rounded-lg border border-slate-300 shadow-sm transition-all focus-within:ring-2 focus-within:ring-green-600">
          <div className="flex w-full items-center px-2">
            <button
              type="submit"
              aria-label="Search"
              className="cursor-pointer p-1 text-slate-400 transition-colors hover:text-green-700"
            >
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>

            <input
              ref={inputRef}
              type="search"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setSelectedIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsOpen(true)}
              placeholder="Search..."
              className="h-10 w-full px-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>

          {isOpen && (
            <div className="absolute top-full left-0 z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-slate-200 bg-white p-1 shadow-lg">
              <AutoComplete />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
