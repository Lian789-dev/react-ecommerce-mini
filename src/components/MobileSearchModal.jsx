import { useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useModalStore } from "../store/useModalStore";
import { useSearchStore } from "../store/useSearchStore";
import AutoComplete from "./AutoComplete";
export default function MobileSearchModal() {
  const activeModal = useModalStore((state) => state.activeModal);
  const isOpen = activeModal === "mobile-search";
  useEffect(() => {
    if (!isOpen) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div
      label="Search"
      className="fixed top-0 left-0 z-50 h-dvh w-full bg-white"
    >
      <div className="flex h-full flex-col">
        <Header />
        <div className="flex-1 scrollbar-none overflow-y-auto px-4 pb-10 outline-none">
          <AutoComplete />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="sticky top-0 left-0 z-60 w-full border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="flex h-16 w-full items-center justify-between gap-2">
        <ButtonBack />
        <SearchBar />
        <ButtonVoiceSearch />
      </div>
    </div>
  );
}
function SearchBar() {
  const inputValue = useSearchStore((state) => state.keyword);
  const setInputValue = useSearchStore((state) => state.setKeyword);
  const autoComplete = useSearchStore((state) => state.autoComplete);
  const selectedIndex = useSearchStore((state) => state.selectedIndex);
  const setSelectedIndex = useSearchStore((state) => state.setSelectedIndex);
  const onCloseModal = useModalStore((state) => state.onCloseModal);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  useEffect(() => {
    if (!searchQuery.trim()) {
      setInputValue("");
    }
    setInputValue(searchQuery);
  }, [searchQuery, setInputValue]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedIndex >= 0 && autoComplete[selectedIndex]) {
      navigate(
        `/search?q=${encodeURIComponent(autoComplete[selectedIndex].name.trim())}&sortBy=favorite`
      );
      onCloseModal();
      setSelectedIndex(-1);
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
    <form
      onSubmit={handleSearch}
      className="w-full rounded-lg border border-slate-300 shadow-sm transition-all focus-within:ring-2 focus-within:ring-green-600"
    >
      <input
        ref={inputRef}
        type="search"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setSelectedIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Search...."
        className="h-10 w-full px-2 outline-none"
      />
    </form>
  );
}

function ButtonBack() {
  const onCloseModal = useModalStore((state) => state.onCloseModal);
  return (
    <button
      type="button"
      onClick={onCloseModal}
      aria-label="Back"
      className="cursor-pointer p-2"
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
