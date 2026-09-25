import { useModalStore } from "../store/useModalStore";
import SearchBar from "./SearchBar";

export default function MobileSearchModal() {
  const activeModal = useModalStore((state) => state.activeModal);
  if (activeModal !== "mobile-search") return null;
  return (
    <div className="fixed top-0 left-0 z-50 h-dvh w-full bg-slate-50 sm:hidden">
      <Header />
    </div>
  );
}

function Header() {
  return (
    <div className="sticky top-0 left-0 z-60 w-full border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="flex h-16 w-full items-center justify-between gap-2">
        <ButtonBack />
        <div className="w-full">
          <SearchBar autoFocus={true} />
        </div>
        <ButtonVoiceSearch />
      </div>
    </div>
  );
}

function ButtonBack() {
  const onCloseModal = useModalStore((state) => state.onCloseModal);
  return (
    <button
      type="button"
      onClick={onCloseModal}
      aria-label="Back"
      className="p-2"
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
