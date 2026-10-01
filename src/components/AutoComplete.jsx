import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../store/useModalStore";
import { useProductStore } from "../store/useProductStore";
import { useSearchStore } from "../store/useSearchStore";

export default function AutoComplete() {
  const products = useProductStore((state) => state.products);
  const keyword = useSearchStore((state) => state.keyword);
  const autoComplete = useSearchStore((state) => state.autoComplete);
  const setSelectedIndex = useSearchStore((state) => state.setSelectedIndex);
  const setAutoComplete = useSearchStore((state) => state.setAutoComplete);

  useEffect(() => {
    const debounce = setTimeout(() => {
      const cleanQuery = keyword.trim();
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(cleanQuery.toLowerCase())
      );
      setAutoComplete(filtered);
    }, 400);
    return () => clearTimeout(debounce);
  }, [keyword, setAutoComplete, products]);

  if (!keyword.trim()) return null;
  return (
    <div onMouseLeave={() => setSelectedIndex(-1)}>
      {autoComplete.map((item, index) => {
        return <SearchItem key={item.id} item={item} index={index} />;
      })}
    </div>
  );
}

function SearchItem({ item, index }) {
  const selectedIndex = useSearchStore((state) => state.selectedIndex);
  const setSelectedIndex = useSearchStore((state) => state.setSelectedIndex);
  const onCloseModal = useModalStore((state) => state.onCloseModal);
  const isSelected = selectedIndex === index;
  const itemRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSelected && itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [isSelected]);
  function handleSelectProduct(productName) {
    navigate(
      `/search?q=${encodeURIComponent(productName.trim())}&sortBy=favorite`
    );
    onCloseModal();
  }
  return (
    <button
      ref={itemRef}
      onClick={() => handleSelectProduct(item.name)}
      onMouseEnter={() => setSelectedIndex(index)}
      className={`flex w-full items-center gap-2 outline-none ${isSelected ? "bg-slate-100" : "hover:bg-slate-100"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="m-2 h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      <span>{item.name}</span>
    </button>
  );
}
