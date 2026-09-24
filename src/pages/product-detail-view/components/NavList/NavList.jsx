import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";

export default function NavList() {
  const getProductById = useProductStore((state) => state.getProductById);
  const { id } = useParams();
  const product = getProductById(id);
  const navigate = useNavigate();
  return (
    <ul className="mb-5 hidden w-fit list-none items-center gap-4 text-sm md:flex">
      <li className="flex items-center gap-3">
        <button
          onClick={() => navigate("/")}
          aria-label="Home"
          className="cursor-pointer text-green-700"
        >
          Home
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </li>
      <li className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(`/category/${product.category}`)}
          aria-label={product.category}
          className="cursor-pointer text-green-700"
        >
          {product.category}
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </li>
      <li>{product.name}</li>
    </ul>
  );
}
