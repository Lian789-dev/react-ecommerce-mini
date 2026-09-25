import { useParams } from "react-router-dom";

export default function CategoryItem({ item, onSelect }) {
  const { categoryName } = useParams();

  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className="flex cursor-pointer items-center gap-4 text-sm font-semibold"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`h-3 w-3 ${categoryName === item ? "visible" : "invisible"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
        <span
          className={
            categoryName === item
              ? "text-green-700"
              : "text-slate-800 hover:text-slate-600"
          }
        >
          {item}
        </span>
      </button>
    </li>
  );
}
